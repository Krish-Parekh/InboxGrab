import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import {
	IAttachment,
	IEmailResponse,
	IHeader,
	IMessage,
	IMessageDetail,
	IMessageResponse,
	IPart,
} from "@/types/main";

const URLs = {
	GET_MESSAGES: "/users/me/messages",
};

const requestFormSchema = z.object({
	from: z.string(),
	startDate: z.string(),
	endDate: z.string(),
});

function getQuery(from: string, startDate: Date, endDate: Date) {
	const startDateString = startDate.toISOString().split("T")[0];
	const endDateString = endDate.toISOString().split("T")[0];
	return `q=from:${from} after:${startDateString} before:${endDateString} has:attachment`;
}

async function getMessages(
	token: string,
	from: string,
	startDate: Date,
	endDate: Date,
): Promise<IMessageResponse> {
	try {
		const query = getQuery(from, startDate, endDate);
		const url = `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}${URLs.GET_MESSAGES}?${query}`;
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch messages");
		}
		const data: IMessageResponse = await response.json();
		return data;
	} catch (error) {
		throw new Error("Failed to fetch messages");
	}
}

async function getMessageDetails(
	token: string,
	messageId: string,
): Promise<IMessageDetail> {
	try {
		const url = `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}${URLs.GET_MESSAGES}/${messageId}`;
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch message details");
		}
		const data: IMessageDetail = await response.json();
		return data;
	} catch (error) {
		throw new Error("Failed to fetch message details");
	}
}

async function getMessagesDetails(
	token: string,
	messages: IMessage[],
): Promise<IMessageDetail[]> {
	try {
		const messageDetails = await Promise.all(
			messages.map(
				async (message) => await getMessageDetails(token, message.id),
			),
		);
		return messageDetails;
	} catch (error) {
		throw new Error("Failed to fetch message details");
	}
}

function tranformMessageDetails(
	messageDetails: IMessageDetail[],
): IEmailResponse[] {
	try {
		const emailResponses: IEmailResponse[] = [];
		for (const messageDetail of messageDetails) {
			const subjectHeader = messageDetail.payload?.headers?.find(
				(h: IHeader) => h.name === "Subject",
			);
			const subject = subjectHeader?.value || "No Subject";
			const fromHeader = messageDetail.payload?.headers?.find(
				(h: IHeader) => h.name === "From",
			);
			const from = fromHeader?.value || "No From";
			const dateHeader = messageDetail.payload?.headers?.find(
				(h: IHeader) => h.name === "Date",
			);
			const date = dateHeader?.value || "No Date";
			const attachments = messageDetail.payload?.parts
				?.map((part: IPart) => {
					return {
						id: part.body.attachmentId || "",
						filename: part.filename,
						mimeType: part.mimeType,
						size: part.body.size,
						data: part.body.data || "",
					};
				})
				.filter(
					(attachment: IAttachment) =>
						attachment.mimeType === "application/pdf",
				);

			const emailResponse: IEmailResponse = {
				id: messageDetail.id,
				threadId: messageDetail.threadId,
				subject,
				from,
				date,
				attachments,
			};

			emailResponses.push(emailResponse);
		}

		return emailResponses;
	} catch (error) {
		throw new Error("Failed to transform message details");
	}
}

async function POST(request: NextRequest) {
	try {
		const formData = await request.json();
		const formDataResult = requestFormSchema.safeParse(formData);

		const token = await getToken({
			req: request,
			secret: process.env.NEXTAUTH_SECRET,
		});

		if (!formDataResult.success) {
			return NextResponse.json({ error: "Invalid request" }, { status: 400 });
		}
		if (!token) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { from, startDate, endDate } = formDataResult.data;

		const data: IMessageResponse = await getMessages(
			token?.accessToken || "",
			from,
			new Date(startDate),
			new Date(endDate),
		);

		const messageDetails = await getMessagesDetails(
			token?.accessToken as string,
			data.messages,
		);
		const emails = tranformMessageDetails(messageDetails);
		return NextResponse.json(
			{ message: "Email fetched successfully", emails },
			{ status: 200 },
		);
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export { POST };

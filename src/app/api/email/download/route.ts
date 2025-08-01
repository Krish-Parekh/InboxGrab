import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import JSZip from "jszip";

const requestFormSchema = z
	.object({
		messageId: z.string(),
		attachmentId: z.string(),
		date: z.string(),
		subject: z.string(),
	})
	.array();

const URLs = {
	GET_MESSAGES: "/users/me/messages",
};

function sanitizeFilename(input: string): string {
	return input
		.replace(/[\\/:*?"<>|]/g, "_")
		.replace(/\s+/g, "_")
		.substring(0, 50);
}

function formatEmailDate(dateStr: string): string {
	const date = new Date(dateStr);
	if (isNaN(date.getTime())) return "invalid-date";
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
}

async function getAttachment(
	token: string,
	messageId: string,
	attachmentId: string,
): Promise<string> {
	try {
		const url = `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}${URLs.GET_MESSAGES}/${messageId}/attachments/${attachmentId}`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const errorBody = await response.text();
			throw new Error(
				`Failed to get attachment: ${response.status} ${response.statusText} - ${errorBody}`,
			);
		}

		const attachment = await response.json();

		const base64 = attachment.data.replace(/-/g, "+").replace(/_/g, "/");

		return base64;
	} catch (error) {
		throw new Error("Failed to download attachments");
	}
}

async function POST(request: NextRequest) {
	try {
		const formData = await request.json();
		const formDataResult = requestFormSchema.safeParse(formData);

		if (!formDataResult.success) {
			return NextResponse.json({ error: "Invalid request" }, { status: 400 });
		}

		const token = await getToken({
			req: request,
			secret: process.env.NEXTAUTH_SECRET,
		});

		if (!token) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}
		const attachments = await Promise.all(
			formDataResult.data.map(async (email) => {
				const attachment = await getAttachment(
					token?.accessToken as string,
					email.messageId,
					email.attachmentId,
				);
				return {
					name: email.messageId,
					date: email.date,
					subject: email.subject,
					data: attachment,
				};
			}),
		);
		const zip = new JSZip();

		for (const attachment of attachments) {
			const safeSubject = sanitizeFilename(attachment.subject);
			const formattedDate = formatEmailDate(attachment.date);
			const safeDate = sanitizeFilename(formattedDate);
			const fileName = `${safeDate}_${safeSubject}.pdf`;
			zip.file(fileName, attachment.data, { base64: true });
		}

		const zipBlob = await zip.generateAsync({ type: "blob" });

		return new NextResponse(zipBlob, {
			status: 200,
			headers: {
				"Content-Type": "application/zip",
			},
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to download emails" },
			{ status: 500 },
		);
	}
}

export { POST };

import React, { useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { IEmailServerResponse } from "@/types/main";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmailSearchStore } from "@/store/email.store";
import { IEmailDownloadRequest } from "@/types/main";
interface IEmailTableProps {
	data?: IEmailServerResponse;
	isLoading: boolean;
}

export default function EmailTable({ data, isLoading }: IEmailTableProps) {
	const { downloadAttachments } = useEmailSearchStore();
	const [isDownloading, setIsDownloading] = useState(false);
	const handleDownload = async () => {
		setIsDownloading(true);
		const attachments = data?.emails.flatMap((email) => {
			const messageId = email.id;
			const attachmentIds = email.attachments.map(
				(attachment) => attachment.id,
			);
			const attachments: IEmailDownloadRequest[] = attachmentIds.map(
				(attachmentId) => ({
					messageId,
					attachmentId,
					date: email.date,
					subject: email.subject,
				}),
			);
			return attachments;
		});

		if (attachments) {
			await downloadAttachments(attachments);
			setIsDownloading(false);
		}
	};
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Emails</CardTitle>
				<Button
					variant="outline"
					onClick={handleDownload}
					disabled={isDownloading}
				>
					{isDownloading ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<Download className="w-4 h-4" />
					)}
					Download All
				</Button>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<div className="flex justify-center items-center h-full">
						<Loader2 className="w-4 h-4 animate-spin" />
					</div>
				) : (
					<DataTable columns={columns} data={data?.emails || []} />
				)}
			</CardContent>
		</Card>
	);
}

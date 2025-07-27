import { IEmailDownloadRequest, IEmailResponse } from "@/types/main";
import React, { useState } from "react";
import { useEmailSearchStore } from "@/store/email.store";
import { Button } from "@/components/ui/button";
import { Loader2, Download } from "lucide-react";

interface IEmailDownloadActionProps {
	email: IEmailResponse;
}

export default function EmailDownloadAction({
	email,
}: IEmailDownloadActionProps) {
	const [isDownloading, setIsDownloading] = useState(false);
	const messageId = email.id;
	const attachmentIds = email.attachments.map((attachment) => attachment.id);

	const attachments: IEmailDownloadRequest[] = attachmentIds.map(
		(attachmentId) => ({
			messageId,
			attachmentId,
			date: email.date,
			subject: email.subject,
		}),
	);

	const { downloadAttachments } = useEmailSearchStore();

	const handleDownload = async () => {
		setIsDownloading(true);
		await downloadAttachments(attachments);
		setIsDownloading(false);
	};

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={handleDownload}
			disabled={isDownloading}
		>
			{isDownloading ? (
				<Loader2 className="w-4 h-4 animate-spin" />
			) : (
				<Download className="w-4 h-4" />
			)}
			Download
		</Button>
	);
}

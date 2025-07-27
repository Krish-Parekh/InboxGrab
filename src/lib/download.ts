import { IEmailDownloadRequest } from "@/types/main";

interface IDownloadAttachmentsProps {
	attachments: IEmailDownloadRequest[];
	triggerDownload: (attachments: IEmailDownloadRequest[]) => Promise<Blob>;
	filename: string;
}

export async function downloadAttachments({
	attachments,
	triggerDownload,
	filename,
}: IDownloadAttachmentsProps) {
	try {
		const blob = await triggerDownload(attachments);
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		window.URL.revokeObjectURL(url);
		document.body.removeChild(link);
	} catch (error) {
		console.error("Download failed:", error);
	}
}

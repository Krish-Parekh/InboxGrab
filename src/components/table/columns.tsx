"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IEmailResponse } from "@/types/main";
import { Button } from "@/components/ui/button";
import { useEmailSearchStore } from "@/store/email.store";

export const columns: ColumnDef<IEmailResponse>[] = [
	{
		header: "Subject",
		accessorKey: "subject",
	},
	{
		header: "From",
		accessorKey: "from",
	},
	{
		header: "Date",
		accessorKey: "date",
		cell: ({ row }) => {
			const date = new Date(row.original.date);
			return date.toLocaleDateString();
		},
	},
	{
		header: "Action",
		cell: ({ row }) => {
			const messageId = row.original.id;
			const attachmentIds = row.original.attachments.map(
				(attachment) => attachment.id,
			);
			const attachments = attachmentIds.map((attachmentId) => ({
				messageId,
				attachmentId,
			}));
			const { downloadAttachments } = useEmailSearchStore();

			return (
				<Button
					variant="outline"
					size="sm"
					onClick={() => downloadAttachments(attachments)}
				>
					Download
				</Button>
			);
		},
	},
];

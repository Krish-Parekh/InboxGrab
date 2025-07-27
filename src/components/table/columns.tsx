"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IEmailResponse } from "@/types/main";
import EmailDownloadAction from "../email-download-action";

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
			return <EmailDownloadAction email={row.original} />;
		},
	},
];

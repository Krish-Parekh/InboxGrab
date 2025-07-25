"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IEmailResponse } from "@/types/main";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<IEmailResponse>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
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
	},
];

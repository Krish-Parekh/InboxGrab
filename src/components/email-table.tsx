import React from "react";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { IEmailServerResponse } from "@/types/main";
import { Download, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface IEmailTableProps {
	data?: IEmailServerResponse;
	isLoading: boolean;
}

export default function EmailTable({ data, isLoading }: IEmailTableProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Emails</CardTitle>
				<Button variant="outline">
					<Download className="w-4 h-4" /> Download All
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

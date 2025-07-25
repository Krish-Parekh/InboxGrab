import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcwIcon } from "lucide-react";
import SearchForm from "@/components/search-form";
import { IEmailServerRequest } from "@/types/main";

interface ISearchCardProps {
	onSearch: (data: IEmailServerRequest) => void;
}

export default function SearchCard({ onSearch }: ISearchCardProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Search Filters</CardTitle>
				<Button variant="outline" size="icon" data-testid="refresh-button">
					<RefreshCcwIcon className="w-4 h-4" />
				</Button>
			</CardHeader>
			<CardContent>
				<SearchForm onSearch={onSearch} />
			</CardContent>
		</Card>
	);
}

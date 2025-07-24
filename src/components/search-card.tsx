import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcwIcon } from "lucide-react";
import SearchForm from "@/components/search-form";

export default function SearchCard() {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Search Filters</CardTitle>
				<Button variant="outline" size="icon">
					<RefreshCcwIcon className="w-4 h-4" />
				</Button>
			</CardHeader>
			<CardContent>
				<SearchForm />
			</CardContent>
		</Card>
	);
}

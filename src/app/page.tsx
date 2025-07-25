"use client";

import MaxWidthContainer from "@/components/max-width-container";
import Navbar from "@/components/navbar";
import SearchCard from "@/components/search-card";
import EmailTable from "@/components/email-table";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { useEmailServerMutation } from "@/lib/mutation";
import { IEmailServerRequest, IEmailServerResponse } from "@/types/main";
import { useEmailSearchStore } from "@/store/email.store";
import { useEffect } from "react";

const URL = "/api/email";

export default function Home() {
	const { data, isMutating, trigger } = useEmailServerMutation<
		IEmailServerRequest,
		IEmailServerResponse
	>(URL);

	useEffect(() => {
		useEmailSearchStore.getState().setTriggerSearch(trigger);
	}, [trigger]);

	const onDownloadAll = () => {};

	return (
		<SWRConfig>
			<SessionProvider>
				<MaxWidthContainer className="space-y-4">
					<Navbar />
					<SearchCard />
					<EmailTable
						data={data}
						isLoading={isMutating}
						onDownloadAll={onDownloadAll}
					/>
				</MaxWidthContainer>
			</SessionProvider>
		</SWRConfig>
	);
}

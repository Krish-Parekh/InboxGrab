"use client";

import MaxWidthContainer from "@/components/max-width-container";
import Navbar from "@/components/navbar";
import SearchCard from "@/components/search-card";
import EmailTable from "@/components/email-table";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { useEmailServerMutation } from "@/lib/mutation";
import {
	IEmailDownloadRequest,
	IEmailServerRequest,
	IEmailServerResponse,
} from "@/types/main";
import { useEmailSearchStore } from "@/store/email.store";
import { useEffect } from "react";

const URLs = {
	SEARCH: "/api/email",
	DOWNLOAD: "/api/email/download",
};

export default function Home() {
	const { data, isMutating, trigger } = useEmailServerMutation<
		IEmailServerRequest,
		IEmailServerResponse
	>(URLs.SEARCH);

	const { trigger: triggerDownload } = useEmailServerMutation<
		IEmailDownloadRequest[],
		Blob
	>(URLs.DOWNLOAD);

	const handleDownload = async (attachments: IEmailDownloadRequest[]) => {
		try {
			const blob = await triggerDownload(attachments);

			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = "attachments.zip";
			document.body.appendChild(link);
			link.click();

			window.URL.revokeObjectURL(url);
			document.body.removeChild(link);
		} catch (error) {
			console.error("Download failed:", error);
		}
	};

	useEffect(() => {
		useEmailSearchStore.getState().setTriggerSearch(trigger);
		useEmailSearchStore.getState().setDownloadAttachments(handleDownload);
	}, [trigger]);

	return (
		<SWRConfig>
			<SessionProvider>
				<MaxWidthContainer className="space-y-4">
					<Navbar />
					<SearchCard />
					<EmailTable data={data} isLoading={isMutating} />
				</MaxWidthContainer>
			</SessionProvider>
		</SWRConfig>
	);
}

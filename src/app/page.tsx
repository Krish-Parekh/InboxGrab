"use client";

import MaxWidthContainer from "@/components/max-width-container";
import Navbar from "@/components/navbar";
import SearchCard from "@/components/search-card";
import { SessionProvider } from "next-auth/react";

export default function Home() {
	return (
		<SessionProvider>
			<MaxWidthContainer>
				<Navbar />
				<SearchCard />
			</MaxWidthContainer>
		</SessionProvider>
	);
}

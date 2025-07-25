"use client";

import MaxWidthContainer from "@/components/max-width-container";
import Navbar from "@/components/navbar";
import SearchCard from "@/components/search-card";
import ClientComponent from "@/components/client-component";
import { SessionProvider } from "next-auth/react";

export default function Home() {
	return (
		<SessionProvider>
			<MaxWidthContainer>
				<Navbar />
				<SearchCard />
				<ClientComponent />
			</MaxWidthContainer>
		</SessionProvider>
	);
}

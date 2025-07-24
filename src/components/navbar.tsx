"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Navbar() {
	const { data: session, status } = useSession();
	const handleSignOut = () => {
		signOut();
	};
	return (
		<nav className="flex items-center justify-between py-4">
			<h1 className="text-xl font-bold">Gmail Extractor</h1>
			<div className="flex items-center gap-x-4">
				<Avatar className="size-10 border-2 ring-2 ring-green-400">
					<AvatarImage
						data-testid="avatar-image"
						src={session?.user?.image || ""}
						alt={session?.user?.name || ""}
					/>
				</Avatar>
				<Button
					className="cursor-pointer"
					onClick={handleSignOut}
					disabled={status === "loading"}
				>
					{status === "loading" ? <Loader2 className="animate-spin" /> : null}
					Logout
				</Button>
			</div>
		</nav>
	);
}

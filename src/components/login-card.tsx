import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function LoginCard() {
	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Sign in to Gmail Extractor</CardTitle>
				<CardDescription>
					Connect your Google account to access your Gmail attachments
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Button variant="secondary" className="w-full">
					<FcGoogle className="w-4 h-4 mr-2" />
					Sign in with Google
				</Button>
			</CardContent>
		</Card>
	);
}

import LoginCard from "@/components/login-card";
import MaxWidthContainer from "@/components/max-width-container";

export default function LoginPage() {
	return (
		<MaxWidthContainer className="flex items-center justify-center h-screen">
			<LoginCard />
		</MaxWidthContainer>
	);
}

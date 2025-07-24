import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";
import * as nextAuth from "next-auth/react";
import { Session } from "next-auth";

describe("Home", () => {
	it("should render the home page", () => {
		const mockSession: Session = {
			user: {
				name: "Test User",
				email: "test@example.com",
				image: "https://example.com/avatar.png",
			},
			expires: "2025-12-31T23:59:59.999Z",
		};

		const { SessionProvider } = nextAuth;

		const { container } = render(
			<SessionProvider session={mockSession}>
				<Home />
			</SessionProvider>,
		);

		expect(container).toBeInTheDocument();
	});
});

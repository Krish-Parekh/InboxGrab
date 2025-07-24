import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar";
import * as nextAuth from "next-auth/react";

jest.mock("next-auth/react", () => ({
	...jest.requireActual("next-auth/react"),
	useSession: jest.fn(),
	signIn: jest.fn(),
	signOut: jest.fn(),
}));

describe("Navbar", () => {
	const mockSession = {
		data: {
			user: {
				name: "Test User",
				email: "test@example.com",
				image: "https://github.com/shadcn.png",
			},
			expires: "2025-12-31T23:59:59.999Z",
		},
		status: "authenticated",
	};

	beforeEach(() => {
		(nextAuth.useSession as jest.Mock).mockReturnValue(mockSession);
		(nextAuth.signIn as jest.Mock).mockClear();
		(nextAuth.signOut as jest.Mock).mockClear();
	});

	it("should render the navbar", () => {
		const { container } = render(
			<SessionProvider session={mockSession.data as any}>
				<Navbar />
			</SessionProvider>,
		);
		expect(container).toBeInTheDocument();
	});

	it("should render the navbar with the correct title", async () => {
		render(
			<SessionProvider session={mockSession.data as any}>
				<Navbar />
			</SessionProvider>,
		);
		expect(await screen.findByText("Gmail Extractor")).toBeInTheDocument();
	});

	it("should render the navbar with the correct button", async () => {
		render(
			<SessionProvider session={mockSession.data as any}>
				<Navbar />
			</SessionProvider>,
		);
		expect(
			await screen.findByRole("button", { name: /logout/i }),
		).toBeInTheDocument();
	});

	it("should call signOut when the Logout button is clicked", async () => {
		const signOutMock = jest
			.spyOn(nextAuth, "signOut")
			.mockImplementation(() => Promise.resolve({} as any));

		render(
			<SessionProvider session={mockSession.data as any}>
				<Navbar />
			</SessionProvider>,
		);

		const logoutButton = await screen.findByRole("button", { name: /logout/i });
		fireEvent.click(logoutButton);

		expect(signOutMock).toHaveBeenCalledTimes(1);
		signOutMock.mockRestore();
	});
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmailDownloadAction from "@/components/email-download-action";
import { IEmailResponse } from "@/types/main";
import { useEmailSearchStore } from "@/store/email.store";

const mockEmail: IEmailResponse = {
	id: "1",
	threadId: "1",
	from: "test@example.com",
	subject: "Test Email",
	date: new Date().toISOString(),
	attachments: [
		{
			id: "1",
			filename: "test.pdf",
			mimeType: "application/pdf",
			size: 100,
			data: "test",
		},
		{
			id: "2",
			filename: "test2.pdf",
			mimeType: "application/pdf",
			size: 100,
			data: "test2",
		},
	],
};

jest.mock("@/store/email.store", () => ({
	useEmailSearchStore: jest.fn(),
}));

const mockDownloadAttachments = jest.fn();

beforeEach(() => {
	jest.clearAllMocks();
	(useEmailSearchStore as unknown as jest.Mock).mockImplementation(() => ({
		downloadAttachments: mockDownloadAttachments,
	}));
});

describe("EmailDownloadAction", () => {
	it("should render the email download action", () => {
		const { container } = render(<EmailDownloadAction email={mockEmail} />);
		expect(container).toBeInTheDocument();
	});

	it("should render the download button", () => {
		render(<EmailDownloadAction email={mockEmail} />);
		expect(
			screen.getByRole("button", { name: "Download" }),
		).toBeInTheDocument();
	});

	it("should call downloadAttachments with correct arguments", async () => {
		mockDownloadAttachments.mockResolvedValue(undefined);
		render(<EmailDownloadAction email={mockEmail} />);
		const downloadButton = screen.getByRole("button", { name: "Download" });

		fireEvent.click(downloadButton);

		await waitFor(() => {
			expect(mockDownloadAttachments).toHaveBeenCalledWith([
				{
					attachmentId: "1",
					messageId: "1",
					date: mockEmail.date,
					subject: mockEmail.subject,
				},
				{
					attachmentId: "2",
					messageId: "1",
					date: mockEmail.date,
					subject: mockEmail.subject,
				},
			]);
		});
	});

	it("should show loading spinner and disable button when downloading", async () => {
		mockDownloadAttachments.mockResolvedValue(undefined);
		render(<EmailDownloadAction email={mockEmail} />);
		const button = screen.getByRole("button", { name: /download/i });
		fireEvent.click(button);
		expect(button).toBeDisabled();

		expect(screen.getByTestId("loader-icon")).toBeInTheDocument();

		await waitFor(() => {
			expect(button).not.toBeDisabled();
		});
	});
});

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmailTable from "@/components/email-table";
import { IEmailServerResponse } from "@/types/main";
import { useEmailSearchStore } from "@/store/email.store";

const mockData: IEmailServerResponse = {
	emails: [
		{
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
		},
	],
	message: "success",
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

describe("EmailTable", () => {
	it("should render the email table", () => {
		const { container } = render(
			<EmailTable data={mockData} isLoading={false} />,
		);
		expect(container).toBeInTheDocument();
	});

	it("should render title and download all button", () => {
		render(<EmailTable data={mockData} isLoading={false} />);
		expect(screen.getByText("Emails")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Download All" }),
		).toBeInTheDocument();
	});

	it("should render the email table with the correct data", () => {
		render(<EmailTable data={mockData} isLoading={false} />);
		expect(screen.getByText("Test Email")).toBeInTheDocument();
		expect(screen.getByText("test@example.com")).toBeInTheDocument();
	});

	it("loading state should show loading spinner and disable download all button", () => {
		render(<EmailTable data={mockData} isLoading={true} />);
		expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
		expect(screen.getByTestId("loader-icon")).toHaveClass("animate-spin");
	});

	it("should call downloadAttachments when download all button is clicked", async () => {
		mockDownloadAttachments.mockResolvedValue(undefined);
		render(<EmailTable data={mockData} isLoading={false} />);
		const downloadAllButton = screen.getByRole("button", {
			name: "Download All",
		});
		fireEvent.click(downloadAllButton);

		await waitFor(() => {
			expect(mockDownloadAttachments).toHaveBeenCalledWith([
				{
					attachmentId: "1",
					messageId: "1",
					date: mockData.emails[0].date,
					subject: mockData.emails[0].subject,
				},
				{
					attachmentId: "2",
					messageId: "1",
					date: mockData.emails[0].date,
					subject: mockData.emails[0].subject,
				},
			]);
		});
	});

	it("should show loading spinner and disable download all button when downloading", async () => {
		mockDownloadAttachments.mockResolvedValue(undefined);
		render(<EmailTable data={mockData} isLoading={false} />);
		const downloadAllButton = screen.getByRole("button", {
			name: "Download All",
		});
		fireEvent.click(downloadAllButton);
		expect(downloadAllButton).toBeDisabled();
		expect(screen.getByTestId("download-loader-icon")).toBeInTheDocument();

		await waitFor(() => {
			expect(downloadAllButton).not.toBeDisabled();
		});
	});
});

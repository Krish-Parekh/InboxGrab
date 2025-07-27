import { useEmailSearchStore } from "@/store/email.store";
import { IEmailDownloadRequest, IEmailServerRequest } from "@/types/main";

describe("useEmailSearchStore", () => {
	afterEach(() => {
		useEmailSearchStore.setState({
			triggerSearch: () => {},
			downloadAttachments: async () => {},
		});
	});

	it("should trigger search when set", () => {
		const mockTrigger = jest.fn();

		useEmailSearchStore.getState().setTriggerSearch(mockTrigger);

		const request: IEmailServerRequest = {
			from: "test@example.com",
			startDate: new Date(),
			endDate: new Date(),
		};

		useEmailSearchStore.getState().triggerSearch(request);

		expect(mockTrigger).toHaveBeenCalledWith(request);
	});

	it("should download attachments when set", async () => {
		const mockDownload = jest.fn();

		useEmailSearchStore.getState().setDownloadAttachments(mockDownload);

		const request: IEmailDownloadRequest[] = [
			{
				messageId: "123",
				attachmentId: "456",
				date: new Date().toISOString(),
				subject: "Test Subject",
			},
		];

		await useEmailSearchStore.getState().downloadAttachments(request);

		expect(mockDownload).toHaveBeenCalledWith(request);
	});
});

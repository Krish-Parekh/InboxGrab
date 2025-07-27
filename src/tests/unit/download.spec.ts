import { downloadAttachments } from "@/lib/download";
import { IEmailDownloadRequest } from "@/types/main";

describe("downloadAttachments", () => {
	let triggerDownloadMock: jest.Mock;
	let appendChildSpy: jest.SpyInstance;
	let removeChildSpy: jest.SpyInstance;
	let clickMock: jest.Mock;

	beforeEach(() => {
		triggerDownloadMock = jest
			.fn()
			.mockResolvedValue(
				new Blob(["dummy content"], { type: "application/zip" }),
			);

		(global.URL.createObjectURL as jest.Mock) = jest.fn(
			() => "blob:http://localhost/fake-url",
		);
		(global.URL.revokeObjectURL as jest.Mock) = jest.fn();

		clickMock = jest.fn();
		const fakeLink = {
			click: clickMock,
			href: "",
			download: "",
		} as unknown as HTMLAnchorElement;

		jest.spyOn(document, "createElement").mockReturnValue(fakeLink);

		appendChildSpy = jest
			.spyOn(document.body, "appendChild")
			.mockImplementation(() => {
				return document.body;
			});
		removeChildSpy = jest
			.spyOn(document.body, "removeChild")
			.mockImplementation(() => {
				return document.body;
			});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("calls triggerDownload and downloads the file", async () => {
		const attachments: IEmailDownloadRequest[] = [
			{ messageId: "1", attachmentId: "a1", date: new Date().toISOString(), subject: "test" },
		];

		await downloadAttachments({
			attachments,
			triggerDownload: triggerDownloadMock,
			filename: "test.zip",
		});

		expect(triggerDownloadMock).toHaveBeenCalledWith(attachments);
		expect(global.URL.createObjectURL).toHaveBeenCalled();
		expect(clickMock).toHaveBeenCalled();
		expect(appendChildSpy).toHaveBeenCalled();
		expect(removeChildSpy).toHaveBeenCalled();
		expect(global.URL.revokeObjectURL).toHaveBeenCalled();
	});

	it("logs error when triggerDownload fails", async () => {
		console.error = jest.fn();
		triggerDownloadMock.mockRejectedValue(new Error("Failed"));

		await downloadAttachments({
			attachments: [],
			triggerDownload: triggerDownloadMock,
			filename: "fail.zip",
		});

		expect(console.error).toHaveBeenCalledWith(
			"Download failed:",
			expect.any(Error),
		);
	});
});

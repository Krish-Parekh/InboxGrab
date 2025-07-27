import { postFetcher } from "@/lib/fetcher";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";

beforeEach(() => {
	fetchMock.resetMocks();
});

describe("postFetcher", () => {
	it("should return JSON on successful response", async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			status: 200,
			statusText: "OK",
			headers: {
				get: (key: string) => {
					if (key === "content-type") return "application/json";
					return null;
				},
			},
			json: () => Promise.resolve({ message: "success" }),
		});

		const fetcher = postFetcher();
		const response = await fetcher("/api/test", {
			arg: { input: "hello" },
		});

		expect(response).toEqual({ message: "success" });
		expect(global.fetch).toHaveBeenCalledWith(
			"/api/test",
			expect.objectContaining({
				method: "POST",
			}),
		);
	});

	it("should return blob when content-type is application/zip", async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			status: 200,
			statusText: "OK",
			headers: {
				get: (key: string) => {
					if (key === "content-type") return "application/zip";
					return null;
				},
			},
			blob: () =>
				Promise.resolve(new Blob(["test"], { type: "application/zip" })),
		});

		const fetcher = postFetcher();
		const response = await fetcher("/api/test", {
			arg: { input: "hello" },
		});

		expect(response).toBeInstanceOf(Blob);
		expect(response.type).toBe("application/zip");
	});
});

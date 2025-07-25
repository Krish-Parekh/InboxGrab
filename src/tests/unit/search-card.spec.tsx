import SearchCard from "@/components/search-card";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("SearchCard", () => {
	it("should render the search card", () => {
		const { container } = render(<SearchCard onSearch={() => {}} />);
		expect(container).toBeInTheDocument();
	});

	it("should render the search card with the correct title", () => {
		render(<SearchCard onSearch={() => {}} />);
		expect(screen.getByText("Search Filters")).toBeInTheDocument();
	});

	it("should render the search card with the correct button", () => {
		render(<SearchCard onSearch={() => {}} />);
		expect(screen.getByTestId("refresh-button")).toBeInTheDocument();
	});

	it("should render the search card with the correct form", () => {
		render(<SearchCard onSearch={() => {}} />);
		expect(screen.getByTestId("search-form")).toBeInTheDocument();
	});
});

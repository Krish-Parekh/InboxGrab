import SearchForm from "@/components/search-form";
import "@testing-library/jest-dom";
import {
	act,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";

describe("SearchForm", () => {
	it("should render the search form", () => {
		const { container } = render(<SearchForm />);
		expect(container).toBeInTheDocument();
	});

	it("should render the form label for from field", () => {
		render(<SearchForm />);
		expect(screen.getByLabelText("From")).toBeInTheDocument();
	});

	it("should render the form input for from field", () => {
		render(<SearchForm />);
		expect(screen.getByPlaceholderText("From")).toBeInTheDocument();
	});

	it("should render the form label for start date field", () => {
		render(<SearchForm />);
		expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
	});

	it("should render the form label for end date field", () => {
		render(<SearchForm />);
		expect(screen.getByLabelText("End Date")).toBeInTheDocument();
	});

	it("should show validation on submitting empty form", async () => {
		render(<SearchForm />);
		await act(async () => {
			fireEvent.click(screen.getByRole("button", { name: "Search" }));
		});
		expect(screen.getByText("Invalid email address")).toBeInTheDocument();
	});

	it("should show validation on submitting invalid email", async () => {
		render(<SearchForm />);
		await act(async () => {
			fireEvent.change(screen.getByPlaceholderText("From"), {
				target: { value: "invalid-email" },
			});
			fireEvent.click(screen.getByRole("button", { name: "Search" }));
		});
		expect(screen.getByText("Invalid email address")).toBeInTheDocument();
	});
});

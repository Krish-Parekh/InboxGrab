import Home from "@/app/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Home", () => {
	it("should render a heading", () => {
		render(<Home />);
		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading).toHaveTextContent("Hello World");
	});
});

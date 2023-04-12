import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App", () => {
  test("renders page not found", async () => {
    render(
      <MemoryRouter initialEntries={["/non-existing-page"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Could not find page/i)).toBeInTheDocument();
  });
});

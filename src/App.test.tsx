import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

import App from "./App";

jest.mock("./synapse/authProvider", () => ({
  __esModule: true,
  default: {
    logout: jest.fn().mockResolvedValue(undefined),
  },
}));

describe("App", () => {
  it("renders", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const heading = await screen.findByText("Welcome to Synapse-admin");
    expect(heading).toBeInTheDocument();
  });
});

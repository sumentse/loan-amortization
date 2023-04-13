import { render, screen } from "@testing-library/react";
import Table from "./";

const mockColumns = [
  { headerName: "Month", field: "month" },
  {
    headerName: "Open Balance",
    field: "open_balance",
    valueFormatter: (value) => value.toFixed(2),
  },
  {
    headerName: "Total Payment",
    field: "total_payment",
    valueFormatter: (value) => value.toFixed(2),
  },
  {
    headerName: "Principal Payment",
    field: "principal_payment",
    valueFormatter: (value) => value.toFixed(2),
  },
  {
    headerName: "Interest Payment",
    field: "interest_payment",
    valueFormatter: (value) => value.toFixed(2),
  },
  {
    headerName: "Close Balance",
    field: "close_balance",
    valueFormatter: (value) => value.toFixed(2),
  },
];

const mockData = [
  {
    month: 1,
    open_balance: 100,
    total_payment: 8.79158872300099,
    principal_payment: 7.958255389667657,
    interest_payment: 0.8333333333333334,
    close_balance: 92.04174461033234,
  },
  {
    month: 2,
    open_balance: 92.04174461033234,
    total_payment: 8.79158872300099,
    principal_payment: 8.024574184581553,
    interest_payment: 0.7670145384194362,
    close_balance: 84.01717042575079,
  },
  {
    month: 3,
    open_balance: 84.01717042575079,
    total_payment: 8.79158872300099,
    principal_payment: 8.091445636119733,
    interest_payment: 0.7001430868812566,
    close_balance: 75.92572478963106,
  },
  {
    month: 4,
    open_balance: 75.92572478963106,
    total_payment: 8.79158872300099,
    principal_payment: 8.158874349754065,
    interest_payment: 0.6327143732469255,
    close_balance: 67.766850439877,
  },
  {
    month: 5,
    open_balance: 67.766850439877,
    total_payment: 8.79158872300099,
    principal_payment: 8.226864969335349,
    interest_payment: 0.5647237536656418,
    close_balance: 59.53998547054165,
  },
  {
    month: 6,
    open_balance: 59.53998547054165,
    total_payment: 8.79158872300099,
    principal_payment: 8.295422177413142,
    interest_payment: 0.4961665455878472,
    close_balance: 51.24456329312851,
  },
  {
    month: 7,
    open_balance: 51.24456329312851,
    total_payment: 8.79158872300099,
    principal_payment: 8.364550695558252,
    interest_payment: 0.4270380274427376,
    close_balance: 42.88001259757026,
  },
  {
    month: 8,
    open_balance: 42.88001259757026,
    total_payment: 8.79158872300099,
    principal_payment: 8.434255284687904,
    interest_payment: 0.3573334383130855,
    close_balance: 34.44575731288235,
  },
  {
    month: 9,
    open_balance: 34.44575731288235,
    total_payment: 8.79158872300099,
    principal_payment: 8.504540745393637,
    interest_payment: 0.28704797760735296,
    close_balance: 25.941216567488713,
  },
  {
    month: 10,
    open_balance: 25.941216567488713,
    total_payment: 8.79158872300099,
    principal_payment: 8.575411918271918,
    interest_payment: 0.21617680472907264,
    close_balance: 17.365804649216795,
  },
  {
    month: 11,
    open_balance: 17.365804649216795,
    total_payment: 8.79158872300099,
    principal_payment: 8.646873684257516,
    interest_payment: 0.1447150387434733,
    close_balance: 8.718930964959279,
  },
  {
    month: 12,
    open_balance: 8.718930964959279,
    total_payment: 8.79158872300099,
    principal_payment: 8.718930964959663,
    interest_payment: 0.07265775804132733,
    close_balance: -3.836930773104541e-13,
  },
];

describe("Table", () => {
  it("renders", () => {
    render(<Table dataId="mockTable" columns={mockColumns} rows={mockData} />);
    expect(screen.getByTestId("mockTable")).toBeInTheDocument();
    expect(screen.getByTestId("mockTable-pagination")).toBeInTheDocument();
  });
  it("renders without pagination", () => {
    render(
      <Table
        dataId="mockTable"
        columns={mockColumns}
        rows={mockData}
        disablePagination
      />
    );
    expect(screen.getByTestId("mockTable")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mockTable-pagination")
    ).not.toBeInTheDocument();
  });
});

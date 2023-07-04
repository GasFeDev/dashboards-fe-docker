import React from "react";
import { render, screen } from "@testing-library/react";
import { DataTable } from "./DataTable";

const fn = jest.fn();

test("renders DataTable Table", () => {
  render(
    <DataTable
      dataSource={[]}
      columns={[]}
      total={0}
      onChange={fn}
      rowKey={"xyz"}
    />
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

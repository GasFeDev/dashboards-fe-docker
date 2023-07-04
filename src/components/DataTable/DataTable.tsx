import React from "react";
import { Table } from "antd";
import "./DataTable.css";

export interface DataTableProps {
  columns: any[];
  dataSource: never[];
  total: number;
  loading?: boolean;
  hook?: any;
  onChange: any;
  showTitleComponent?: boolean;
  rowKey: string;
  TitleComponent?: React.ReactNode;
}

export const DataTable = ({
  columns,
  dataSource,
  loading,
  total,
  onChange,
  showTitleComponent = false,
  rowKey,
  TitleComponent,
}: DataTableProps) => {
  return (
    <div className="data-table">
      <Table
        rowKey={(record) => record[`${rowKey}`]}
        loading={loading}
        bordered={false}
        dataSource={dataSource}
        columns={columns}
        title={showTitleComponent ? () => TitleComponent : undefined}
        scroll={{ x: "50vh" }}
        footer={() => ""}
        onChange={onChange}
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: ["10", "20", "50", "100"],
          position: ["bottomRight"],
          total: total,
          showSizeChanger: true,
          responsive: true,
        }}
      />
    </div>
  );
};

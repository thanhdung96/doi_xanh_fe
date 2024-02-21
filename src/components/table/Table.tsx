import React, { ReactElement } from "react";
import { Table as AntTable } from "antd";
import type { TableColumnsType } from "antd";
import { UserDto } from "@app/services/user.service";

const columns: TableColumnsType<UserDto> = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Group",
    dataIndex: ["groupUser", "title"],
  },
  {
    title: "First Name",
    dataIndex: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
];

interface UserTableParams {
  lstUsers: UserDto[];
}

// rowSelection object indicates the need for row selection
export const Table = ({ lstUsers }: UserTableParams): ReactElement => {
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: UserDto[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };


  return (
    <div>
      <AntTable
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        rowKey={(user) => user.id}
        columns={columns}
        dataSource={lstUsers}
      />
    </div>
  );
};

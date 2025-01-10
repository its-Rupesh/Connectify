import { Avatar, Skeleton } from "@mui/material";
import Table from "../../components/shared/Table";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { dashboardData } from "../../constants/sampleData";
import { transformImage } from "../../lib/feature";
import { useFetchData } from "6pp";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];
const UserManagement = () => {
  const {
    loading: isLoading,
    data,
    error,
  } = useFetchData(`${server}/api/v1/admin/users`, "dashboard-users");
  useErrors([{ isError: error, error: error }]);
  console.log(data);
  const [rows, setrows] = useState([]);
  useEffect(() => {
    if (data) {
      setrows(
        data?.message?.map((i) => ({
          ...i,
          id: i._id,
          avatar: transformImage(i.avatar, 50),
        }))
      );
    }
  }, [data]);
  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Table heading={"All Users"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default UserManagement;

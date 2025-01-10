import { useFetchData } from "6pp";
import { Avatar, Box, Stack } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import RenderAttachement from "../../components/shared/RenderAttachement";
import Table from "../../components/shared/Table";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
import { fileFormat, transformImage } from "../../lib/feature";
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachements",
    headerName: "Attachements",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachements } = params.row;
      return attachements?.length > 0
        ? attachements.map((i, index) => {
            const url = i.url;
            const file = fileFormat(url);
            return (
              <Box key={index}>
                <a
                  href={url}
                  download
                  target="_blank"
                  style={{ color: "black" }}
                >
                  {RenderAttachement(file, url)}
                </a>
              </Box>
            );
          })
        : "No Attachements";
      return <Avatar alt={params.row.name} src={params.row.avatar} />;
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Send By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];
const MessageManagement = () => {
  const {
    loading: isLoading,
    data,
    error,
  } = useFetchData(`${server}/api/v1/admin/messages`, "dashboard-messages");
  useErrors([{ isError: error, error: error }]);
  console.log("messages-data", data);
  const [rows, setrows] = useState([]);
  useEffect(() => {
    // Ensure correct mapping for rows
    setrows(
      data?.message?.map((i) => ({
        ...i,
        id: i._id, // Unique identifier for each row
        sender: {
          name: i.sender.name,
          avatar: transformImage(i.sender.avatar, 50),
        },
        createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      }))
    );
  }, [data]);
  return (
    <AdminLayout>
      <Table heading={"All Messages"} rows={rows} columns={columns} />
    </AdminLayout>
  );
};

export default MessageManagement;

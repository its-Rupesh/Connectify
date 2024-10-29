import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AvatarCard from "../../components/shared/AvatarCard";
import Table from "../../components/shared/Table";
import { dashboardData } from "../../constants/sampleData";
import { fileFormat, transformImage } from "../../lib/feature";
import moment from "moment";
import { Avatar, Box, Stack } from "@mui/material";
import RenderAttachement from "../../components/shared/RenderAttachement";
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
        ? attachements.map((i) => {
            const url = i.url;
            const file = fileFormat(url);
            return (
              <Box>
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
  const [rows, setrows] = useState([]);
  useEffect(() => {
    // Ensure correct mapping for rows
    setrows(
      dashboardData.messages.map((i) => ({
        ...i,
        id: i._id, // Unique identifier for each row
        sender: {
          name: i.sender.name,
          avatar: transformImage(i.sender.avatar, 50),
        },
        createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table heading={"All Messages"} rows={rows} columns={columns} />
    </AdminLayout>
  );
};

export default MessageManagement;

import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { blue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/feature";
import RenderAttachement from "./RenderAttachement";
import { motion } from "framer-motion";
const MessageComponent = ({ message, user }) => {
  const { sender, content, createdAt, attachements = [] } = message;
  const sameSender = sender?._id === user?._id;

  const timeago = moment(createdAt).fromNow();
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography color={blue} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}
      {attachements.length > 0 &&
        attachements.map((i, index) => {
          const url = i.url;
          const file = fileFormat(url);
          return (
            <Box key={index}>
              <a href={url} target="_blank" download style={{ color: "black" }}>
                {RenderAttachement(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"}>
        {timeago}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);

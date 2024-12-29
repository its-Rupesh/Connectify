import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setIsuploadingLoader } from "../../redux/reducers/misc";
import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,
  UploadFile as UploadFileIcon,
  VideoFile as VideoFileIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import {
  useSendAttachementMutation,
  useSendMultipleAttachementsMutation,
} from "../../redux/api/api";

const FileMenu = ({ anchorEl, chatId }) => {
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const [sendAttachement] = useSendAttachementMutation();
  const [multipleAttachement] = useSendMultipleAttachementsMutation();
  const { isFileMenu } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const closeFilemMenu = () => dispatch(setIsFileMenu(false));

  const selectRef = (ref) => {
    ref?.current?.click();
  };

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);
    console.log(files);
    if (files.length <= 0) {
      return;
    }
    if (files.length > 5) {
      return toast.error(`You can Only Send 5 ${key} at a Time`);
    }
    dispatch(setIsuploadingLoader(true));
    const toastId = toast.loading(`Sending ${key} ...`);
    console.log("working");
    closeFilemMenu();
    console.log("working2");

    // Fetching Here..
    try {
      console.log("working3");
      const myForm = new FormData();
      myForm.append("chatId", chatId);
      console.log("Myform", myForm);
      files.forEach((file) => myForm.append("files", file));
      console.log("working4");
      const res1 = await multipleAttachement({ myForm });
      console.log(res1);
      const res = await sendAttachement(myForm);
      console.log("working5");
      console.log(res);
      if (res.data) toast.success(`${key} sent Successfully`, { id: toastId });
      else toast.error(`Failed to Send ${key}`, { id: toastId });
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      dispatch(setIsuploadingLoader(false));
    }
  };
  return (
    <div style={{ width: "10rem" }}>
      <Menu anchorEl={anchorEl} open={isFileMenu} onClose={closeFilemMenu}>
        <MenuList>
          <MenuItem onClick={() => selectRef(imageRef)}>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/gif"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Images")}
              ref={imageRef}
            />
          </MenuItem>
          <MenuItem onClick={() => selectRef(audioRef)}>
            <Tooltip title="Audio">
              <AudioFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="audio/mpeg,audio/wav"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Audios")}
              ref={audioRef}
            />
          </MenuItem>
          <MenuItem onClick={() => selectRef(videoRef)}>
            <Tooltip title="Video">
              <VideoFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4,video/webm,video/ogg"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Videos")}
              ref={videoRef}
            />
          </MenuItem>
          <MenuItem onClick={() => selectRef(fileRef)}>
            <Tooltip title="File">
              <UploadFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
            <input
              type="file"
              multiple
              accept="*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Files")}
              ref={fileRef}
            />
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default FileMenu;

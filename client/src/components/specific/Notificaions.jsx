import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../../constants/sampleData";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationQuery,
} from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const Notificaions = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const { data, error, isLoading, isError } = useGetNotificationQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation();
  const dispatch = useDispatch();

  const friendRequesthandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    try {
      const res = await acceptRequest({ requestId: _id, accept });
      if (res.data?.success) {
        console.log("Use Socket Here");
        toast.success(res.data.message);
      } else {
        toast.error(res.data?.error || "Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const oncloseHandler = () => {
    dispatch(setIsNotification(false));
  };
  return (
    <Dialog open={isNotification} onClose={oncloseHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.message.length > 0 ? (
              data?.message.map((i) => (
                <NotificaionsItem
                  sender={i.sender}
                  _id={i._id}
                  handler={friendRequesthandler}
                  key={i._id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>No Notification</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};
const NotificaionsItem = memo(({ sender, _id, handler }) => {
  const { avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${sender.name} Send you Friend Request`}
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }}>
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});
export default Notificaions;

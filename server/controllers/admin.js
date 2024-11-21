import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";

const allUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    const transformedUser = await Promise.all(
      users.map(async ({ name, username, avatar, _id }) => {
        const [groups, friends] = await Promise.all([
          Chat.countDocuments({ groupchat: true, members: _id }),
          Chat.countDocuments({ groupchat: false, members: _id }),
        ]);
        return { name, username, avatar: avatar.url, _id, groups, friends };
      })
    );
    return res.status(200).json({
      status: "success",
      message: transformedUser,
    });
  } catch (error) {
    next(error);
  }
};
const allChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({})
      .populate("members", "name avatar")
      .populate("creator", "name avatar");
    const transformedChat = await Promise.all(
      chats.map(async ({ members, _id, groupchat, name, creator }) => {
        const totalMessages = await Message.countDocuments({ chat: _id });
        return {
          _id,
          groupchat,
          name,
          avatar: members.slice(0, 3).map((member) => member.avatar.url),
          members: members.map((member) => ({
            _id: member._id,
            name: member.name,
            avatar: member.avatar.url,
          })),
          creator: {
            name: creator?.name || "None",
            avatar: creator?.avatar.url || "",
          },
          totalMember: members.length,
          totalMessages,
        };
      })
    );
    return res.status(200).json({ success: true, message: transformedChat });
  } catch (error) {
    next(error);
  }
};
export { allUser, allChats };

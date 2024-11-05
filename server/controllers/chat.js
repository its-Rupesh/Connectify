import { ErrorHandler } from ".././utils/utility.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { Chat } from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
const newGroupChat = async (req, res, next) => {
  try {
    // We will get name,member in req object
    const { name, members } = req.body;
    // members length should be greater than 2
    if (members.length < 2) {
      return next(
        new ErrorHandler("Group Chat Required More than 2 Members", 400)
      );
    }
    // Memeber should contain req.user->our Group id
    const allMembers = [...members, req.user];
    await Chat.create({
      name,
      groupchat: true,
      creator: req.user,
      members: allMembers,
    });

    // Emit Event to all Members of Group
    emitEvent(req, ALERT, allMembers, `Welcome to ${name}Group`);
    // Emit Event to all Members of Group Except us
    emitEvent(req, REFETCH_CHATS, members);

    return res.status(201).json({ success: true, message: "Group Created" });
  } catch (error) {
    next(error);
  }
};
export { newGroupChat };

import { ErrorHandler } from ".././utils/utility.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { Chat } from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
const newGroupChat = async (req, res, next) => {
  try {
    // We will get name,member in req object
    // Members array
    const { name, members } = req.body;
    // members length should be greater than 2
    if (members.length < 2) {
      return next(
        new ErrorHandler("Group Chat Required More than 2 Members", 400)
      );
    }
    // Memeber should contain req.user->our Group id
    //user is user id peforming at middleware auth
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
// Used for GetMyChat
//1. Get your chat from your id in members fild of chat
//2. The .populate() method in Mongoose is a powerful tool that allows you to fetch related data from a different collection. When you call populate on a Mongoose query, it replaces specified fields in a document with documents from another collection.
//3. .populate(field to be changed,req info to be fetched from different collecton)
const getMyChat = async (req, res, next) => {
  try {
    const chats = await Chat.find({ members: req.user }).populate(
      "members",
      "name avatar"
    );

    // 1.Transformed Chat is Used for group,Individual Chats
    // 2.Add Avatar Component->if groupchat is present then make object of avatar slice is used if groupchat not present then user name will be shown
    // 3.Same with Name
    // 4.member only _id is gathered using reducer
    const transformedChats = chats.map(({ _id, name, groupchat, members }) => {
      const otherMembers = getOtherMember(members, req.user);
      return {
        _id,
        groupchat,
        avatar: groupchat
          ? members.slice(0, 3).map((member) => member.avatar.url)
          : [otherMembers?.avatar?.url],
        name: groupchat ? name : [otherMembers.avatar.name],
        members: members.reduce((accumulator, curr) => {
          if (curr._id.toString() != req.user) {
            accumulator.push(curr._id);
          }
          return accumulator;
        }, []),
      };
    });
    if (!chats) return next(new ErrorHandler("No Chats Present", 401));
    return res.status(200).json({ sucess: true, message: transformedChats });
  } catch (error) {
    next(error);
  }
};
export { newGroupChat, getMyChat };

import { ErrorHandler } from ".././utils/utility.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
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
const getMyGroups = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      members: req.user,
      groupchat: true,
      creator: req.user,
    }).populate("members", "name avatar");

    const groups = chats.map(({ members, _id, groupchat, name }) => ({
      _id,
      groupchat,
      name,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
    }));
    return res.status(200).json({ success: true, message: groups });
  } catch (error) {
    next(error);
  }
};
const addMembers = async (req, res, next) => {
  try {
    const { chatId, members } = req.body;
    if (!members || members.length < 1) {
      next(new ErrorHandler("Provide Members", 400));
    }
    const chat = await Chat.findById(chatId);
    if (!chat) return next(new ErrorHandler("Chat Not Found", 404));
    if (!chat.groupchat)
      return next(new ErrorHandler("No Group Chat Available", 404));
    if (chat.creator.toString() != req.user.toString())
      return next(new ErrorHandler("You are Not Allowed To Add Members", 403));
    //For each i, it calls User.findById(i), which returns a promise (because User.findById is asynchronous).The result is an array of promises, not the actual user data yet.
    const allNewMemberPromise = members.map((i) => User.findById(i, "name"));
    //Promise.all takes the array of promises (allNewMemberPromise) and waits for all of them to resolve.Once all the promises resolve, it returns an array containing the resolved values (i.e., the actual user objects fetched by User.findById).
    const allNewMembers = await Promise.all(allNewMemberPromise);
    const uniqueMembers = allNewMembers
      .filter((i) => !chat.members.includes(i._id.toString()))
      .map((i) => i._id);
    chat.members.push(...uniqueMembers);
    if (chat.members > 50)
      return next(new ErrorHandler("Group Members Limit is Reached", 400));
    await chat.save();
    const allUserName = allNewMembers.map((i) => i.name).join(",");
    emitEvent(
      req,
      ALERT,
      chat.members,
      `${allUserName} has been Added to the Group`
    );
    emitEvent(req, REFETCH_CHATS, chat.members);
    return res
      .status(200)
      .json({ success: true, message: "Member Added Successfully" });
  } catch (error) {
    next(error);
  }
};
export { newGroupChat, getMyChat, getMyGroups, addMembers };

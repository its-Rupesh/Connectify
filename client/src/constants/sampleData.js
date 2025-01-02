export const samplechats = [
  {
    avatar: [
      "https://res.cloudinary.com/dgt5opbv9/image/upload/v1734935067/13059bb8-4f06-4394-add8-e5213ee967d3.jpg",
    ],
    name: "John Doe",
    _id: "1",
    groupChat: "false",
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://res.cloudinary.com/dgt5opbv9/image/upload/v1734935067/13059bb8-4f06-4394-add8-e5213ee967d3.jpg",
    ],
    name: "Jane Doe",
    _id: "2",
    groupChat: "false",
    members: ["1", "2"],
  },
];
export const sampleUsers = [
  {
    avatar: [
      "https://res.cloudinary.com/dgt5opbv9/image/upload/v1734935067/13059bb8-4f06-4394-add8-e5213ee967d3.jpg",
    ],
    name: "John Doe",
    _id: "1",
  },
  {
    avatar: [
      "https://res.cloudinary.com/dgt5opbv9/image/upload/v1734935067/13059bb8-4f06-4394-add8-e5213ee967d3.jpg",
    ],
    name: "Jane Doe",
    _id: "2",
  },
];
export const sampleNotifications = [
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "John Doe",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Jane Doe",
    },
    _id: "2",
  },
];
export const sampleMessage = [
  {
    attachments: [
      {
        public_id: "1",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "Bol Bhai ??",
    _id: "1",
    sender: { _id: "2", name: "Rupesh" },
    chat: "chatId",
    createdAt: "2024-10-03T10:41:30.630Z",
  },
  {
    attachments: [
      {
        public_id: "2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "tu bol",
    _id: "2",
    sender: { _id: "1", name: "Lokesh" },
    chat: "asdfghyuiop",
    createdAt: "2024-10-03T10:41:30.630Z",
  },
];
export const dashboardData = {
  users: [
    {
      name: "John Doe",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "1",
      username: "john_doe",
      friends: 20,
      groups: 5,
    },
    {
      name: "Jane Doe",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      username: "jane_doe",
      friends: 20,
      groups: 5,
    },
  ],
  chats: [
    {
      name: "John Doe",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: "false",
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "John Doe",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      },
    },
    {
      name: "Jane Doe",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      groupChat: "false",
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 10,
      creator: {
        name: "Jane Doe",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      },
    },
  ],
  messages: [
    {
      attachments: [],
      content: "Bol Na Bhaii",
      _id: "qwerty",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Rupesh",
      },
      groupChat: true,
      chat: "chatId",
      createdAt: "2024-10-03T10:41:30.630Z",
    },
    {
      attachments: [
        {
          public_id: "asdfg",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "Tu Bol",
      _id: "qwer",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Rupesh",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2024-10-03T10:41:30.630Z",
    },
  ],
};

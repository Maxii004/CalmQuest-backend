import { MESSAGES_POPULATE_ATTRIBUTES } from "../config/constants.js";
import { ZenBudMessages, UserMessages } from "../models/index.js";
import ApiError from "../utils/apiError.js";

export const addZenBudMessage = async (reqbody) => {
  try {
    const message = {
      receiver: reqbody.receiver,
      content: reqbody.content,
    };
    let newMessage = await ZenBudMessages.create(message);
    newMessage = newMessage.populate(
      "receiver",
      MESSAGES_POPULATE_ATTRIBUTES.RECEIVER
    );
    return newMessage;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Unable to send message");
  }
};

export const addZenBudUserMessage = async (reqbody) => {
  try {
    const message = {
      author: reqbody.author,
      content: reqbody.content,
    };
    let newMessage = await UserMessages.create(message);
    newMessage = newMessage.populate(
      "author",
      MESSAGES_POPULATE_ATTRIBUTES.AUTHOR
    );
    return newMessage;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Unable to send message");
  }
};

export const getZenBudMessages = async (id) => {
  const options = {
    sort: { createdAt: 1 },
    populate: {
      path: "receiver",
      select: MESSAGES_POPULATE_ATTRIBUTES.RECEIVER,
    },
  };
  try {
    const messages = await ZenBudMessages.find({ receiver: id }, {}, options);
    return messages;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Unable to get messages");
  }
};

export const getZenBudUserMessages = async (id) => {
  const options = {
    sort: { createdAt: 1 },
    populate: { path: "author", select: MESSAGES_POPULATE_ATTRIBUTES.AUTHOR },
  };
  try {
    const messages = await UserMessages.find(
      { author: id, isCalmCrewMessage: false },
      {},
      options
    );
    return messages;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Unable to get messages");
  }
};

export const getZenBudConversation = async (id) => {
  const userMessages = await getZenBudUserMessages(id);
  const zenBudMessages = await getZenBudMessages(id);
  const conversation = [...userMessages, ...zenBudMessages];
  conversation.sort((a, b) => a.createdAt - b.createdAt);
  return conversation;
};

export default {
  addZenBudMessage,
  addZenBudUserMessage,
  getZenBudMessages,
  getZenBudUserMessages,
  getZenBudConversation,
};

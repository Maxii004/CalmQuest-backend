import httpStatus from "http-status";
import { UserMessages } from "../models/index.js";
import ApiError from "../utils/apiError.js";
import { MESSAGES_POPULATE_ATTRIBUTES } from "../config/constants.js";

export const addCalmCrewMessage = async (reqbody) => {
  try {
    const message = {
      author: reqbody.author,
      content: reqbody.content,
      isCalmCrewMessage: true,
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
//
export const getCalmCrewMessages = async () => {
  const options = {
    sort: { createdAt: 1 },
    populate: { path: "author", select: MESSAGES_POPULATE_ATTRIBUTES.AUTHOR },
  };
  try {
    const messages = await UserMessages.find(
      { isCalmCrewMessage: true },
      {},
      options
    );
    return messages;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Unable to get messages");
  }
};

export default {
  addCalmCrewMessage,
  getCalmCrewMessages,
};

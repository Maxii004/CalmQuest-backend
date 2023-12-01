import httpStatus from "http-status";
import zenBudServices from "../services/zen-bud.services.js";

export const addZenBudMessage = async (req, res) => {
  try {
    const message = await zenBudServices.addZenBudMessage(req.body);
    res.status(httpStatus.CREATED).send(message);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
};

export const addZenBudUserMessage = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(httpStatus.BAD_REQUEST).send({ error: "Invalid user id" });
  }
  const reqBody = {
    ...req.body,
    author: userId,
  };
  try {
    const message = await zenBudServices.addZenBudUserMessage(reqBody);
    res.status(httpStatus.CREATED).send(message);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
};

export const getZenBudMessages = async (req, res) => {
  const receiverId = req.body.receiver;
  try {
    const messages = await zenBudServices.getZenBudMessages(receiverId);
    res.status(httpStatus.OK).send(messages);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: "Error fetching data" });
  }
};

export const getZenBudUserMessages = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(httpStatus.BAD_REQUEST).send({ error: "Invalid user id" });
  }
  try {
    const messages = await zenBudServices.getZenBudUserMessages(userId);
    res.status(httpStatus.OK).send(messages);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: "Error fetching data" });
  }
};

export default {
  addZenBudMessage,
  addZenBudUserMessage,
  getZenBudMessages,
  getZenBudUserMessages,
};

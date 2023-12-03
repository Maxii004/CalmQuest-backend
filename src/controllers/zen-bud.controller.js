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
  try {
    const message = await zenBudServices.addZenBudUserMessage(req.body);
    res.status(httpStatus.CREATED).send(message);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
};

export const getZenBudConversation = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversation = await zenBudServices.getZenBudConversation(userId);
    res.status(httpStatus.OK).send(conversation);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
};

export default {
  addZenBudMessage,
  addZenBudUserMessage,
  getZenBudConversation,
};

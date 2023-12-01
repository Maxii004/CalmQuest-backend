import httpStatus from "http-status";
import calmCrewServices from "../services/calm-crew.services.js";

export const addCalmCrewMessage = async (req, res) => {
  try {
    const message = await calmCrewServices.addCalmCrewMessage(req.body);
    res.status(httpStatus.CREATED).send(message);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
};

export const getCalmCrewMessages = async (req, res) => {
  try {
    const messages = await calmCrewServices.getCalmCrewMessages();
    res.status(httpStatus.OK).send(messages);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: "Error fetching data" });
  }
};

export default {
  addCalmCrewMessage,
  getCalmCrewMessages,
};

import { Schema, model } from "mongoose";

const userMessages = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: "String",
      required: true,
    },
    isCalmCrewMessage: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserMessages = model("UserMessages", userMessages);

export default UserMessages;

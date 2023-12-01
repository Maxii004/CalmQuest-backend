import { Schema, model } from "mongoose";

const zenBudMessages = new Schema(
  {
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: String,
      default: "ZenBud",
    },
    content: {
      type: "String",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//
const ZenBudMessages = model("ZenBudMessages", zenBudMessages);
//
export default ZenBudMessages;

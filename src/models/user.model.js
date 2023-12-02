import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: { true: "Name is required" },
  },
  age: {
    type: Number,
    required: { true: "Age is required" },
  },
  email: {
    type: String,
    required: { true: "Email is required" },
    unique: { true: "Email already exists" },
  },
  password: {
    type: String,
    required: { true: "Password is required" },
    min: [8, "Password must be at least 6 characters"],
  },
  latestDailyAverageScore: {
    type: Schema.Types.ObjectId,
    ref: "DailyAverageScore",
  },
  interests: {
    type: [String],
  },
});

const User = model("User", userSchema);

export default User;

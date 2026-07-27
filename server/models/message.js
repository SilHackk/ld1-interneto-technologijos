import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    consent: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Message", messageSchema);
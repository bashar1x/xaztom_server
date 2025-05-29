import mongoose, { model, Schema } from "mongoose";

const MessageSchema = new Schema({
  role: { type: String, required: true },
  parts: { type: [Schema.Types.Mixed], required: true },
  serching: { type: [Schema.Types.Mixed], default: undefined }
}, {
  _id: false,
  timestamps: false,
  strict: false
});

const historySchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'new chat' },
  messages: [MessageSchema],
}, {
  timestamps: true
});

const History = model("History", historySchema);
export default History;

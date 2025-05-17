import mongoose, { model, Schema } from "mongoose";

const imageSchema = new Schema({
  name: { type: String, required: true },
  mimeType: { type: String, required: true },
  data: { type: Buffer, required: true },
}, {
  timestamps: true
});

export default model('Image', imageSchema);

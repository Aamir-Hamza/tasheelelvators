import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const QuoteLeadSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    projectType: { type: String },
    serviceType: { type: String },
    floors: { type: Number },
    capacity: { type: Number },
    units: { type: Number },
    city: { type: String },
    notes: { type: String },
    details: { type: String },
    estimate: {
      low: Number,
      high: Number,
    },
  },
  { timestamps: true }
);

export type QuoteLeadDocument = InferSchemaType<typeof QuoteLeadSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const QuoteLead: Model<QuoteLeadDocument> =
  mongoose.models.QuoteLead ??
  mongoose.model<QuoteLeadDocument>("QuoteLead", QuoteLeadSchema);

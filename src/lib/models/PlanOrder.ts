import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const PlanOrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    division: {
      type: String,
      enum: ["elevators", "cctv", "maintenance"],
      required: true,
    },
    planName: { type: String, required: true },
    planSummary: { type: String },
    status: {
      type: String,
      enum: ["pending", "contacted", "active", "cancelled"],
      default: "pending",
    },
    notes: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String },
  },
  { timestamps: true }
);

export type PlanOrderDocument = InferSchemaType<typeof PlanOrderSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const PlanOrder: Model<PlanOrderDocument> =
  mongoose.models.PlanOrder ??
  mongoose.model<PlanOrderDocument>("PlanOrder", PlanOrderSchema);

import mongoose, { Schema } from "mongoose";

const poetrySchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            default: "Untitled" // Individual shers might not have a title
        },
        type: {
            type: String,
            required: true,
            enum: ["ghazal", "nazm", "sher", "rubai"],
            default: "ghazal"
        },
        // Array of strings allows storing poetry line-by-line or couplet-by-couplet
        content: [
            {
                type: String,
                required: true
            }
        ],
        poet: {
            type: Schema.Types.ObjectId,
            ref: "Poet",
            required: true
        },
        tags: [
            {
                type: String, // e.g., ["love", "sad", "sufi", "philosophy"]
                trim: true
            }
        ],
        views: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

// CRITICAL STEP FOR REKHTA: Create a text index so users can search lyrics/words
poetrySchema.index({ content: "text", title: "text" });

export const Poetry = mongoose.model("Poetry", poetrySchema);

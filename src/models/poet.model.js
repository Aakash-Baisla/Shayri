import mongoose, { Schema } from "mongoose";

const poetSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true // Makes searching for poets faster
        },
        penName: {
            type: String, // e.g., "Ghalib", "Faiz"
            trim: true
        },
        bio: {
            type: String,
            required: true
        },
        avatar: {
            type: String, // Cloudinary URL for their image
            default: "https://placeholder.com"
        },
        birthPlace: {
            type: String,
            trim: true
        },
        era: {
            type: String, // e.g., "Classical", "Modern"
            trim: true
        }
    },
    { timestamps: true }
);

export const Poet = mongoose.model("Poet", poetSchema);

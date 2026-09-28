import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        // Array of poetry IDs that the user liked/bookmarked
        favorites: [
            {
                type: Schema.Types.ObjectId,
                ref: "Poetry"
            }
        ],
        refreshToken: {
            type: String
        }
    },
    { timestamps: true }
);

// Hitesh's standard password hashing hooks
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
};

// JWT Generation Methods (generateAccessToken / generateRefreshToken) go here...

export const User = mongoose.model("User", userSchema);

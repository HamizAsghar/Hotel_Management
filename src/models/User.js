import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            minlength: 11,
            maxlength: 11,
        },
        email: {
            type: String,
           required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: [String],
            default: [],
            required: true
        }

    },
    { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
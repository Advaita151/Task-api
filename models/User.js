import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    phone_number: { type: String, required: true },
    priority: { type: Number, enum: [0, 1, 2], default: 0 } 
})

export const User = mongoose.model('user',userSchema);  
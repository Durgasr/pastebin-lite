import mongoose from "mongoose";

const PasteSchema = new mongoose.Schema({
    content: {type: String, required:true},
    createdAt: {type:Number, default: Date.now()},
    expiresAt: Number,
    maxViews: Number,
    views:{type:Number}
})


export default mongoose.model("Paste", PasteSchema)
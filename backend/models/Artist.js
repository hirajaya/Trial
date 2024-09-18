import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
    },

    password:{
        type: String,
        minLength: 6,
        required: true,
    },

    addedEvents: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Event",
        },
    ],
});

export default mongoose.model("Artist", artistSchema);
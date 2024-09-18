import mongoose from "mongoose";
import { type } from "os";
import { title } from "process";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    
    posterUrl: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
    },
    bookings: [{type: mongoose.Types.ObjectId, ref: "Booking"}],
    artist:{
        type: mongoose.Types.ObjectId,
        ref: "Artist",
        required: true,
    },
});

export default mongoose.model("Event", eventSchema);
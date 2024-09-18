import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    event : {
        type: mongoose.Types.ObjectId,
        ref: "Event",
        required: true,
    },

    seatNumber: {
        type: Number,
        required: true,
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

export default mongoose.model("Booking", bookingSchema);
import Bookings from "../models/Bookings.js";
import Event from "../models/Event.js";
import User from "../models/User.js";
import mongoose from 'mongoose';

export const newBooking = async (req, res, next) =>{
    const {event, seatNumber, user} = req.body;

    let existingEvent;
    let existingUser;
    try{
        existingEvent = await Event.findById(event);
        existingUser = await User.findById(user);
    }catch(err) {
        return console.log(err);
    }

    if(!existingEvent){
        return res.status(404).json({message: "Event not found with Given ID"});
    }

    if(!existingUser){
        return res.status(404).json({message: "User not found with the given ID"});
    }


    let booking;
    try{
        booking = new Bookings({
            event,
            seatNumber,
            user,
        });

        const session = await mongoose.startSession();
        session .startTransaction();
        existingUser.bookings.push(booking);
        existingEvent.bookings.push(booking);
        await existingUser.save({ session });
        await existingEvent.save({ session });
        await booking.save({ session });
        session.commitTransaction();

    }catch(err){
        return console.log(err);
    }
    if(!booking){
        return res.status(201).json({message: "Unable to create a booking"});
    }

    return res.status (201).json({ booking });
};

export const getBookingById = async (req, res, next) =>{
    const id = req.params.id;
    let booking;
    try{
        booking = await Bookings.findById(id);
    }catch(err){
        return console.log(err);
    }

    if (!booking){
        return res.status(500).json({message: "unexpected error"});
    }
    return res.status(200).json({ booking })
};
import { decrypt } from 'dotenv';
import jwt from 'jsonwebtoken'
import { release } from 'os';
import Event from "../models/Event.js";
import mongoose from 'mongoose';
import { Admin } from 'mongodb';
import Artist from '../models/Artist.js';

export const addEvent = async(req, res, next) =>{
    const extractedToken =req.headers.authorization.split(" ")[1];

    if(!extractedToken && extractedToken.trim() === ""){
        return res.status(404).json({message: " Token not found"});
    }

    let artistId;

    //verify token
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err,decrypted)=>{
        if (err){
            return res.status(400).json({message: `${err.message}`});
        } else{
            artistId = decrypted.id;
            return;
        }
    });

    // create new events
    const {title, description, posterUrl, featured } = req.body;
    if(!title && title.trim()==="" 
    && !description && description.trim()==="" 
    && !posterUrl && posterUrl.trim()==="" ){
        return res.status(422).json ({message: "Invalid inputs "});
    }

    let event;
    try {
        event = new Event ({
            title,
            description,
            
            featured, 
            artist: artistId,
            posterUrl,
        });

    const session =await mongoose.startSession();
    const artistUser =await Artist.findById(artistId);
    session.startTransaction();
    await event.save({session});
    artistUser.addedEvents.push(event);
    await artistUser.save({session});
    await session.commitTransaction();

    } catch(err){
        return console.log(err);
    }

    if(!event){
        return res.status(500).json({message: "Request failed"});
    }

    return res.status(201).json({event});
};

export const getAllEvents = async (req, res, next)=> {
    let events;

    try{

        events = await Event.find();
    } catch (err){
        return console.log(err);
    }

    if (!events){
        return res.status(500).json({message: "Request failed"});
    }
    
    return res.status(200).json({events});
};

export const getEventById = async (req, res, next) => {
    const id = req.params.id;
    let event;

    try{
        event = await Event.findById(id);

    }catch(err){
        return console.log(err);
    }

    if(!event){
        return res.status(404).json({ message: "invalid Event ID"});
    }

    return res.status(200).json({event});
};
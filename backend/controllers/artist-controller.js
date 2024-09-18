import Artist from "../models/Artist.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const addArtist = async(req, res, next) => {
    const {email, password} = req.body;
    if( !email && 
        email.trim()==="" && 
        !password && 
        password.trim()==="")
        {
        return res.status(422).json({message:"Invalid inputs"});
        }
let existingArtist;
    try{
        existingArtist =await Artist.findOne({ email });
    } catch (err){
        return console.log(err);
    }

    if (existingArtist){
        res.status(400).json({ message: " Artist already exists"});
    }

    let artist;
    const hashedPassword = bcrypt.hashSync(password);
    try{
        artist = new Artist({email, password:hashedPassword});
        artist = await artist.save();
     } catch(err){
        return console.log(err);
    }
    if (!artist){
        return res.status(500).json({ message: "Unable to store artist"});
    }
    return res.status(201).json({artist});
};

export const artistLogin = async(req,res,next) =>{
    const {email, password} = req.body;
    if( !email && 
        email.trim()==="" && 
        !password && 
        password.trim()==="")
        {
        return res.status(422).json({message:"Invalid inputs"});
        }
        
        let existingArtist;
        try{
            existingArtist = await Artist.findOne({email});
        }catch(err){
            return console.log(err);
        }

        if(!existingArtist){
            return res.status(400).json({message:"Artist not found"});
        }
        
        const isPasswordCorrect = bcrypt.compareSync(password , existingArtist.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Incorrect password"});
        }

        const token = jwt.sign({id: existingArtist._id}, process.env.SECRET_KEY,{
            expiresIn: "7d"
        });

        return res.status(200).json({message:"Authentication complete", token, id: existingArtist._id });

};

export const getArtists = async (req, res, next) => {
    let artists;
    try{
        artists = await Artist.find();
    }catch(err){
        return console.log(err);
    }
    if (!artists){
        return res.status(500).json({message: "Internel server error"});
    }
    return res.status(200).json({artists});
};
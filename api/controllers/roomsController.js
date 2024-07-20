import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// CREATE ROOM
export const createRoom = async (req, res,next)=>{
    const hotelId  = req.params.hotelId;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save()
        try 
        {
            await Hotel.findByIdAndUpdate(hotelId,{
                $push:{rooms: savedRoom._id},
            });            
        } 
        catch (err) 
        {
            next(err)  
        }
        res.status(200).json(savedRoom)
    } 
    catch (err) {
        next(err)    
    }
}

// UPDATE ROOM
export const updateRoom = async (req, res,next)=>{
    try {
        const updatedRoom= await Room.findByIdAndUpdate(req.params.id,
             {$set: req.body},
            {new: true})
        console.log(req.body)
        res.status(200).json(updatedRoom)      
    } 
    catch (err) {
        next(err)
    }
}


//DELETE ROOM
export const deleteRoom = async (req, res,next)=>{
    try {
        await Room.findByIdAndDelete(req.params.id)
         console.log(req.body)
         res.status(200).json("Room Deleted")      
     } 
     catch (err) {
        next(err)
     }
}


// GET ROOM
export const getRoom = async (req, res,next)=>{
    try {
        const searchedRoom = await Room.findById(req.params.id)
         console.log(req.body)
         res.status(200).json(searchedRoom)      
     } 
     catch (err) {
        next(err)
     }
}

//GET ALL ROOM
export const getAllRoom = async (req, res,next)=>{

    try {
        const searchedRooms = await Room.find()
         console.log(req.body)
         res.status(200).json(searchedRooms)      
     } 
     catch (err) {
         next(err)
     }
}
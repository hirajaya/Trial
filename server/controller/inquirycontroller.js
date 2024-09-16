import Inquiry from "../model/inquirymodel.js";

export const create = async(req,res)=>{
    try{
        const inquiryData = new Inquiry(req.body);

        if(!inquiryData){
            return res.status(404).json({msg:"Inquiry Data not found"});
        }

        const savedDatga = await inquiryData.save();
        res.status(200).json(savedDatga);

    }catch (error){
        res.status(500).json({error:error});
}
}

export const getAll = async(req,res)=>{
    try{
        const inquiryData = await Inquiry.find();

        if(!inquiryData){
            return res.status(404).json({msg:"Inquiry Data not found"});
        }

        res.status(200).json(inquiryData);

    } catch(error){
        res.status(500).json({error: error});
    }
}

export const getOne = async (req,res)=>{
    try {
        const id = req.params.id;
        const inquiryExist = await Inquiry.findById(id);

        if (inquiryExist){
            return res.status(404).json({msg: "Inquiry not found"});
        }

        res.status(200).json(inquiryExist);
        
    } catch (error) {
        res.status(500).json({error:error});
    }
}

export const update = async(req,res)=>{
    try {
        const id = req.params.id;
        const inquiryExist = await Inquiry.findById(id);

        if (inquiryExist){
            return res.status(404).json({msg: "Inquiry not found"});
        }

        const updateData = await inquiryExist.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json(updateData);
        
    } catch (error) {
        res.status(500).json({error:error});
    }
}

export const deleteInquiry = async(req,res)=>{
    try {
        const id = req.params.id;
        const inquiryExist = await Inquiry.findById(id);

        if (inquiryExist){
            return res.status(404).json({msg: "Inquiry not found"});
        }

        await Inquiry.findByIdAndDelete(id);
        res.status(200).json({msg: "Inquiry Deleted Successfully"});
        
    } catch (error) {
        res.status(500).json({error:error});
    }
}
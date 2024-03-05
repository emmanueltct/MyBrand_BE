import { Request,Response } from "express";
import Clients from '../models/querries'


const createQuerries=async(req:Request,res:Response)=>{
    try {
      
       const client_info={
            names:req.body.names,
            email:req.body.email,
            location:req.body.location
        }

        const clientQuery=new Clients({
            client_info:client_info,
            client_budget:req.body.budget,
            client_subject:req.body.subject,
            client_message:req.body.message 
        })
        const query=await clientQuery.save();
        return res.status(200).json({message:"Querries is successfully created"})

    } catch (error) {
       return res.status(500).json({error:"internal server error"})
    }
}

const getQuerries=async(req:Request,res:Response)=>{
    const allqueries=await Clients.find();
    if(allqueries.length>0){
        return res.status(200).json({data:allqueries})
    }else{
       return res.status(404).json({error:"no client querries found in record"}) 
    }

}

const deleteQuerries=async(req:Request,res:Response)=>{
    try {
        const querry=await Clients.findOne({_id: req.params.id})
        if(querry){
            await Clients.deleteOne({ _id: req.params.id })
           return res.status(204).json({message:"Client Querry is deleted"})
        }else{
            return res.status(404).json({error:"Client Query is not exist"})
        }
        
    } catch {
        return res.status(404).json({ error: "Querry doesn't exist!" })
    }
}

export{createQuerries,getQuerries,deleteQuerries}
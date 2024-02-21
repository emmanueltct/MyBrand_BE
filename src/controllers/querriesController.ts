import { Request,Response } from "express";
import Clients from '../models/querries'


const createQuerries=async(req:Request,res:Response)=>{
    try {
        console.log(req.body.client.location)
        const clientQuery=new Clients({
            client_info:req.body.client,
            client_budget:req.body.budget,
            client_message:req.body.message 
        })
        const query=await clientQuery.save();
        res.status(200).json({message:"Querries is successfully created"})

    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

const getQuerries=async(req:Request,res:Response)=>{
    const allqueries=await Clients.find();
    if(allqueries){
        res.status(200).json({data:allqueries})
    }else{
        res.status(400).json({"message":"no client querries found in record"}) 
    }

}

const deleteQuerries=async(req:Request,res:Response)=>{
    try {
        await Clients.deleteOne({ _id: req.params.id })
        res.status(204).json({message:"Client Querry is deleted"})
       // res.status(204)
    } catch {
        res.status(400).json({ error: "Querry doesn't exist!" })
    }
}

export{createQuerries,getQuerries,deleteQuerries}
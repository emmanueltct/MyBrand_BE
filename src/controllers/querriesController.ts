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
        res.status(200)
        res.send(query)

    } catch (error) {
        res.status(500)
        res.send({error:"Validation failed "})
    }
}

const getQuerries=async(req:Request,res:Response)=>{
    const allqueries=await Clients.find();
    if(allqueries){
        res.status(200)
        res.send(allqueries)
    }else{
        res.status(404)
        res.send({"message":"no client querries found in record"}) 
    }

}

const deleteQuerries=async(req:Request,res:Response)=>{
    try {
        await Clients.deleteOne({ _id: req.params.id })
        res.send({"message":"Client Querry is deleted"})
       // res.status(204)
    } catch {
        res.status(404)
        res.send({ error: "Querry doesn't exist!" })
    }
}

export{createQuerries,getQuerries,deleteQuerries}
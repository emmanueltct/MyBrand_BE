import mongoose from "mongoose";

const querries=new mongoose.Schema({
    client_info:{
            names:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            location:{
                type:String,
                required:true
            }
        },
    client_budget:{
        type:String,
        required:true
    },
    client_message:{
        type:String,
        required:true
    }

})

export default mongoose.model('Clients',querries)
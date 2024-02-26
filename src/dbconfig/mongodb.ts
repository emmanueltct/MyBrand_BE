import mongoose from "mongoose"

 async function dbConnection(url:string) {
    
await mongoose.connect(url as string) 
        .then(() => {
            console.log('server connected well')
        })
        .catch((err:Error)=>{
            console.log('something went wrong')
        })
    
}

export default dbConnection;
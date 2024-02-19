import mongoose from "mongoose"
  import {NewBlog} from "../utils/blogType"  

    const schema = new mongoose.Schema<NewBlog>({
        title: String,
        image: String,
        blogIntro: String,
        content: String,
    },
        { timestamps: true })
    
    export default mongoose.model<NewBlog>("Blog", schema)

    //schema of comment and should be 

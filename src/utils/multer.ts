import multer, { Multer } from "multer"



let maxSize = 1024 * 1024;

 const storage=multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './blog_profile') //Destination folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+''+file.originalname) 
    },
    
  }) 
 


const filterFile=(req:any, file:Express.Multer.File, cb:any) => {
    
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    req.fileValidationError = "Only .png, .jpg and .jpeg format allowed!";
   return  cb(req.fileValidationError,false);

    ///return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
}

const upload = multer({storage:storage  ,fileFilter: filterFile ,limits: { fileSize: maxSize }});

const multerImage=upload
export default multerImage


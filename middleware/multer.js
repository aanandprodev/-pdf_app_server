const multer = require('multer');
const Path = require ('path');

const storage = multer.diskStorage({
    destination: function(req, file ,cb){
        cb (null,"./uploads");
    },
    filename : function(req , file,cb ){
        cb (null ,Date.now()+ "-"+ file.originalname);
    }
});


 const fileFilter = ( req,file ,callback )=> {

    const validExts = [".png",".jpg",".jpeg",".pdf"];

    if (! validExts.includes(Path.extname(file.originalname))){
        return callback (new Error ("Not in correct format"));
    }

    const fileSize = parseInt(req.headers["content-length"]);
    if (fileSize > 104857600){
        return callback (new Error ("File size is to Big"));
    } 

    callback(null,true);
 };

let upload = multer({
    storage : storage,
    fileFilter : fileFilter,
    fileSize: 104857600,
})


 module.exports = {upload}
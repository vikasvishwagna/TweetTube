//NB
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });





//Notes
/* Multer handles incoming file(from client) uploads by temporarily saving them in a local folder (./public/temp) so that the backend can access the actual file. After that, the  file isuploaded to Cloudinary using its SDK. Cloudinary stores the file in the cloud and returns a response containing details like the file URL, public_id,and format. We usually save this URL in the database and delete the local file  since it’s no longer needed.*/

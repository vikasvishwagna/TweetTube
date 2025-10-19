import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Configuration this line connects your Node.js app to your Cloudinary account using your API credentials (just like logging in).
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//after the congig, we upload the file,img,video to cloudinary

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    
    fs.unlinkSync(localFilePath);
    console.log("file has uploaded sucessfully", response);
    return response;

  } catch (error) {
     console.error("Cloudinary upload error:", error);
      fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export {uploadOnCloudinary}

import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import { ApiError } from "./ApiError.js";


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePaths) => {
    try {
        if (Array.isArray(localFilePaths)){
            const uploadedUrls = [];

        // Iterate over each local file path
        for (const localFilePath of localFilePaths) {
           try {
             const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            });
            uploadedUrls.push(response.url);

           } catch (error) {
            throw new ApiError(error.code, "all files are not uploaded")
           }
        }
        return uploadedUrls
        };

        if (!localFilePaths) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePaths, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePaths) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
    
}



export {uploadOnCloudinary}
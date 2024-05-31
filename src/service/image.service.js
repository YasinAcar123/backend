import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';



const uploadProductImage = async (files) => {
    console.log('hello')
    const result = await cloudinary.uploader.upload(
      files.image.tempFilePath,
      {
        use_filename: true,
        folder: 'file-upload',
      }
    );
    fs.unlinkSync(files.image.tempFilePath);
    console.log(result)
    return result.secure_url 
  };

  export default uploadProductImage ;

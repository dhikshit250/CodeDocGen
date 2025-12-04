import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  url: string;
  publicId: string;
  format: string;
  size: number;
  width?: number;
  height?: number;
}

export async function uploadImage(
  file: Buffer | string,
  options?: {
    folder?: string;
    transformation?: any;
    resourceType?: 'image' | 'raw' | 'video';
  }
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: options?.folder || process.env.CLOUDINARY_FOLDER || 'code-doc-gen',
      resource_type: options?.resourceType || 'image',
      transformation: options?.transformation || [],
    };

    cloudinary.uploader.upload(
      file as string,
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result?.secure_url || '',
            publicId: result?.public_id || '',
            format: result?.format || '',
            size: result?.bytes || 0,
            width: result?.width,
            height: result?.height,
          });
        }
      }
    );
  });
}

export async function uploadFile(
  file: Buffer | string,
  filename: string,
  options?: {
    folder?: string;
    resourceType?: 'image' | 'raw' | 'video';
  }
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: options?.folder || process.env.CLOUDINARY_FOLDER || 'code-doc-gen/files',
      resource_type: options?.resourceType || 'raw',
      public_id: filename,
    };

    cloudinary.uploader.upload(
      file as string,
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result?.secure_url || '',
            publicId: result?.public_id || '',
            format: result?.format || '',
            size: result?.bytes || 0,
            width: result?.width,
            height: result?.height,
          });
        }
      }
    );
  });
}

export async function deleteFile(publicId: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      (error, result) => {
        if (error) {
          reject(error);
          resolve(false);
        } else {
          resolve(result?.result === 'ok');
        }
      }
    );
  });
}

export async function getFileInfo(publicId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    cloudinary.api.resource(
      publicId,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}

export default cloudinary;

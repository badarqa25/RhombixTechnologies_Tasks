const { S3Client, PutObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const fs = require("fs");
require("dotenv").config();

const s3 = new S3Client({ region: process.env.AWS_REGION });

async function uploadImage(file) {
  try {
    console.log("Uploading file:", file.originalname);
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: file.originalname,
      Body: fileStream,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));
    console.log("Upload complete");
  } catch (err) {
    console.error("Error uploading to S3:", err);
    throw err;
  }
}

async function listImages() {
  try {
    console.log("Listing images from bucket:", process.env.S3_BUCKET_NAME);
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME,
    });
    const data = await s3.send(command);

    const urls = (data.Contents || []).map((item) =>
      `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${item.Key}`
    );

    console.log("Images found:", urls.length);
    return urls;
  } catch (err) {
    console.error("Error listing S3 objects:", err);
    throw err;
  }
}

module.exports = { uploadImage, listImages };

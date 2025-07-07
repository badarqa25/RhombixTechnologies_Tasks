const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const { 
  S3Client, 
  PutObjectCommand, 
  ListObjectsV2Command, 
  DeleteObjectCommand 
} = require("@aws-sdk/client-s3");

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors());
app.use(express.json());

// Load env
console.log("Loaded ENV:", {
  region: process.env.AWS_REGION,
  accessKey: process.env.AWS_ACCESS_KEY_ID,
  bucket: process.env.S3_BUCKET_NAME,
});

// AWS S3 setup
const s3 = new S3Client({ region: process.env.AWS_REGION });

// Upload image to S3
async function uploadImage(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${Date.now()}-${file.originalname}`,
    Body: fileStream,
    ContentType: file.mimetype,
  };
  await s3.send(new PutObjectCommand(uploadParams));
}

// List all images in S3
async function listImages() {
  const command = new ListObjectsV2Command({ Bucket: process.env.S3_BUCKET_NAME });
  const data = await s3.send(command);
  return (data.Contents || []).map(item =>
    `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${item.Key}`
  );
}

// Delete an image from S3
async function deleteImage(key) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key
  });
  await s3.send(command);
}

// Routes
app.get("/", (req, res) => {
  res.send("Photo Gallery API is running");
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    console.log("Uploading:", req.file.originalname);
    await uploadImage(req.file);
    res.json({ message: "Image uploaded!" });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.get("/images", async (req, res) => {
  try {
    const urls = await listImages();
    res.json(urls);
  } catch (err) {
    console.error("List error:", err);
    res.status(500).json({ error: "Failed to list images" });
  }
});

app.delete("/image/:key", async (req, res) => {
  try {
    const key = decodeURIComponent(req.params.key);
    await deleteImage(key);
    console.log("Deleted:", key);
    res.json({ message: "Image deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});


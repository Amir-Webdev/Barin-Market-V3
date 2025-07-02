import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { newError } from "../utils/errorHandler.js";

dotenv.config({ path: "./config/.env" });

const endpoint = process.env.ARVAN_ENDPOINT;
const accessKey = process.env.ARVAN_ACCESS_KEY;
const secretKey = process.env.ARVAN_SECRET_KEY;
const bucketName = process.env.ARVAN_BUCKET_NAME;

const s3 = new S3Client({
  region: "ir-thr-at1",
  endpoint: endpoint,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  forcePathStyle: true,
});

async function uploadToArvan(fileBuffer, folder) {
  const key = `Products/${folder}/${uuidv4()}-${Date.now()}.webp`;

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ContentType: "image/webp",
    ACL: "public-read",
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);

    const fileUrl = `https://${bucketName}.s3.ir-thr-at1.arvanstorage.ir/${key}`;

    return fileUrl;
  } catch (error) {
    return newError(500, "خطا در آپلود فایل به دیتابیس");
  }
}

async function deleteFromArvan(url) {
  const irIndex = url.indexOf(".ir/");

  if (irIndex !== -1) {
    const key = url.substring(irIndex + 4);
  } else {
    return null;
  }

  const params = {
    Bucket: process.env.ARVAN_BUCKET_NAME,
    Key: key,
  };

  try {
    await s3.send(new DeleteObjectCommand(params));
  } catch (error) {
    return newError(500, "خطا در حذف عکس از دیتابیس");
  }
}

export { uploadToArvan, deleteFromArvan };

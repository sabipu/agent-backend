import { S3Client } from "@aws-sdk/client-s3"

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
  },
  endpoint: process.env.STORAGE_ENDPOINT as string
})

async function uploadMedia(data: any): Promise<any> {
  
  console.log('data', data.body)
  console.log('data', data.file)
}

export default {
  uploadMedia
}

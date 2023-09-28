import { NextFunction, Request, Response } from 'express'
import mediaService from './media.service'
import AWS from 'aws-sdk'

console.log('tst', process.env.STORAGE_ENDPOINT)
console.log('tst', process.env.ACCESS_KEY_ID)
console.log('tst', process.env.SECRET_ACCESS_KEY)

export async function uploadMedia(request: any, response: Response, next: NextFunction) {
  try {
    const endpoint = new AWS.Endpoint(process.env.STORAGE_ENDPOINT as string);
    console.log('endpoint', endpoint)
    const s3 = new AWS.S3({
      endpoint: endpoint,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID as string,
        secretAccessKey: process.env.SECRET_ACCESS_KEY as string
      }
    });

    // create bucket 'my-bucket' params
    var params = {
      Bucket: "test",
    };
    
    // list object call
    s3.listObjects(params, function(err, data) {
      if (err) {
        console.log("Error:", err);
      } else {
        console.log("Success:", data);
      }
    });

    return response.json(true)
  } catch (error) {
    console.log('tst', error)
    next(error)
  }
}
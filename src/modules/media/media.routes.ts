import { Router } from 'express'
import { verifyAccessToken } from '../../middleware/auth/verifyAccessToken'
import { validateDto } from '../../middleware/validateDto'
import { uploadMedia } from './media.controller'
import { uploadMediaDto } from './media.dto'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3"

let upload: any

const router = Router()

router.post('/upload', uploadMedia)
export default router
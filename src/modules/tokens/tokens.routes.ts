import { Router } from 'express'
import { verifyAccessToken } from '../../middleware/auth/verifyAccessToken'
import { validateDto } from '../../middleware/validateDto'
import { validateOTPToken, validateResetPasswordOTPToken } from './tokens.controller'
import { validateOTPTokenDto } from './tokens.dto'

const router = Router()

router.post('/tokens/validate/:tokenId', validateDto(validateOTPTokenDto), verifyAccessToken(['GUEST']), validateOTPToken)
router.post('/tokens/password/:tokenId', validateDto(validateOTPTokenDto), verifyAccessToken(['GUEST']), validateResetPasswordOTPToken)

export default router
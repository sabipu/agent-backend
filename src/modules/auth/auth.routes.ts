import { Router } from 'express'
import platformRoute from './platform/platform.route'
import googleRoute from './google/google.route'
// import facebookRoute from './facebook/facebook.route'
import { appConfig } from '@/appConfig'

const route = Router()

platformRoute(route)

if (appConfig.authProviders?.includes('google')) {
  googleRoute(route)
}

// if (appConfig.authProviders?.includes('facebook')) {
//   facebookRoute(route)
// }

export default route
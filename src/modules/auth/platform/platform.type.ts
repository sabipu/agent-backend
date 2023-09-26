export type PlatformPayload = {
  firstName?: string
  lastName?: string
  picture?: string
  email: string
  password: string
}

export type PlatformLoginPayload = {
  email: string
  password: string
}
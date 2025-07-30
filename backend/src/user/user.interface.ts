export interface IUserData {
  bio: string
  email: string
  image?: string
  token: string
  username: string
}

export interface IUserRO {
  user: IUserData
}

export interface JWTObject {
  email: string
  username: string
  id: number
  iat: number
  exp: number
}

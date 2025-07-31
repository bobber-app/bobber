import { User } from '../user/user.entity'

export interface AuthenticatedRequest extends Request {
  user: User
  logout: () => void
}

export interface JwtPayload {
  sub: number
  username: string
  email: string
  iat: number
  exp: number
}

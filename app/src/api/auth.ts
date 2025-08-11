import { myAxios } from '@/instances/myAxios'
import { LoginPayload, RegisterPayload } from '@/types'

export const loginUser = (credentials: LoginPayload) => myAxios.post('auth/login', credentials)
export const registerUser = (credentials: RegisterPayload) =>
  myAxios.post('auth/register', credentials)

export const logoutUser = () => myAxios.post('auth/logout')

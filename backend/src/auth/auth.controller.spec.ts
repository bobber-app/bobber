import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'
import { User } from '@/user/user.entity'
import { CreateUserDto } from '@/user/dto/create-user.dto'

describe('AuthController', () => {
  let controller: AuthController

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile()

    controller = module.get<AuthController>(AuthController)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('login', () => {
    it('should return the result of authService.login', () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      } as User

      const mockRequest = {
        user: mockUser,
      }

      const mockLoginResult = {
        access_token: 'test-jwt-token',
      }

      mockAuthService.login.mockReturnValue(mockLoginResult)

      const result = controller.login(mockRequest as any)

      // Use mockAuthService instead of authService to avoid unbound method warning
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUser)
      expect(result).toEqual(mockLoginResult)
    })
  })

  describe('logout', () => {
    it('should call req.logout', () => {
      const mockLogout = jest.fn()
      const mockRequest = {
        user: {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
        } as User,
        logout: mockLogout,
      }

      controller.logout(mockRequest as any)

      expect(mockLogout).toHaveBeenCalled()
    })
  })

  describe('register', () => {
    it('should return the result of authService.register', async () => {
      const createUserDto: CreateUserDto = {
        username: 'newuser',
        password: 'password123',
        email: 'new@example.com',
      }

      const mockRegisterResult = {
        access_token: 'test-jwt-token',
        user: {
          id: 1,
          username: 'newuser',
          email: 'new@example.com',
        },
      }

      mockAuthService.register.mockResolvedValue(mockRegisterResult)

      const result = await controller.register(createUserDto)

      // Use mockAuthService instead of authService to avoid unbound method warning
      expect(mockAuthService.register).toHaveBeenCalledWith(createUserDto)
      expect(result).toEqual(mockRegisterResult)
    })
  })

  describe('getProfile', () => {
    it('should return the user from the request', () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      } as User

      const mockRequest = {
        user: mockUser,
      }

      const result = controller.getProfile(mockRequest as any)

      expect(result).toEqual(mockUser)
    })
  })
})

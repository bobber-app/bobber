import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../user/user.entity'
import { CreateUserDto } from '../user/dto/create-user.dto'

describe('AuthService', () => {
  let authService: AuthService

  const mockUserService = {
    findOneByUsername: jest.fn(),
    create: jest.fn(),
  }

  const mockJwtService = {
    sign: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('validateUser', () => {
    it('should return user object when credentials are valid', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        password: 'password123',
        email: 'test@example.com',
      } as User

      mockUserService.findOneByUsername.mockResolvedValue(mockUser)

      const result = await authService.validateUser('testuser', 'password123')

      expect(mockUserService.findOneByUsername).toHaveBeenCalledWith('testuser')
      expect(result).toEqual(mockUser)
    })

    it('should return null when user is not found', async () => {
      mockUserService.findOneByUsername.mockResolvedValue(null)

      const result = await authService.validateUser('nonexistent', 'password123')

      expect(mockUserService.findOneByUsername).toHaveBeenCalledWith('nonexistent')
      expect(result).toBeNull()
    })

    it('should return null when password is invalid', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        password: 'password123',
        email: 'test@example.com',
      } as User

      mockUserService.findOneByUsername.mockResolvedValue(mockUser)

      const result = await authService.validateUser('testuser', 'wrongpassword')

      expect(mockUserService.findOneByUsername).toHaveBeenCalledWith('testuser')
      expect(result).toBeNull()
    })
  })

  describe('login', () => {
    it('should return access token when login is successful', () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        password: 'password123',
        email: 'test@example.com',
      } as User

      mockJwtService.sign.mockReturnValue('test-jwt-token')

      const result = authService.login(mockUser)

      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: mockUser.username,
        sub: mockUser.id,
      })
      expect(result).toEqual({ access_token: 'test-jwt-token' })
    })
  })

  describe('register', () => {
    it('should register a new user and return access token and user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'newuser',
        password: 'password123',
        email: 'new@example.com',
      }

      const mockUser = {
        id: 1,
        username: 'newuser',
        email: 'new@example.com',
        toJSON: jest.fn().mockReturnValue({
          id: 1,
          username: 'newuser',
          email: 'new@example.com',
        }),
      } as unknown as User

      mockUserService.create.mockResolvedValue(mockUser)
      mockJwtService.sign.mockReturnValue('test-jwt-token')

      const result = await authService.register(createUserDto)

      expect(mockUserService.create).toHaveBeenCalledWith(createUserDto)
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: mockUser.username,
        sub: mockUser.id,
      })
      expect(result).toEqual({
        access_token: 'test-jwt-token',
        user: mockUser,
      })
    })
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { getRepositoryToken } from '@mikro-orm/nestjs'
import { User } from './user.entity'
import { EntityRepository } from '@mikro-orm/core'
import { ConflictException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

// Mock the User class to avoid crypto issues in tests
jest.mock('./user.entity', () => {
  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashed_password',
    toJSON: jest.fn().mockReturnValue({
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
    }),
    hashPassword: jest.fn().mockResolvedValue(undefined),
    verifyPassword: jest.fn().mockResolvedValue(true),
  }

  return {
    User: jest.fn().mockImplementation((dto: CreateUserDto) => ({
      ...mockUser,
      username: dto.username,
      email: dto.email,
      toJSON: jest.fn().mockReturnValue({
        id: 1,
        username: dto.username,
        email: dto.email,
      }),
    })),
  }
})

// Mock the static create method
const mockUserCreate = jest.fn()
const MockUser = User as jest.MockedClass<typeof User>
MockUser.create = mockUserCreate

describe('UserService', () => {
  let service: UserService
  let mockRepository: Partial<EntityRepository<User>>

  beforeEach(async () => {
    mockRepository = {
      findOne: jest.fn(),
      findAll: jest.fn(),
      insert: jest.fn(),
      nativeUpdate: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'password123',
        email: 'test@example.com',
      }

      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        toJSON: jest.fn().mockReturnValue({
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
        }),
      } as unknown as User

      mockRepository.findOne = jest.fn().mockResolvedValue(null)
      mockUserCreate.mockResolvedValue(mockUser)
      mockRepository.insert = jest.fn().mockResolvedValue(undefined)

      const result = await service.create(createUserDto)

      expect(mockRepository.findOne).toHaveBeenCalledWith({ username: createUserDto.username })
      expect(mockUserCreate).toHaveBeenCalledWith(createUserDto)
      expect(mockRepository.insert).toHaveBeenCalledWith(mockUser)
      expect(result).toEqual({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      })
    })

    it('should throw ConflictException if user already exists', async () => {
      const createUserDto: CreateUserDto = {
        username: 'existinguser',
        password: 'password123',
        email: 'existing@example.com',
      }

      const existingUser = {
        id: 1,
        username: 'existinguser',
        email: 'existing@example.com',
      } as User

      mockRepository.findOne = jest.fn().mockResolvedValue(existingUser)

      await expect(service.create(createUserDto)).rejects.toThrow(ConflictException)
      expect(mockRepository.findOne).toHaveBeenCalledWith({ username: createUserDto.username })
      expect(mockUserCreate).not.toHaveBeenCalled()
      expect(mockRepository.insert).not.toHaveBeenCalled()
    })
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        { id: 1, username: 'user1', email: 'user1@example.com' },
        { id: 2, username: 'user2', email: 'user2@example.com' },
      ] as User[]

      mockRepository.findAll = jest.fn().mockResolvedValue(mockUsers)

      const result = await service.findAll()

      expect(mockRepository.findAll).toHaveBeenCalled()
      expect(result).toEqual(mockUsers)
    })
  })

  describe('findOneById', () => {
    it('should return a user when found by id', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' } as User

      mockRepository.findOne = jest.fn().mockResolvedValue(mockUser)

      const result = await service.findOneById(1)

      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: 1 })
      expect(result).toEqual(mockUser)
    })

    it('should return null when user not found by id', async () => {
      mockRepository.findOne = jest.fn().mockResolvedValue(null)

      const result = await service.findOneById(999)

      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: 999 })
      expect(result).toBeNull()
    })
  })

  describe('findOneByUsername', () => {
    it('should return a user when found by username', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' } as User

      mockRepository.findOne = jest.fn().mockResolvedValue(mockUser)

      const result = await service.findOneByUsername('testuser')

      expect(mockRepository.findOne).toHaveBeenCalledWith({ username: 'testuser' })
      expect(result).toEqual(mockUser)
    })

    it('should return null when user not found by username', async () => {
      mockRepository.findOne = jest.fn().mockResolvedValue(null)

      const result = await service.findOneByUsername('nonexistent')

      expect(mockRepository.findOne).toHaveBeenCalledWith({ username: 'nonexistent' })
      expect(result).toBeNull()
    })
  })

  describe('update', () => {
    it('should update a user successfully', async () => {
      const updateUserDto: UpdateUserDto = {
        email: 'updated@example.com',
      }

      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashed_password',
        toJSON: jest.fn().mockReturnValue({
          id: 1,
          username: 'testuser',
          email: 'updated@example.com',
        }),
      } as unknown as User

      mockRepository.findOne = jest.fn().mockResolvedValue(mockUser)
      mockRepository.nativeUpdate = jest.fn().mockResolvedValue(undefined)

      const result = await service.update(1, updateUserDto)

      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: 1 })
      expect(mockRepository.nativeUpdate).toHaveBeenCalledWith({ id: 1 }, mockUser)
      expect(result).toEqual({
        id: 1,
        username: 'testuser',
        email: 'updated@example.com',
      })
    })

    it('should return null when user not found', async () => {
      const updateUserDto: UpdateUserDto = {
        email: 'updated@example.com',
      }

      mockRepository.findOne = jest.fn().mockResolvedValue(null)

      const result = await service.update(999, updateUserDto)

      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: 999 })
      expect(mockRepository.nativeUpdate).not.toHaveBeenCalled()
      expect(result).toBeNull()
    })

    it('should throw ConflictException when updating to existing username', async () => {
      const updateUserDto: UpdateUserDto = {
        username: 'existinguser',
      }

      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      } as User

      const existingUser = {
        id: 2,
        username: 'existinguser',
        email: 'existing@example.com',
      } as User

      mockRepository.findOne = jest
        .fn()
        .mockResolvedValueOnce(mockUser) // First call for findOneById
        .mockResolvedValueOnce(existingUser) // Second call for findOneByUsername

      await expect(service.update(1, updateUserDto)).rejects.toThrow(ConflictException)
      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: 1 })
      expect(mockRepository.findOne).toHaveBeenCalledWith({ username: 'existinguser' })
      expect(mockRepository.nativeUpdate).not.toHaveBeenCalled()
    })

    it('should update username when no conflict exists', async () => {
      const updateUserDto: UpdateUserDto = {
        username: 'newusername',
      }

      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        toJSON: jest.fn().mockReturnValue({
          id: 1,
          username: 'newusername',
          email: 'test@example.com',
        }),
      } as unknown as User

      mockRepository.findOne = jest
        .fn()
        .mockResolvedValueOnce(mockUser) // First call for findOneById
        .mockResolvedValueOnce(null) // Second call for findOneByUsername
      mockRepository.nativeUpdate = jest.fn().mockResolvedValue(undefined)

      const result = await service.update(1, updateUserDto)

      expect(mockRepository.findOne).toHaveBeenCalledWith({ id: 1 })
      expect(mockRepository.findOne).toHaveBeenCalledWith({ username: 'newusername' })
      expect(mockRepository.nativeUpdate).toHaveBeenCalledWith({ id: 1 }, mockUser)
      expect(result).toEqual({
        id: 1,
        username: 'newusername',
        email: 'test@example.com',
      })
    })
  })

  describe('remove', () => {
    it('should return a string with the user id', () => {
      const result = service.remove(1)

      expect(result).toBe('This action removes a #1 user')
    })
  })
})

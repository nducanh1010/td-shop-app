import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hash = this.getHashPassword(password);
    const user = new User({ ...createUserDto, password: hash });
    await this.userRepository.save(user);
  }
  getHashPassword(password: string) {
    const salt = genSaltSync(10);
    const hash: string = hashSync(password, salt);
    return hash;
  }

  IsValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestException('User not Found');
    delete user.password;
    delete user.refreshToken;
    return user;
  }
  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: [{ username }, { email: username }],
    });
    if (!user) throw new BadRequestException('User not Found');
    return user;
  }
  async findUserByRefreshToken(refresh_token) {
    const user = await this.userRepository.findOne({
      where: { refreshToken: refresh_token },
    });
    if (!user) throw new BadRequestException('User not Found');
    return user;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) throw new BadRequestException('User not Found');
    const { email, name, password, username } = updateUserDto;
    foundUser.email = email;
    foundUser.name = name;
    foundUser.password = password;
    foundUser.username = username;
    return await this.userRepository.save(foundUser);
  }
  async updateUserToken(refreshToken: string, id: number) {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) throw new BadRequestException('User not Found');
    foundUser.refreshToken = refreshToken;
    return await this.userRepository.save(foundUser);
  }
  async remove(id: number) {
    // throw new BadRequestException('User not Found');
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) throw new BadRequestException('Không tìm thấy người dùng');
    return this.userRepository.delete(id);
  }
}

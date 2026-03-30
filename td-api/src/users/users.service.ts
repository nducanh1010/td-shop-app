import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginateAndSort } from '../decorator/paginate.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto, UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
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
    return this.userRepository.createQueryBuilder('user').getMany();
  }
  @PaginateAndSort()
  async getList(query: QueryUserDto): Promise<User[]> {
    const { name, email, username, role } = query;
    const qb = this.userRepository.createQueryBuilder('user');
    // Only append LIKE query if the parameter was actually provided!
    if (name) qb.andWhere('user.name LIKE :name', { name: `%${name}%` });
    if (email) qb.andWhere('user.email LIKE :email', { email: `%${email}%` });
    if (username)
      qb.andWhere('user.username LIKE :username', {
        username: `%${username}%`,
      });
    if (role) qb.andWhere('user.role LIKE :role', { role: `%${role}%` });

    // The decorator @PaginateAndSort will automatically apply limit, offset, orderBy and execute getMany()
    return qb as any;
  }
  async findOne(id: number, userR) {
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
  async update(updateUserDto: UpdateUserDto, user: User) {
    const { id } = user;
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

import { Role } from 'src/roles/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  username: string;
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
  @Column()
  password: string;
  @Column({ default: true })
  isDeleted: boolean;
  @Column({ nullable: true, length: 900 })
  refreshToken: string;
  @Column({ nullable: true })
  deletedAt: Date;
  @CreateDateColumn()
  // @OneToMany(()=>)
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}

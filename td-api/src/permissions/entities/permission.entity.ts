import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  apiPath: string;

  @Column()
  method: string;

  @Column()
  module: string; // Thuộc module nào
  @ManyToOne(() => Role, (role) => role.permissions, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  createdBy?: User;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  updatedBy?: User;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  deletedBy?: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}

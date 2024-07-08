import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone_number: string;

  @Column()
  last_name: string;

  @Column()
  first_name: string;

  @Column()
  nick_name: string;

  @Column()
  description: string;

  @Column()
  position: string;

  @Column({ default: 'user' }) // Добавляем поле для роли, по умолчанию 'user'
  role: string;
}

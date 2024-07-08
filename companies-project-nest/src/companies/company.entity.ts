import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  fieldOfActivity: string; // Service of activity

  @Column()
  numberOfEmployees: number;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  ownerId: string; // user ID
}

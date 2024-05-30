import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @Column()
  userId: number;
}

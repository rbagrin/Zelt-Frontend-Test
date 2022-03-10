import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  password: string;
}

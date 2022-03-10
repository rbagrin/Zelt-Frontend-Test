import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class Hero extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  shortDescription: string;

  @Column
  description: string;

  @Column
  power: string;
}

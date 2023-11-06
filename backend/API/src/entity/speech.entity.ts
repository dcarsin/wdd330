import { Column, Table, Model, DataType } from 'sequelize-typescript';
import { Member } from '../model/Member';
import { Speech } from '../model/Speech';
import { IsOptional } from "class-validator";

@Table({
  tableName: 'speeches',
  timestamps: false,
})
export default class SpeechEntity extends Model<Speech> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    autoIncrementIdentity: true,
    field: 'id',
  })
  @IsOptional()
  speechId: number;

  @Column({
    type: DataType.INTEGER,
    field: 'member_id',
  })
  speechMemberId: number;

  @Column({
    type: DataType.INTEGER,
    field: 'duration',
  })
  speechDuration: number;

  @Column({
    type: DataType.STRING,
    field: 'topic',
  })
  speechTopic: string;

  @Column({
    type: DataType.DATE,
    field: 'dissert_date',
  })
  speechDate: string;

  @Column({
    type: DataType.DATE,
    field: 'regdate',
  })
  speechRegDate: string;
}

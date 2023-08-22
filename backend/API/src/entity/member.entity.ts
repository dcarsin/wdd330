import { Column, Table, Model, DataType } from 'sequelize-typescript';
import { Member } from '../model/Member';

@Table({
  tableName: 'members',
  timestamps: false,
})
export default class MemberEntity extends Model<Member> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    autoIncrementIdentity: true,
    field: 'id',
  })
  memberId: number;

  @Column({
    type: DataType.STRING,
    field: 'name',
  })
  memberName: string;

  @Column({
    type: DataType.STRING,
    field: 'lastname',
  })
  memberLastName: string;

  @Column({
    type: DataType.STRING,
    field: 'gender',
  })
  memberGender: string;

  @Column({
    type: DataType.DATE,
    field: 'dob',
  })
  memberDateOfBirth: string;

  @Column({
    type: DataType.STRING,
    field: 'phone',
  })
  memberPhone: string;

  @Column({
    type: DataType.STRING,
    field: 'email',
  })
  memberEmail: number;

  @Column({
    type: DataType.BOOLEAN,
    field: 'status',
  })
  memberStatus: boolean;
}

import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  MaxLength,
  IsBoolean,
} from 'class-validator';

export class Member {
  memberId: number;

  @MaxLength(30, {
    message: 'Member name is too long',
  })
  @IsString()
  memberName: string;

  @MaxLength(30, {
    message: 'Member lastname is too long',
  })
  @IsString()
  memberLastName: string;

  @IsString()
  memberGender: string;

  @IsString()
  memberDateOfBirth: string;

  @IsString()
  memberPhone: string;

  @IsOptional()
  @IsString()
  memberEmail: string;

  @IsBoolean()
  memberStatus: boolean;

  @IsString()
  memberRegDate: string;
}

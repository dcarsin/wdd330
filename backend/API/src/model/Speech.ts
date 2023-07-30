import {
  IsString,
  IsOptional,
  MaxLength,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class Speech {
  speechId: number;

  @IsNumber()
  speechMemberId: number;

  @IsNumber()
  speechDuration: number;

  @IsString()
  speechTopic: string;

  @IsString()
  speechDate: string;

  @IsOptional()
  @IsString()
  speechRegDate: string;
}

import {
  IsDateString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class HistoricalPricingQueryDto {
  @IsOptional()
  @IsNumberString()
  domain: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  searchTerm: string;

  @IsOptional()
  @IsNumberString()
  page: string;
}

import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export enum SORT_ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  readonly take = 20;

  @IsOptional()
  @IsEnum(SORT_ORDER)
  @IsString()
  readonly sortDir = SORT_ORDER.DESC;

  @IsOptional()
  @IsString()
  readonly sortBy = 'createdAt';

  @IsOptional()
  @IsString()
  readonly searchTerm?: string;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}

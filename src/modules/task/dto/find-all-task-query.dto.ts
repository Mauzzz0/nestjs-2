import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { PaginationDto, SortDirection } from '../../../common';

enum TaskSortBy {
  id = 'id',
  title = 'title',
}

export class FindAllTaskQueryDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsString()
  @MinLength(1)
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ default: TaskSortBy.id, enum: TaskSortBy })
  @IsEnum(TaskSortBy)
  sortBy: TaskSortBy = TaskSortBy.id;

  @ApiPropertyOptional({ default: SortDirection.desc, enum: SortDirection })
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.desc;
}

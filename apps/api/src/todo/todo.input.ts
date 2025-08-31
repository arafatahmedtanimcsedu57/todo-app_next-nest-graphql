import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsString()
  @MinLength(1)
  title: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  priorityId?: number | null;
}

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  @IsInt()
  @IsString()
  @Min(1)
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  priorityId?: number | null;
}

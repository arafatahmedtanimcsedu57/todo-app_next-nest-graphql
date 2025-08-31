import { Field, Int, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

@InputType()
export class CreatePriorityInput {
  @Field()
  @IsString()
  @MinLength(1)
  title: string;

  @Field()
  @IsString()
  @MinLength(1)
  color: string;
}

@InputType()
export class UpdatePriorityInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  color?: string;
}

import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Priority {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  color: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

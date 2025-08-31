import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Priority } from '../priority/priority.model';

@ObjectType()
export class Todo {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  completed: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int, { nullable: true })
  priorityId?: number | null;

  @Field(() => Priority, { nullable: true })
  priority?: Priority | null;
}

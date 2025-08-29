import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './todo.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private service: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  todos() {
    return this.service.list();
  }

  @Mutation(() => Todo)
  createTodo(@Args('input') input: CreateTodoInput) {
    return this.service.create(input.title);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('input') input: UpdateTodoInput) {
    const { id, ...rest } = input;
    return this.service.update(id, rest);
  }

  @Mutation(() => Todo)
  async toggleTodo(@Args('id', { type: () => Int }) id: number) {
    const t = await this.service.update(id, {}); // or this.service.get(id)
    return this.service.update(id, { completed: !t.completed });
  }

  @Mutation(() => Todo)
  deleteTodo(@Args('id', { type: () => Int }) id: number) {
    return this.service.delete(id);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PriorityService } from './priority.service';
import { Priority } from './priority.model';
import { CreatePriorityInput, UpdatePriorityInput } from './priority.input';

@Resolver(() => Priority)
export class PriorityResolver {
  constructor(private service: PriorityService) {}
  @Query(() => [Priority], { name: 'priorities' })
  priorities() {
    return this.service.list();
  }
  @Mutation(() => Priority)
  createPriority(@Args('input') input: CreatePriorityInput) {
    return this.service.create(input);
  }
  @Mutation(() => Priority)
  updatePriority(@Args('input') input: UpdatePriorityInput) {
    const { id, ...rest } = input;
    return this.service.update(id, rest);
  }
  @Mutation(() => Priority)
  deletePriority(@Args('id', { type: () => Int }) id: number) {
    return this.service.delete(id);
  }
}

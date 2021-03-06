import { ConditionsService } from './condition.service'
import { Condition } from '../../../shared/graphql/condition.model'
import { Args, Int, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => Condition)
export class ConditionsResolver {
  constructor(private conditionsService: ConditionsService) {}

  @Query(() => [Condition])
  async conditions() {
    return this.conditionsService.list()
  }
  @Query(() => Condition)
  async condition(@Args('id') id: string) {
    return this.conditionsService.findOneById(id)
  }
}

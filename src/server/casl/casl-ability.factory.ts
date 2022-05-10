import { Injectable } from '@nestjs/common'
import { Action } from './enum/ability'
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability'
import { User } from '../users/model/user'

type Subjects = InferSubjects<typeof User> | 'all'

export type AppAbility = Ability<[Action, Subjects]>

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    )

    if (user.isAdmin) {
      can(Action.Manage, 'all') // read-write access to everything
    } else {
      can(Action.Read, 'all') // read-only access to everything
    }
    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    })
  }
}
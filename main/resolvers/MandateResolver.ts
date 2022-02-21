import 'reflect-metadata'
import {
  InputType,
  Field,
  Resolver,
  FieldResolver,
  Root,
  Ctx,
  Query,
  Arg,
  Args,
} from 'type-graphql'
import { Context } from '../context'
import { Mandate } from '../models/Mandate'
import { Person } from '../models/Person'
import { GetPersonsArgs, PersonCreateInput } from './PersonResolver'

@InputType()
export class MandateCreateInput {
  @Field()
  amount: number

  @Field()
  signedAt: Date

  @Field(() => [PersonCreateInput], { nullable: true })
  persons: [PersonCreateInput]
}

@Resolver(Mandate)
export class MandateResolver {
  @FieldResolver()
  accountHolder(
    @Root() mandate: Mandate,
    @Ctx() ctx: Context
  ): Promise<Person | null> {
    return ctx.getPerson(mandate.accountHolderId)
  }

  @FieldResolver()
  persons(
    @Root() mandate: Mandate,
    @Args(() => GetPersonsArgs) args: GetPersonsArgs,
    @Ctx() ctx: Context
  ): Promise<Person[] | null> {
    return new Promise(async function (resolve, reject) {
      const persons = await ctx.getPersons(args)
      if (!persons) {
        reject('Could not get persons')
      } else {
        resolve(
          persons.filter(
            ({ authorizationMandateId }) =>
              authorizationMandateId === mandate.id
          )
        )
      }
    })
  }

  @Query(() => [Mandate])
  async allMandates(@Ctx() ctx: Context) {
    return await ctx.getMandates()
  }

  @Query(() => Mandate, { nullable: true }) async mandateById(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ) {
    return await ctx.getMandate(id)
  }
}

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
  ArgsType,
  Float,
  ID,
} from 'type-graphql'
import { Context } from '../context'
import { Mandate } from '../models/Mandate'
import { Person } from '../models/Person'
import { GetPersonsArgs, PersonCreateInput } from './PersonResolver'

@ArgsType()
export class GetMandatesArgs {
  @Field(() => ID, { nullable: true })
  id?: string

  @Field(() => Float, { nullable: true })
  amount?: number

  @Field(() => Date, { nullable: true })
  signedAt?: Date
}

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
  async allMandates(@Args() args: GetMandatesArgs, @Ctx() ctx: Context) {
    return await ctx.getMandates(args)
  }

  @Query(() => Mandate, { nullable: true }) async mandateById(
    @Arg('id') id: string,
    @Ctx() ctx: Context
  ) {
    return await ctx.getMandate(id)
  }
}

import 'reflect-metadata'
import {
  InputType,
  Field,
  Resolver,
  FieldResolver,
  Root,
  Ctx,
  Query,
} from 'type-graphql'
import { Context } from './context'
import { Mandate } from './Mandate'
import { Person } from './Person'
import { PersonCreateInput } from './PersonResolver'

@InputType()
export class MandateCreateInput {
  @Field()
  amount: number

  @Field()
  signedAt: Date

  @Field((type) => [PersonCreateInput], { nullable: true })
  persons: [PersonCreateInput]
}

@Resolver(Mandate)
export class MandateResolver {
  @FieldResolver()
  accountHolder(
    @Root() mandate: Mandate,
    @Ctx() ctx: Context
  ): Promise<Person | null> {
    return ctx.prisma.mandate
      .findUnique({
        where: {
          id: mandate.id,
        },
      })
      .accountHolder()
  }

  @FieldResolver()
  persons(
    @Root() mandate: Mandate,
    @Ctx() ctx: Context
  ): Promise<Person[] | null> {
    return ctx.prisma.mandate
      .findUnique({
        where: {
          id: mandate.id,
        },
      })
      .persons()
  }

  @Query(() => [Mandate])
  async allMandates(@Ctx() ctx: Context) {
    return ctx.prisma.mandate.findMany()
  }
}

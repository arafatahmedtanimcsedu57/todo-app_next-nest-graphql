import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PriorityController } from './priority/priority.controller';
import { PriorityResolver } from './priority/priority.resolver';
import { PriorityModule } from './priority/priority.module';

@Module({
  imports: [
    // Load env for the monorepo root AND for apps/api
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [join(process.cwd(), 'apps/api/.env'), '.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    TodoModule,
    PrismaModule,
    PriorityModule,
  ],
  controllers: [TodoController, PriorityController],
  providers: [PrismaService, PriorityResolver],
})
export class AppModule {}

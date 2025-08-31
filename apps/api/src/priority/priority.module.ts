import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PriorityService } from './priority.service';
import { PriorityResolver } from './priority.resolver';

@Module({
  imports: [PrismaModule],
  providers: [PriorityService, PriorityResolver],
})
export class PriorityModule {}

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PriorityService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.priority.findMany({ orderBy: { createdAt: 'desc' } });
  }

  create(data: Prisma.PriorityCreateInput) {
    return this.prisma.priority.create({ data });
  }

  update(id: number, data: Prisma.PriorityUpdateInput) {
    return this.prisma.priority.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.priority.delete({ where: { id } });
  }
}

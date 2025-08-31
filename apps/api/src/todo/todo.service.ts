import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
      include: { priority: true },
    });
  }

  create(data: Prisma.TodoCreateInput) {
    return this.prisma.todo.create({ data });
  }

  update(id: number, data: Prisma.TodoUpdateInput) {
    return this.prisma.todo.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.todo.delete({ where: { id } });
  }
}

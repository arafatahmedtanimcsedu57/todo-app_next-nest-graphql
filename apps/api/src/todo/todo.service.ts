import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
  }

  create(title: string) {
    return this.prisma.todo.create({ data: { title } });
  }

  update(id: number, data: Prisma.TodoUpdateInput) {
    return this.prisma.todo.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.todo.delete({ where: { id } });
  }
}

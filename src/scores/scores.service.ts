import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ScoresService {
  constructor(private readonly prisma: PrismaService) { }

  create(createScoreDto: CreateScoreDto) {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    createScoreDto.createdAt = date.toISOString();
    try {
      return this.prisma.scores.create({ data: createScoreDto, });
    } catch (e) {
      throw new Error('Error creating score');
    }
  }

  findAll() {
    try {
      return this.prisma.scores.findMany();
    } catch (e) {
      throw new Error('Error finding scores');
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.scores.findFirstOrThrow({
        where: { id },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new Error(`Score with id ${id} not found`);
      }
    }
  }

  async update(id: number, updateScoreDto: UpdateScoreDto) {
    try {
      return await this.prisma.scores.update({
        where: { id },
        data: updateScoreDto,
      })
    } catch (e) {
      throw new Error(`Couldn't update: ${id} `);
    }
  }

  async remove(id: number) {
    const score = await this.prisma.scores.findUnique({ where: { id } });
    if (!score) {
      throw new Error(`Score with id ${id} not found`);
    }
    return await this.prisma.scores.delete({
      where: { id },
    });
  }

  async topTen() {
    try {
      return await this.prisma.scores.findMany({
        orderBy: {
          score: 'desc',
        },
        take: 10,
      });
    } catch (e) {
      throw new Error('Error finding top ten scores');
    }
  }

  async topTenDaily() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    try {
      return await this.prisma.scores.findMany({
        where: {
          AND: [
            {
              createdAt: {
                gte: startOfDay.toISOString(),
              },
            },
            {
              createdAt: {
                lt: endOfDay.toISOString(),
              },
            },
          ],
        },
        orderBy: {
          score: 'desc',
        },
        take: 10,
      });
    } catch (e) {
      throw new Error('Error finding top ten daily scores');
    }
  }
  async search(name: string) {
    try {
      return await this.prisma.scores.findMany({
        where: {
          name: {
            contains: name,
          },
        },
      });
    } catch (e) {
      throw new Error('Cannot find name');
    }
  }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInteractionDto } from '../../dto/interaction.dto';
import { UpdateInteractionDto } from '../../dto/interaction.dto';

@Injectable()
export class InteractionService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createInteractionDto: CreateInteractionDto) {
    return this.prisma.interaction.create({
      data: {
        ...createInteractionDto,
        userId: userId,
      },
      include: {
        client: true,
        project: true,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.interaction.findMany({
      where: {
        userId: userId,
      },
      include: {
        client: true,
        project: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findOne(userId: string, id: string) {
    const interaction = await this.prisma.interaction.findFirst({
      where: { id, userId },
      include: {
        client: true,
        project: true,
      },
    });

    if (!interaction) {
      throw new NotFoundException(`Interaction with ID ${id} not found`);
    }

    return interaction;
  }

  async update(userId: string, id: string, updateInteractionDto: UpdateInteractionDto) {
    const interaction = await this.prisma.interaction.findFirst({
      where: { id, userId },
    });

    if (!interaction) {
      throw new NotFoundException(`Interaction with ID ${id} not found`);
    }

    return this.prisma.interaction.update({
      where: { id },
      data: updateInteractionDto,
      include: {
        client: true,
        project: true,
      },
    });
  }

  async remove(userId: string, id: string) {
    const interaction = await this.prisma.interaction.findFirst({
      where: { id, userId },
    });

    if (!interaction) {
      throw new NotFoundException(`Interaction with ID ${id} not found`);
    }

    return this.prisma.interaction.delete({
      where: { id },
    });
  }

  async findByClient(userId: string, clientId: string) {
    return this.prisma.interaction.findMany({
      where: {
        userId,
        clientId,
      },
      include: {
        client: true,
        project: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findByProject(userId: string, projectId: string) {
    return this.prisma.interaction.findMany({
      where: {
        userId,
        projectId,
      },
      include: {
        client: true,
        project: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
} 
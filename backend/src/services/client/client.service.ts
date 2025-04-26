import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClientDto } from '../../dto/client/create-client.dto';
import { UpdateClientDto } from '../../dto/client/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto, userId: string) {
    return this.prisma.client.create({
      data: {
        ...createClientDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.client.findMany({
      where: { userId },
      include: {
        projects: true,
        interactions: true,
        reminders: true,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const client = await this.prisma.client.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        projects: true,
        interactions: true,
        reminders: true,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto, userId: string) {
    const client = await this.prisma.client.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });
  }

  async remove(id: string, userId: string) {
    const client = await this.prisma.client.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        projects: {
          include: {
            interactions: true
          }
        },
        interactions: true,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    // First delete all interactions related to the client's projects
    for (const project of client.projects) {
      await this.prisma.interaction.deleteMany({
        where: {
          projectId: project.id,
        },
      });
    }

    // Then delete all projects
    await this.prisma.project.deleteMany({
      where: {
        clientId: id,
      },
    });

    // Delete all interactions directly linked to the client
    await this.prisma.interaction.deleteMany({
      where: {
        clientId: id,
      },
    });

    // Finally delete the client
    return this.prisma.client.delete({
      where: { id },
    });
  }
} 
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from '../dto/project.dto';
import { UpdateProjectDto } from '../dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) { }

  async createProject(userId: string, createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        userId,
      },
      include: {
        client: true,
      },
    });
  }

  async findAllProjects(userId: string) {
    return this.prisma.project.findMany({
      where: {
        userId,
      },
      include: {
        client: true,
      },
    });
  }

  async getProjectStats(userId: string) {
    const [total, in_progress, completed, cancelled, pending] = await Promise.all([
      this.prisma.project.count({
        where: { userId }
      }),
      this.prisma.project.count({
        where: {
          userId,
          status: 'in_progress'
        }
      }),
      this.prisma.project.count({
        where: {
          userId,
          status: 'completed'
        }
      }),
      this.prisma.project.count({
        where: {
          userId,
          status: 'cancelled'
        }
      }),
      this.prisma.project.count({
        where: {
          userId,
          status: 'pending'
        }
      })
    ]);

    const stats = {
      total,
      in_progress,
      completed,
      cancelled,
      pending,
    };
  
    console.log('Project stats for user:', userId, stats); // ✅ Logs user ID and results
  
    return stats;
  }


  async findProjectById(userId: string, id: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        client: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async updateProject(userId: string, id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.findProjectById(userId, id);

    return this.prisma.project.update({
      where: {
        id: project.id,
      },
      data: updateProjectDto,
      include: {
        client: true,
      },
    });
  }

  async deleteProject(userId: string, id: string) {
    const project = await this.findProjectById(userId, id);

    return this.prisma.project.delete({
      where: {
        id: project.id,
      },
    });
  }
} 
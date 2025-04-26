import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReminderDto } from '../../dto/reminder.dto';
import { UpdateReminderDto } from '../../dto/reminder.dto';

@Injectable()
export class ReminderService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createReminderDto: CreateReminderDto) {
    return this.prisma.reminder.create({
      data: {
        ...createReminderDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.reminder.findMany({
      where: { userId },
      include: {
        client: true,
        project: true,
      },
    });
  }

  async findOne(userId: string, id: string) {
    const reminder = await this.prisma.reminder.findFirst({
      where: { id, userId },
      include: {
        client: true,
        project: true,
      },
    });

    if (!reminder) {
      throw new NotFoundException('Reminder not found');
    }

    return reminder;
  }

  async update(userId: string, id: string, updateReminderDto: UpdateReminderDto) {
    const reminder = await this.findOne(userId, id);
    return this.prisma.reminder.update({
      where: { id: reminder.id },
      data: updateReminderDto,
    });
  }

  async remove(userId: string, id: string) {
    const reminder = await this.findOne(userId, id);
    return this.prisma.reminder.delete({
      where: { id: reminder.id },
    });
  }

  async getRemindersForThisWeek(userId: string) {
    const now = new Date();
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + 7);
  
    const upcomingProjects = await this.prisma.project.findMany({
      where: {
        userId,
        deadline: {
          gte: now,
          lte: endOfWeek,
        },
        status: {
          notIn: ['completed', 'cancelled']
        }
      },
      include: {
        client: true,
      },
      orderBy: {
        deadline: 'asc',
      },
    });

    // Transform projects into reminder-like objects
    return upcomingProjects.map(project => ({
      id: project.id,
      title: `Project Deadline: ${project.title}`,
      description: `Project deadline is approaching`,
      dueDate: project.deadline,
      type: 'project_deadline',
      project: {
        id: project.id,
        title: project.title,
      },
      client: project.client,
    }));
  }
  

  async createProjectDeadlineReminder(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { user: true },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const reminderDate = new Date(project.deadline);
    reminderDate.setDate(reminderDate.getDate() - 7);

    return this.prisma.reminder.create({
      data: {
        title: `Project Deadline: ${project.title}`,
        description: `Project deadline is approaching in 7 days`,
        dueDate: reminderDate,
        type: 'automatic',
        userId: project.userId,
        projectId: project.id,
      },
    });
  }

  async syncProjectDeadlineReminders(userId: string) {
    const projects = await this.prisma.project.findMany({
      where: {
        userId,
        deadline: {
          gte: new Date(),
        },
      },
      include: {
        user: true,
      },
    });

    for (const project of projects) {
      const existingReminder = await this.prisma.reminder.findFirst({
        where: {
          projectId: project.id,
          type: 'automatic',
        },
      });

      if (!existingReminder) {
        await this.createProjectDeadlineReminder(project.id);
      }
    }
  }
} 
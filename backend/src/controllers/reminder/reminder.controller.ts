import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ReminderService } from '../../services/reminder/reminder.service';
import { CreateReminderDto } from '../../dto/reminder.dto';
import { UpdateReminderDto } from '../../dto/reminder.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    id: string;
  };
}

@Controller('reminders')
@UseGuards(JwtAuthGuard)
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Post()
  create(@Request() req: RequestWithUser, @Body() createReminderDto: CreateReminderDto) {
    return this.reminderService.create(req.user.id, createReminderDto);
  }

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.reminderService.findAll(req.user.id);
  }

  @Get('week')
  getRemindersForThisWeek(@Request() req: RequestWithUser) {
    return this.reminderService.getRemindersForThisWeek(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.reminderService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateReminderDto: UpdateReminderDto,
  ) {
    return this.reminderService.update(req.user.id, id, updateReminderDto);
  }

  @Delete(':id')
  remove(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.reminderService.remove(req.user.id, id);
  }

  @Post('sync-project-deadlines')
  @UseGuards(JwtAuthGuard)
  async syncProjectDeadlineReminders(@Request() req: RequestWithUser) {
    return this.reminderService.syncProjectDeadlineReminders(req.user.id);
  }
} 
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Logger } from '@nestjs/common';
import { InteractionService } from '../../services/interaction/interaction.service';
import { CreateInteractionDto } from '../../dto/interaction/interaction.dto';
import { UpdateInteractionDto } from '../../dto/interaction/interaction.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { GetUser } from '../../decorators/get-user.decorator';

@Controller('interactions')
@UseGuards(JwtAuthGuard)
export class InteractionController {
  private readonly logger = new Logger(InteractionController.name);

  constructor(private readonly interactionService: InteractionService) {}

  @Post()
  create(@GetUser('id') userId: string, @Body() createInteractionDto: CreateInteractionDto) {
    this.logger.debug('Received create interaction request:', {
      userId,
      dto: createInteractionDto,
    });
    return this.interactionService.create(userId, createInteractionDto);
  }

  @Get()
  findAll(@GetUser('id') userId: string) {
    return this.interactionService.findAll(userId);
  }

  @Get(':id')
  findOne(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.interactionService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @GetUser('id') userId: string,
    @Param('id') id: string,
    @Body() updateInteractionDto: UpdateInteractionDto,
  ) {
    return this.interactionService.update(userId, id, updateInteractionDto);
  }

  @Delete(':id')
  remove(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.interactionService.remove(userId, id);
  }

  @Get('client/:clientId')
  findByClient(@GetUser('id') userId: string, @Param('clientId') clientId: string) {
    return this.interactionService.findByClient(userId, clientId);
  }

  @Get('project/:projectId')
  findByProject(@GetUser('id') userId: string, @Param('projectId') projectId: string) {
    return this.interactionService.findByProject(userId, projectId);
  }
} 
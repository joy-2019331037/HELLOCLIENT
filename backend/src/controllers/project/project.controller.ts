import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProjectService } from '../../services/project.service';
import { CreateProjectDto } from '../../dto/project.dto';
import { UpdateProjectDto } from '../../dto/project.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

interface RequestWithUser {
  user: {
    id: string;
  };
  body: any;
}

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Request() req: RequestWithUser, @Body() createProjectDto: CreateProjectDto) {
    console.log('Request body:', req.body);
    console.log('Request user:', req.user);
    console.log('CreateProjectDto:', createProjectDto);
    return this.projectService.createProject(req.user.id, createProjectDto);
  }

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.projectService.findAllProjects(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.projectService.findProjectById(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(req.user.id, id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.projectService.deleteProject(req.user.id, id);
  }
} 
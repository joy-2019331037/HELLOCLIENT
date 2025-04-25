import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClientService } from '../../services/client/client.service';
import { CreateClientDto } from '../../dto/client/create-client.dto';
import { UpdateClientDto } from '../../dto/client/update-client.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { GetUser } from '../../decorators/get-user.decorator';
import { User } from '@prisma/client';
import { Client } from '@prisma/client';

@ApiTags('clients')
@ApiBearerAuth()
@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({ status: 201, description: 'Client created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createClientDto: CreateClientDto, @GetUser() user: User): Promise<Client> {
    return this.clientService.create(createClientDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'Return all clients' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@GetUser() user: User): Promise<Client[]> {
    return this.clientService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a client by id' })
  @ApiResponse({ status: 200, description: 'Return the client' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Client> {
    return this.clientService.findOne(id, user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a client' })
  @ApiResponse({ status: 200, description: 'Client updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
    @GetUser() user: User,
  ): Promise<Client> {
    return this.clientService.update(id, updateClientDto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a client' })
  @ApiResponse({ status: 204, description: 'Client deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Client> {
    return this.clientService.remove(id, user.id);
  }
} 
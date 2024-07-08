import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Patch,
  Delete,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('companies')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}
  @Roles(Role.Admin, Role.User)
  @Post()
  async create(
    @Req() req: Request,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    try {
      const ownerId = req.user.sub; // используем поле sub для получения идентификатора пользователя
      const company = await this.companiesService.create(
        ownerId,
        createCompanyDto,
      );
      return {
        message: 'Company was successfully created',
        company,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Company already exists');
      }
      throw new InternalServerErrorException('Failed to create company');
    }
  }

  @Roles(Role.Admin, Role.User)
  @Get()
  async findAll(@Req() req: Request) {
    try {
      const ownerId = (req.user as any).sub;
      const userRole = (req.user as any).roles;
      const companies = await this.companiesService.findAll(ownerId, userRole);
      return companies;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch companies');
    }
  }

  @Roles(Role.Admin, Role.User)
  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: number) {
    try {
      const ownerId = (req.user as any).sub;
      const userRole = (req.user as any).roles;
      const company = this.companiesService.findOne(ownerId, id, userRole);
      if (!company) {
        throw new NotFoundException('Company was not found');
      }
      return company;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch company');
    }
  }

  @Roles(Role.Admin, Role.User)
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    try {
      const ownerId = (req.user as any).sub;
      const userRole = (req.user as any).roles;
      const company = this.companiesService.update(
        ownerId,
        id,
        updateCompanyDto,
        userRole,
      );
      return {
        message: 'Company updated successfully',
        company,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Company not found');
      }
      throw new InternalServerErrorException('Failed to update company');
    }
  }

  @Roles(Role.Admin, Role.User)
  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: number) {
    try {
      const ownerId = (req.user as any).sub; // используем поле sub для получения идентификатора пользователя
      const userRole = (req.user as any).roles; // используем поле sub для получения идентификатора пользователя
      await this.companiesService.remove(ownerId, id, userRole);
      return { message: 'Company has been deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Company not found');
      }
      throw new InternalServerErrorException('Failes to delete company');
    }
  }
}

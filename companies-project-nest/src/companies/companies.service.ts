import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(
    ownerId: string,
    createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    const existingCompany = await this.companyRepository.findOne({
      where: { name: createCompanyDto.name, ownerId },
    });
    if (existingCompany) {
      throw new ConflictException('Company already exists');
    }
    const newCompany = this.companyRepository.create({
      ...createCompanyDto,
      ownerId, // adding  ownerId field into the company object
    });
    return this.companyRepository.save(newCompany);
  }

  async findAll(ownerId: string, userRole: string): Promise<Company[]> {
    const orderOptions: FindOptionsOrder<Company> = {
      name: 'ASC', //sorting order ascending for name
    };
    if (userRole === 'admin') {
      return this.companyRepository.find({ order: orderOptions });
    }
    return this.companyRepository.find({
      where: { ownerId },
      order: orderOptions,
    });
  }

  async findOne(
    ownerId: string,
    id: number,
    userRole: string,
  ): Promise<Company> {
    let company = null;
    if (userRole === 'admin') {
      company = await this.companyRepository.findOne({ where: { id } });
    } else {
      company = await this.companyRepository.findOne({
        where: { ownerId, id },
      });
    }
    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }
    return company;
  }

  async update(
    ownerId: string,
    id: number,
    updateCompanyDto: UpdateCompanyDto,
    userRole: string,
  ): Promise<Company> {
    const company = await this.findOne(ownerId, id, userRole);
    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }
    this.companyRepository.merge(company, updateCompanyDto);
    return this.companyRepository.save(company);
  }

  async remove(ownerId: string, id: number, userRole: string): Promise<void> {
    const company = await this.findOne(ownerId, id, userRole);
    if (!company) {
      throw new Error(`Company with id ${id} not found`);
    }
    await this.companyRepository.remove(company);
  }
}

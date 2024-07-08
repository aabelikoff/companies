export class CreateCompanyDto {
  name: string;
  address: string;
  fieldOfActivity: string;
  numberOfEmployees: number;
  description: string;
  type: string;
}

export class UpdateCompanyDto {
  name?: string;
  address?: string;
  fieldOfActivity?: string;
  numberOfEmployees?: number;
  description?: string;
  type?: string;
}

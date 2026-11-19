import { IsNotEmpty } from 'class-validator';
import { Role } from '../../../generated/prisma/client.js';

export class CreateUserDto {
  @IsNotEmpty()
  email: string;
  password: string;
  name: string;
  role?: Role;
}

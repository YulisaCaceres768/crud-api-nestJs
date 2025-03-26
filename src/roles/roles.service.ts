import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  // Inyección del repositorio de Role en el constructor
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>, // Aquí se inyecta el repositorio de la entidad Role
  ) {}

}
  //Metodos del servicio 

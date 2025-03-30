import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],  // Registra la entidad Role aquí
  providers: [RolesService],  // No es necesario agregar el RoleRepository explícitamente
  controllers: [RolesController],
})
export class RolesModule {}

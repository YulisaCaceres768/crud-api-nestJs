// Importación de módulos y decoradores necesarios para definir el controlador
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"; 
import { RolesService } from "./roles.service"; // Importación del servicio donde se maneja la lógica de negocio
import { CreateRoleDto } from "./dto/create-role.dto"; // DTO para la creación de un rol
import { UpdateRoleDto } from "./dto/update-role.dto"; // DTO para la actualización de un rol

/**
 * Controlador encargado de manejar las peticiones HTTP relacionadas con los roles.
 * Se accede a través del prefijo `/roles`.
 */
@Controller('roles')
export class RolesController {
    
    /**
     * Inyección del servicio `RolesService` para manejar la lógica de negocio de los roles.
     * @param rolesService - Servicio encargado de la gestión de roles.
     */
    constructor(private readonly rolesService: RolesService) {}

    /**
     * Método para crear un nuevo rol.
     * Maneja las peticiones HTTP `POST /roles`.
     * @param createRoleDto - Datos del rol a crear, obtenidos del cuerpo de la petición.
     * @returns El rol creado.
     */
    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    /**
     * Método para obtener todos los roles registrados en la base de datos.
     * Maneja las peticiones HTTP `GET /roles`.
     * @returns Lista de roles existentes.
     */
    @Get()
    findAll() {
        return this.rolesService.findAll();
    }

    /**
     * Método para obtener un rol específico según su ID.
     * Maneja las peticiones HTTP `GET /roles/:id`.
     * @param id - Identificador único del rol (extraído de los parámetros de la URL).
     * @returns Los datos del rol correspondiente.
     */
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.rolesService.findOne(id);
    }

    /**
     * Método para actualizar un rol existente.
     * Maneja las peticiones HTTP `PATCH /roles/:id`.
     * @param id - Identificador del rol a actualizar.
     * @param updateRoleDto - Datos actualizados del rol, obtenidos del cuerpo de la petición.
     * @returns El rol actualizado.
     */
    @Patch(':id') 
    update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.update(id, updateRoleDto);
    }

    /**
     * Método para eliminar un rol según su ID.
     * Maneja las peticiones HTTP `DELETE /roles/:id`.
     * @param id - Identificador del rol a eliminar.
     * @returns Un mensaje de confirmación de eliminación.
     */
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.rolesService.remove(id);
    }
}

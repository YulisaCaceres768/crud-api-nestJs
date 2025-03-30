import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm'; 
import { Role } from './entities/role.entity';
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ok } from "assert";

@Injectable()
export class RolesService {
  // Inyección del repositorio de Role en el constructor
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>, // Aquí se inyecta el repositorio de la entidad Role
  ) {}


  //Metodos del servicio 

  //Metodo para crear un nuevo rol en la base de datos 
  //esperara un parametro  llamado createRoleDto que viene del objeto CreateRoleDto 
  //el cual contiene los parametros para la creacion del rol
async create (createRoleDto : CreateRoleDto) {
  try {
    const role = this.roleRepository.create(createRoleDto); // se crea una variable de rol en donde sera igual al metodo de create 
    //que se almacena en el parametro createDto y guarda el nuevo rol en memoria

    //espera que se guarde el nuevo rol para continuar  y con save se guarda en la BD 
    await this.roleRepository.save(role);
    return {
      ok: true, 
      message: "Rol creado correctamente", 
      status: 201,
      };

  } catch (error) {
    return {
      ok: false, 
      message: "Ocurrio un error al guardar el rol", 
      status: 500, 
     };
  }
}

//metodo para mostrar  todos los registros de la tabla de roles 
async findAll() {
  try {
    //usa this.roleRepository.find() para obtener los registros de la tabla roles 
    const roles = await this.roleRepository.find({ 
      where: { isActive: true}, //filtra aquellos que estan activos 
    });

    //si la lista roles tiene al menos un elemento mayor a cero, devuelve 
    //ok true: mensaje de exito 
    //roles: lista de roles y el status 200 que es el codigo http para exito 
    if (roles.length > 0 ) {
      return {ok: true, roles, status: 200 };
    }
    //si no hay activos devuelve 
    //ok: false : no se encontraron datos y el status 404 es el codigo http para "no encontrado"
    return{ 
      ok: false, message: "No se encontraron roles", status: 404 }

    //manejo de errores
    //si ocurre dentro del try, lo captura el catch y devuelve
    // ok false: indica un fallo en la operacion, con un mensaje de error generico y 
    //con un status 500 que es un codigo http para error interno del servidor
  } catch (error) {
    return{
      ok: false,
      message: "Ocurrio un error al obtener los roles",
      status: 500,
    }
    
  }
}

//encontrar  un registro de la lista por medio del ID
//el metodo recibe un parametro de tipo numerico, que representa el identificador del rol a buscar 
async findOne(id: number) {
  try {

    //usa this.roleRepository para buscar un rol en la bd con el id especificado
    //where: { id } filtra la busqueda para obtener solo el rol con el id proporcionado
    const rol = await this.roleRepository.findOne({where:{ id }});

    //verifica si el rol existe
    //si el rol es null, devuelve rol no encontrado 
    if(!rol) {
      return {ok: false , message: "Rol no encontrado", status: 404 };
    }

    //si el rol existe, devuelve ok: true
    return { ok: true, rol, status: 200};

    //si ocurre algo dentro del try catch captura la excepcion y devuelve ok :false
  } catch (error) {
    return{
      ok: false,
      message: "Ocurrio un error",
      status: 500,
    }
  }
}

//actualizar un rol buscandolo por su id 
async update(id: number, updateRoleDto: UpdateRoleDto) {
  try {
    // Verificar si el rol existe
    const rol = await this.roleRepository.findOne({ where: { id } });
    if (!rol) {
      return { ok: false, message: "Rol no encontrado", status: 404 };
    }

    // Validar que el nombre del rol sea obligatorio y no esté vacío
    if (!updateRoleDto.name || updateRoleDto.name.trim() === "") {
      return { ok: false, message: "El nombre del rol es obligatorio", status: 400 };
    }

    // Verificar que el nuevo nombre no exista en otro registro
    const existingRole = await this.roleRepository.findOne({ where: { name: updateRoleDto.name } });
    if (existingRole && existingRole.id !== id) {
      return { ok: false, message: "Ya existe un rol con este nombre", status: 400 };
    }

    // Asignar el nuevo nombre y guardar
    rol.name = updateRoleDto.name;
    await this.roleRepository.save(rol);

    return { ok: true, message: "Rol actualizado correctamente", status: 200 };

  } catch (error) {
    return {
      ok: false,
      message: "Ocurrió un error al actualizar el rol",
      status: 500,
    };
  }
}


//eliminar por id 
async remove(id: number) {
  try {
    //intenta encontrar el rol con el id proporcionado si no lo encuentra, 
    //es por que el rol no existe y retorna no encontrado 
    const rol = await this.roleRepository.findOne({ where: { id } });

    if (!rol) {
      return {
        ok: false,
        message: 'Rol no encontrado',
        status: 404,
      };
    }
    //en lugar de borrar el registro solo lo desactiva 
    //sirve para mantener el historial de roles sin eliminarlos definitivamente
    rol.isActive = false;
    await this.roleRepository.save(rol);
    
    return {
      ok: true,
      message: 'Rol eliminado correctamente',

      status: 200,
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Ocurrió un error al eliminar el rol',
      status: 500,
    };
  }
}
}
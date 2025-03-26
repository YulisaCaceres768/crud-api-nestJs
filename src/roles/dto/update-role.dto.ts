import { IsOptional, IsString, IsBoolean } from "class-validator";

export class UpdateRoleDto {
  @IsOptional() // No obligatorio, solo si el usuario lo envía
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity('roles_hierarchy')
export class RoleHierarchy {
    @PrimaryGeneratedColumn('uuid') id: string;

    @ManyToOne(() => Role) padre: Role;   // e.g. coordinacion
    @ManyToOne(() => Role) hijo: Role;    // e.g. encargado_area
}
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CatalogoType } from "./catalogo-type.enum";

@Entity('catalogos')
@Index(['tipo', 'codigo'], { unique: true })
export class Catalogo {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column({ type: 'enum', enum: CatalogoType })
    tipo: CatalogoType;

    /** Ej: PFJYA, HIBRIDA, GT-01, … */
    @Column({ length: 20 }) codigo: string;

    /** Descripción visible al usuario */
    @Column({ length: 120 }) nombre: string;

    @Column({ default: true }) activo: boolean;

    @CreateDateColumn() createdAt: Date;
    @UpdateDateColumn() updatedAt: Date;
}

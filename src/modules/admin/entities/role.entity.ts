import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column({ unique: true, length: 32 })
    nombre: string;                       // superadmin | coordinacion | …

    @Column({ nullable: true }) descripcion?: string;

    /* --- Timestamps --- */
    @CreateDateColumn() createdAt: Date;
    @UpdateDateColumn() updatedAt: Date;
}
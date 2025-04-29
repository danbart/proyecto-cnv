import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comunicacion } from "./comunicacion.entity";

@Entity('comunicacion_logs')
export class ComunicacionLog {
    @PrimaryGeneratedColumn('uuid') id: string;

    @ManyToOne(() => Comunicacion, (c) => c.logs, { onDelete: 'CASCADE' })
    comunicacion: Comunicacion;

    @Column() destinatario: string;                // e-mail u otro identificador
    @Column({ default: false }) exito: boolean;
    @Column({ type: 'text', nullable: true }) error?: string;

    @CreateDateColumn() enviadoEn: Date;
}
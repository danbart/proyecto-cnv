import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Canal } from "./canal.enum";
import { ComunicacionLog } from "./comunicacion-logs.entity";
import { Convocatoria } from "./convocatoria.entity";

@Entity('comunicaciones')
export class Comunicacion {
    @PrimaryGeneratedColumn('uuid') id: string;

    @ManyToOne(() => Convocatoria, { onDelete: 'CASCADE' })
    convocatoria: Convocatoria;

    @Column({ type: 'enum', enum: Canal }) canal: Canal;            // email / sistema
    @Column() asunto: string;
    @Column({ type: 'text' }) cuerpoHtml: string;                    // plantilla final
    @Column({ default: false }) enviado: boolean;
    @Column({ default: 0 }) totalIntentos: number;

    @CreateDateColumn() creadoEn: Date;
    @UpdateDateColumn() actualizadoEn: Date;

    @OneToMany(() => ComunicacionLog, (log) => log.comunicacion, { cascade: true })
    logs: ComunicacionLog[];
}
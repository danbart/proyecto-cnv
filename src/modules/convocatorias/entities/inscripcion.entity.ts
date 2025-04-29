
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Convocatoria } from '../entities/convocatoria.entity';
import { InscripcionEstado } from '../entities/inscripcion-estado.enum';

@Entity('inscripciones')
export class Inscripcion {
    @PrimaryGeneratedColumn('uuid') id: string;

    /* ------------ Datos del participante (snapshot) ------------ */
    @Column() nombres: string;
    @Column() apellidos: string;
    @Column() emailPersonal: string;
    @Column({ nullable: true }) emailOJ?: string;
    @Column() cargo: string;
    @Column() lugarTrabajo: string;
    @Column() gafete: string;
    @Column() telefono: string;
    @Column() jefeInmediato: string;
    @Column() departamento: string;
    @Column() municipio: string;

    /* ------------ Relación y fecha seleccionada ------------ */
    @ManyToOne(() => Convocatoria, (c) => c.id, { onDelete: 'CASCADE' })
    convocatoria: Convocatoria;

    /** Índice (0-n) dentro del array `fechas` de la convocatoria  */
    @Column({ type: 'int' }) indiceFecha: number;

    /* ------------ Estado y auditoría ------------ */
    @Column({ type: 'enum', enum: InscripcionEstado, default: InscripcionEstado.PENDIENTE })
    estado: InscripcionEstado;

    @Column({ type: 'text', nullable: true }) nota?: string;     // motivo rechazo, etc.

    @CreateDateColumn() createdAt: Date;
    @UpdateDateColumn() updatedAt: Date;
}

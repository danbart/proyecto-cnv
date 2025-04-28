import { Exclude } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ConvocatoriaLog } from './convocatoriaLog.entity';

export enum ConvocatoriaEstado {
    BORRADOR = 'borrador',
    EN_REVISION = 'en_revision',
    EN_MODIFICACION = 'en_modificacion',
    APROBADA = 'aprobada',
    EN_PUBLICACION = 'en_publicacion',
    PUBLICADA = 'publicada',
    CANCELADA = 'cancelada',
}

@Entity({ name: 'convocatorias' })
export class Convocatoria {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // --- Datos básicos ---
    @Column({ length: 150 })
    titulo: string;

    @Column({ type: 'text' })
    descripcion: string;

    @Column({ name: 'tipo', length: 25 }) // PFJYA | EXTRAORDINARIO | ...
    tipo: string;

    @Column({ name: 'modalidad', length: 20 }) // presencial | virtual | hibrida | semi
    modalidad: string;

    // múltiples fechas ‑ guardamos como JSON para primera versión
    // [{ "fechaInicio": ..., "fechaFin": ... }]
    @Column({ type: 'jsonb', default: () => "'[]'" })
    fechas: Array<{ fechaInicio: Date; fechaFin: Date }>;

    // --- Flujo / estado ---
    @Column({ type: 'enum', enum: ConvocatoriaEstado, enumName: 'convocatoria_estado_enum', default: ConvocatoriaEstado.BORRADOR })
    estado: ConvocatoriaEstado;

    // Cupos
    @Column({ type: 'integer', default: 0 })
    cupo: number;

    // --- Auditoría ---
    @ManyToOne(() => User)
    @Exclude()
    createdBy: User;

    @ManyToOne(() => User)
    @Exclude()
    updatedBy: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToMany(() => ConvocatoriaLog, (l) => l.convocatoria, { cascade: true })
    logs: ConvocatoriaLog[];

}
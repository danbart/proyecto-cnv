import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Convocatoria, ConvocatoriaEstado } from "./convocatoria.entity";

@Entity({ name: 'convocatoria_logs' })
export class ConvocatoriaLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Convocatoria, (c) => c.logs, { onDelete: 'CASCADE' })
    convocatoria: Convocatoria;

    @Column({ type: 'enum', enum: ConvocatoriaEstado, enumName: 'convocatoria_estado_enum', })
    de: ConvocatoriaEstado;

    @Column({ type: 'enum', enum: ConvocatoriaEstado, enumName: 'convocatoria_estado_enum', })
    a: ConvocatoriaEstado;

    @ManyToOne(() => User)
    actor: User;

    @Column({ type: 'text', nullable: true, })
    nota?: string;

    @CreateDateColumn()
    createdAt: Date;
}

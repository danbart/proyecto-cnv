import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    @Exclude()
    password: string;

    @Column()
    fullName: string;

    @Column('text', { array: true, default: ['user'] }) // admin, user, superadmin
    roles: string[];

    @Column({ nullable: true, select: false })
    @Exclude()
    refreshToken?: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @Column({ nullable: true })
    createdBy?: string;

    @Column({ nullable: true })
    updatedBy?: string;
}

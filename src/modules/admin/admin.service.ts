import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { MetricFilterDto } from './dto/metric-filter.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { MetricView } from './entities/metric-view.entity';
import { RoleHierarchy } from './entities/role-hierarchy.entity';
import { Role } from './entities/role.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Role) private roleRepo: Repository<Role>,
        @InjectRepository(RoleHierarchy) private hRepo: Repository<RoleHierarchy>,
        @InjectRepository(MetricView) private metricRepo: Repository<MetricView>,
    ) { }

    // ---- Roles ----
    createRole(dto: CreateRoleDto) { return this.roleRepo.save(dto); }
    updateRole(id: string, dto: UpdateRoleDto) { return this.roleRepo.update(id, dto); }
    listRoles() { return this.roleRepo.find(); }
    deleteRole(id: string) { return this.roleRepo.delete(id); }

    // ---- Jerarquía ----
    async setParent(childId: string, parentId: string) {
        await this.hRepo.delete({ hijo: { id: childId } });
        return this.hRepo.save({ hijo: { id: childId } as any, padre: { id: parentId } as any });
    }

    // ---- Métricas ----
    async metrics(filter: MetricFilterDto) {
        const qb = this.metricRepo.createQueryBuilder('v');

        if (filter.estados?.length)
            qb.andWhere('v.estado IN (:...est)', { est: filter.estados });

        if (filter.desde)
            qb.andWhere('c."createdAt" >= :d', { d: filter.desde });

        if (filter.hasta)
            qb.andWhere('c."createdAt" <= :h', { h: filter.hasta });

        return qb.getRawMany();
    }
}

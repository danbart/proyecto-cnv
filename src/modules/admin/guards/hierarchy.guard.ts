import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { Repository } from "typeorm";
import { RoleHierarchy } from "../entities/role-hierarchy.entity";

@Injectable()
export class HierarchyGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectRepository(RoleHierarchy) private rhRepo: Repository<RoleHierarchy>,
    ) { }

    async canActivate(ctx: ExecutionContext) {
        const allowed = this.reflector.get<string[]>('roles', ctx.getHandler());
        if (!allowed) return true;

        const req = ctx.switchToHttp().getRequest();
        const user: User = req.user;

        // reúne roles propios + descendientes
        const rolesUsuario = await this.expandRoles(user.roles.map((r: any) =>
            typeof r === 'string' ? r : r.nombre,
        ));

        // ¿tiene alguno de los requeridos?
        return allowed.some(r => rolesUsuario.includes(r));
    }

    private async expandRoles(baseRoles: string[]): Promise<string[]> {
        const descendientes = await this.rhRepo
            .createQueryBuilder('h')
            .leftJoinAndSelect('h.hijo', 'hijo')
            .where('h.padre.nombre IN (:...base)', { base: baseRoles })
            .getMany();
        return [...baseRoles, ...descendientes.map(d => d.hijo.nombre)];
    }
}
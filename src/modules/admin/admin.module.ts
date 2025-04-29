import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MetricView } from './entities/metric-view.entity';
import { RoleHierarchy } from './entities/role-hierarchy.entity';
import { Role } from './entities/role.entity';
import { HierarchyGuard } from './guards/hierarchy.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, RoleHierarchy, MetricView]),
  ],
  controllers: [AdminController],
  providers: [AdminService, HierarchyGuard],
  exports: [HierarchyGuard],
})
export class AdminModule { }

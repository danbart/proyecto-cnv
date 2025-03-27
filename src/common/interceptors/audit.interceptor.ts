import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();

        if (req.user && req.body) {
            const userId = req.user.userId;

            if (context.getHandler().name === 'create') {
                req.body.createdBy = userId;
            } else if (context.getHandler().name === 'update') {
                req.body.updatedBy = userId;
            }
        }

        return next.handle().pipe(
            tap(() => {
                // podrías loguear aquí si quieres
            }),
        );
    }
}

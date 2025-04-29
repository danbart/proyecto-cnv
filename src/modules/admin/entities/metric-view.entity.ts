import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    name: 'vw_metricas_convocatorias',
    expression: `
      SELECT c.id                               AS "convocatoriaId",
             c.estado                           AS estado,
             count(i.*) FILTER (WHERE i.estado='aprobada') AS "aprobadas",
             count(i.*) FILTER (WHERE i.estado='rechazada') AS "rechazadas",
             count(i.*) FILTER (WHERE i.estado='pendiente') AS "pendientes"
      FROM convocatorias c
      LEFT JOIN inscripciones i ON i."convocatoriaId" = c.id
      GROUP BY c.id
    `,
})
export class MetricView {
    @ViewColumn() convocatoriaId!: string;
    @ViewColumn() estado!: string;
    @ViewColumn() aprobadas!: number;
    @ViewColumn() rechazadas!: number;
    @ViewColumn() pendientes!: number;
}
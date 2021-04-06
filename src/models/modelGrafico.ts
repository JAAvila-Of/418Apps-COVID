export interface IGraficoPre {
  d1_dia?: number;
  d2_dia?: number;
  d1_acumulado?: number;
  d2_acumulado?: number;
}

export interface IGraficoFechas {
  [key: string]: IGraficoPre;
}

export interface IGraficoDep {
  [key: string]: IGraficoFechas;
}

import { poblacion } from "../../public/build/data/departamentos.json";
import db from "../../public/build/data/finalFechas.json";
import { ultimoCorte } from "../../public/build/data/config.json";
import { entregadas } from "../../public/build/data/finalDataFab.json";

import type { IDataDep } from "../models/dataModels";

import { generate } from "./shortNumber";

interface IDataTemp {
  d1_dia: number;
  d2_dia: number;
  d1_acumulado: number;
  d2_acumulado: number;
}

let data: IDataTemp;
let parcial: number;
let total: number;
let g_p: number;
let g_t: number;

const ent = entregadas[entregadas.length - 1].cantidad;

export const mainDep = (
  fecha: string = ultimoCorte,
  dep: string = "TOTAL"
): IDataDep => {
  data = db[fecha][dep];
  const hab = poblacion[dep];
  parcial = Number(Number((data.d1_acumulado / ent) * 100).toFixed(2));
  total = Number(
    Number((data.d2_acumulado / data.d1_acumulado) * 100).toFixed(2)
  );
  g_p = Number(Number(data.d1_acumulado / hab).toFixed(4));
  g_t = Number(Number(data.d2_acumulado / hab).toFixed(4));

  return {
    dosis_parcial: generate(data.d1_acumulado),
    dosis_total: generate(data.d2_acumulado),
    habitantes: generate(hab),
    p_parcial: parcial + "%",
    p_total: total + "%",
    g_parcial: g_p,
    g_total: g_t,
  };
};

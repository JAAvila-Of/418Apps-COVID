import db from "../../public/build/data/finalFechas.json";
import fechas from "../../public/build/data/countFechas.json";
import fEntregados from "../../public/build/data/finalEntregados.json";
import day from "dayjs";
import customFormat from "dayjs/plugin/customParseFormat";

import { storeGrafic } from "../stores/storeGrafico";
import { storeDepChart } from "../stores/storeDepChart";
import { storeTypeChart } from "../stores/storeTypeChart";

import type {
  IGraficoFechas,
  IGraficoPre,
  IGraficoDep,
} from "../models/modelGrafico";
import type { IOptChart } from "../models/modelChartOpt";

day.extend(customFormat);

let f: IGraficoFechas;
let d: IGraficoDep;

export const generateDataChart = (e: boolean = true): IOptChart => {
  let dep: string;

  f = null;

  storeDepChart.subscribe((value) => (dep = value));

  for (let i = 0; i < fechas.length; i++) {
    const fecha = fechas[i];

    if (!db[fecha][dep]) continue;

    const h: IGraficoPre = db[fecha][dep];

    f = {
      ...f,
      [fecha]: h,
    };
  }

  d = {
    [dep]: f,
  };

  storeGrafic.set(d);

  return convertDataChart(e);
};

export const convertDataChart = (e: boolean = true): IOptChart => {
  let k: Array<string>;
  let temp_d2: Array<Array<Date | number>> = [];
  let temp_d1: Array<Array<Date | number>> = [];
  let temp_d3: Array<Array<Date | number>> = [];

  let data: IGraficoDep;

  let dep: string;
  let type: number;

  storeGrafic.subscribe((value) => (data = { ...value }));
  storeDepChart.subscribe((value) => (dep = value));
  storeTypeChart.subscribe((value) => (type = value));

  k = Object.keys(data[dep]);

  for (let i = 0; i < k.length; i++) {
    const fec = k[i];
    const date = day(fec, "YYYYMMDD").format("MM/DD/YYYY");

    if (type === 1) {
      temp_d1 = [...temp_d1, [new Date(date), data[dep][fec].d1_acumulado]];
      temp_d2 = [...temp_d2, [new Date(date), data[dep][fec].d2_acumulado]];
      if (e) {
        temp_d3 = [...temp_d3, [new Date(date), fEntregados[fec].acumulado]];
      }
    } else if (type === 2) {
      temp_d1 = [...temp_d1, [new Date(date), data[dep][fec].d1_dia]];
      temp_d2 = [...temp_d2, [new Date(date), data[dep][fec].d2_dia]];
    }
  }

  let y: IOptChart = {
    d_p: temp_d1,
    d_t: temp_d2,
    d_e: temp_d3,
    min: new Date(day(k[0], "YYYYMMDD").format("MM/DD/YYYY")),
    max: new Date(day(k[k.length - 1], "YYYYMMDD").format("MM/DD/YYYY")),
  };

  return y;
};

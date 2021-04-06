import type { IDataRecieved, IDataResultFab } from "../models/fabData";

import fdf from "../../public/build/data/finalDataFab.json";
import fd from "../../public/build/data/finalFab.json";

const data: IDataRecieved = fdf;
let dataResult = [];

export const convert = (): Array<IDataResultFab> => {
  let dataTemp: IDataResultFab;

  data.solicitadas.forEach((value) => {
    const { fabricante: sFabricante, pedido: sPedido } = value;

    const e = data.entregadas.find((t) => t.fabricante === sFabricante);

    const entregadas = !e?.cantidad ? 0 : e.cantidad;
    const aplicadas = Number(fd[sFabricante].total);
    const pa = Number(Number((aplicadas / entregadas) * 100).toFixed(2));
    const pe = Number(Number((entregadas / sPedido) * 100).toFixed(2));

    dataTemp = {
      v_s: sPedido,
      v_e: entregadas,
      v_a: aplicadas,
      p_a: isNaN(pa) ? "0%" : pa + "%",
      p_e: isNaN(pe) ? "0%" : pe + "%",
      logo: fd[sFabricante].logo,
    };
    dataResult[sFabricante] = dataTemp;
  });
  //console.log(dataResult);
  return dataResult;
};

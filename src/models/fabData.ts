export interface ISolInt {
  fabricante: string;
  pedido: number;
}

export interface IEntInt {
  fabricante: string;
  cantidad: number;
}

export interface IDataRecieved {
  solicitadas: Array<ISolInt>;
  entregadas: Array<IEntInt>;
}

export interface IDataResultFab {
  v_s: number;
  v_e: number;
  v_a: number;
  p_e: string;
  p_a: string;
  logo: string;
}

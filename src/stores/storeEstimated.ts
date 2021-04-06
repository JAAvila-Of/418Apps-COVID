import { writable } from "svelte/store";
import type { IEstimated } from "../models/modelEstimated";

export const storeEstimated = writable<IEstimated>({
  _50: "",
  _75: "",
  _100: "",
  _avg: 0,
  _fechas: "",
});

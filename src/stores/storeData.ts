import { writable } from "svelte/store";
import type { IDataDep } from "../models/dataModels";

export const storeDataDep = writable<IDataDep>({
  dosis_parcial: "",
  dosis_total: "",
  g_parcial: 0,
  g_total: 0,
  habitantes: "",
  p_parcial: "",
  p_total: "",
});

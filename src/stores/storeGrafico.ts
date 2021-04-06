import { writable } from "svelte/store";
import type { IGraficoDep } from "../models/modelGrafico";

export const storeGrafic = writable<IGraficoDep>({});

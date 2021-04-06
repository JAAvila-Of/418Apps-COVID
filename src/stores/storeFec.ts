import { writable } from "svelte/store";
import cnf from "../../public/build/data/config.json";

export const storeFec = writable(cnf.ultimoCorte);

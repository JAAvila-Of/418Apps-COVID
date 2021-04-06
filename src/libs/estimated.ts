import estimaciones from "../../public/build/data/estimaciones.json";

export const estimate = (dep: string) => {
  return estimaciones[dep];
};

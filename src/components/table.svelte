<script lang="ts">
  import DataTable from "@fouita/data-table";
  import {
    poblacion,
    nombres,
  } from "../../public/build/data/departamentos.json";
  import deps from "../../public/build/data/finalDep.json";
  import { long } from "../libs/shortNumber";

  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  interface IDataDep {
    dep: string;
    p: string;
    d_p: string;
    d_p_p: string;
    d_t: string;
    d_t_p: string;
    p_dt_dp: string;
    p_n?: number;
    d_p_n?: number;
    d_t_n?: number;
    _class?: string;
  }

  let showTable: boolean = false;
  let showLabel: boolean = false;
  let innerWidth: number;

  let dataPre: Array<IDataDep> = [];
  let data: Array<IDataDep> = [];

  $: {
    for (let i = 0; i < nombres.length; i++) {
      const dep = nombres[i];

      let p_dt_dp =
        Number(((deps[dep].dosis2 / deps[dep].dosis1) * 100).toFixed(2)) + "%";

      dataPre = [
        ...dataPre,
        {
          dep,
          d_p: long(deps[dep].dosis1),
          d_p_p: deps[dep].d1_p + "%",
          d_t: long(deps[dep].dosis2),
          d_t_p: deps[dep].d2_p + "%",
          p: long(poblacion[dep]),
          p_dt_dp,
          p_n: poblacion[dep],
          d_p_n: deps[dep].dosis1,
          d_t_n: deps[dep].dosis2,
          _class:
            dep == "TOTAL"
              ? "bg-gray-400 semiflat:bg-opacity-80 normal:bg-opacity-80 dark:bg-black"
              : "hover:bg-gray-400 dark:hover:bg-gray-900  text-sm lg:text-base",
        },
      ];
    }

    data = [...dataPre];
  }

  $: {
    showTable = innerWidth >= 768 ? true : false;
    showLabel = innerWidth >= 768 ? false : true;
  }

  const sortFn = (label: string) => {
    /* let g = data.filter((value) => {
      return value.dep == "TOTAL" ? true : false;
    })[0]; */

    return {
      asc: () => {
        let g = data.filter((value) => {
          return value.dep == "TOTAL" ? true : false;
        })[0];
        data = data
          .filter((row) => {
            return row.dep == "TOTAL" ? false : true;
          })
          .sort((a, b) => (a[label] > b[label] ? 1 : -1));
        data.push(g);
      },
      desc: () => {
        let g = data.filter((value) => {
          return value.dep == "TOTAL" ? true : false;
        })[0];
        data = data
          .filter((row) => {
            return row.dep == "TOTAL" ? false : true;
          })
          .sort((a, b) => (a[label] < b[label] ? 1 : -1));
        data.push(g);
      },
    };
  };

  const head = {
    dep: {
      value: "Departamento",
      sort: sortFn("dep"),
    },
    p: {
      value: "Habitantes",
      sort: sortFn("p_n"),
    },
    d_p: {
      value: "Dosis Parcial",
      sort: sortFn("d_p_n"),
    },
    d_t: {
      value: "Dosis Total",
      sort: sortFn("d_t_n"),
    },
    d_p_p: {
      value: "% Parcial",
      sort: sortFn("d_p_p"),
    },
    d_t_p: {
      value: "% Total",
      sort: sortFn("d_t_p"),
    },
    p_dt_dp: {
      value: "% Total/Parcial",
      sort: sortFn("p_dt_dp"),
    },
  };

  const toggle = (e) => {
    e.preventDefault();
    showTable = showTable ? false : true;
  };
</script>

<svelte:window bind:innerWidth />

{#if showLabel}
  <div
    class="normal:bg-blur w-60 xs:w-10/12 normal:shadow semiflat:shadow semiflat:bg-opacity-10 normal:bg-opacity-10 semiflat:bg-gray-600 normal:bg-gray-600 mx-auto rounded-lg  mt-16 bg-gray-300 text-center h-auto py-4 px-3 dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
  >
    <div on:click={toggle} class="cursor-pointer">
      <span class=" text-2xl font-semibold">TABLA GENERAL</span>
      <span class=" float-right text-3xl place-self-center"
        >{showTable ? "-" : "+"}</span
      >
    </div>
  </div>
{/if}

{#if showTable}
  <div class={showLabel ? "" : "mt-16"} transition:slide={{ easing: quintOut }}>
    <DataTable {head} rows={data} stripped />
  </div>
{/if}

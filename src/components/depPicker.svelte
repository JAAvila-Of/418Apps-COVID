<script lang="ts">
  import { nombres } from "../../public/build/data/departamentos.json";
  import fechas from "../../public/build/data/finalFechas.json";

  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  import { storeDep } from "../stores/storeDep";
  import { storeDepEstimate } from "../stores/storeDepEstimate";
  import { storeDepChart } from "../stores/storeDepChart";
  import { storeFec } from "../stores/storeFec";

  let show: boolean = false;
  let dep: string = "PERÚ";
  let depSelected: string = "TOTAL";
  let base = [...nombres];

  export let store: number = 1;

  const toggle = (e) => {
    e.stopPropagation();
    if (show) {
      show = false;
      close;
      document.body.removeEventListener("click", close);
    } else {
      show = true;
      open;
      document.body.addEventListener("click", close);
    }
  };

  const close = () => {
    show = false;
  };

  const open = () => {
    show = true;
  };

  //document.body.addEventListener("click", close);

  const change = (e) => {
    toggle;
    if (dep === e.target.innerText) return;
    dep = e.target.innerText;
    depSelected = e.target.innerText;

    if (store === 1) {
      $storeDep = dep == "PERÚ" ? "TOTAL" : dep;
    } else if (store === 2) {
      $storeDepEstimate = dep == "PERÚ" ? "TOTAL" : dep;
    } else if (store === 3) {
      $storeDepChart = dep == "PERÚ" ? "TOTAL" : dep;
    }

    return true;
  };

  $: {
    if (store === 1) {
      if (fechas[$storeFec]) {
        base = Object.keys(fechas[$storeFec]).sort();
      }
    }
  }
</script>

<div class="relative   w-52">
  <div
    class="flex items-center justify-center h-10  mt-4 sm:mt-0 normal:bg-blur normal:shadow semiflat:shadow rounded-lg bg-gray-300 semiflat:bg-gray-600 normal:bg-gray-600 semiflat:bg-opacity-10 normal:bg-opacity-10 p-2 cursor-pointer dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
    on:click={toggle}
  >
    <div class="flex flex-row">
      <div class="text-gray-500 dark:text-gray-400 ml-1 uppercase">{dep}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        fill="none"
        class="h-6 w-6 text-gray-500 dark:text-gray-400 ml-3"
      >
        <path
          fill="currentColor"
          d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
          class=""
        />
      </svg>
    </div>
  </div>

  {#if show}
    <div
      class="absolute normal:bg-blur normal:shadow semiflat:shadow rounded-lg bg-gray-100   normal:bg-opacity-80  w-52 h-40 z-50 mt-1 dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
      transition:slide={{ easing: quintOut }}
    >
      <div class="overflow-hidden h-full w-full  rounded-lg">
        <div
          class="h-full w-full text-sm flex flex-col  overflow-auto text-center p-4 scroll-journal space-y-1"
        >
          {#each base as row}
            <span
              class="cursor-pointer hover:bg-opacity-50 hover:bg-yellow-600 rounded-full hover:shadow {row ==
              depSelected
                ? 'bg-yellow-600 bg-opacity-60 shadow'
                : ''}"
              on:click={change}>{row == "TOTAL" ? "PERÚ" : row}</span
            >
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>

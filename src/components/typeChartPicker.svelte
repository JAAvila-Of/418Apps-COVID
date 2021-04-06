<script lang="ts">
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  import { storeTypeChart } from "../stores/storeTypeChart";

  let show: boolean = false;
  let selected: string = "Acumulados";

  let base = ["Acumulados", "Diarios"];

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

  const change = (e) => {
    toggle;
    if (selected === e.target.innerText) return;

    selected = e.target.innerText;

    $storeTypeChart = selected === "Acumulados" ? 1 : 2;

    return true;
  };
</script>

<div class="relative   w-52">
  <div
    class="flex items-center justify-center h-10  mt-4 sm:mt-0 normal:bg-blur  normal:shadow semiflat:shadow rounded-lg bg-gray-300 semiflat:bg-gray-600 normal:bg-gray-600 semiflat:bg-opacity-10 normal:bg-opacity-10 p-2 cursor-pointer dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
    on:click={toggle}
  >
    <div class="flex flex-row">
      <div class="text-gray-500 dark:text-gray-400 ml-1 ">{selected}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="none"
        class="h-6 w-6 text-gray-500 dark:text-gray-400 ml-3"
        ><path
          fill="currentColor"
          d="M500 384c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v308h436zM372.7 159.5L288 216l-85.3-113.7c-5.1-6.8-15.5-6.3-19.9 1L96 248v104h384l-89.9-187.8c-3.2-6.5-11.4-8.7-17.4-4.7z"
        /></svg
      >
    </div>
  </div>

  {#if show}
    <div
      class="absolute  rounded-lg bg-gray-100 normal:bg-opacity-80 normal:bg-blur  normal:shadow semiflat:shadow w-52 h-20 z-50 mt-1 dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
      transition:slide={{ easing: quintOut }}
    >
      <div
        class="h-full w-full text-sm flex flex-col   text-center p-4 space-y-1"
      >
        {#each base as row}
          <span
            class="cursor-pointer text-base hover:bg-opacity-50 hover:bg-yellow-600 rounded-full hover:shadow {row ==
            selected
              ? 'bg-yellow-600 bg-opacity-60 shadow'
              : ''}"
            on:click={change}>{row == "TOTAL" ? "PERÚ" : row}</span
          >
        {/each}
      </div>
    </div>
  {/if}
</div>

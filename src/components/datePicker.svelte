<script lang="ts">
  import Datepicker from "./DatePicker/Datepicker.svelte";
  import { ultimoCorte } from "../../public/build/data/config.json";
  import depFecha from "../../public/build/data/depPrimeraFecha.json";

  import { storeFec } from "../stores/storeFec";
  import { storeDep } from "../stores/storeDep";

  import day from "dayjs";
  import customFormat from "dayjs/plugin/customParseFormat";
  import "dayjs/locale/es";

  day.extend(customFormat);

  const endDateShow = day(ultimoCorte, "YYYYMMDD")
    .locale("es")
    .format("DD MMM, YYYY");
  const endDate = new Date(day(ultimoCorte, "YYYYMMDD").format("MM/DD/YYYY"));

  let dateChosen;
  let formattedSelected;
  let fecForStore;
  let startDate = new Date("02/09/2021");

  $: {
    $storeFec = fecForStore;
    startDate = new Date(depFecha[$storeDep]);
  }
</script>

<Datepicker
  bind:dateChosen
  bind:formattedSelected
  bind:fecForStore
  start={startDate}
  end={endDate}
  selected={endDate}
>
  <div class=" flex justify-center font-circularmedium text-lg cursor-pointer">
    <div
      class="flex self-center items-center h-10 w-44 normal:bg-blur normal:shadow semiflat:shadow p-2 rounded-lg bg-gray-300 semiflat:bg-gray-600 normal:bg-gray-600 semiflat:bg-opacity-10 normal:bg-opacity-10 dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
    >
      <div class="text-gray-500 dark:text-gray-400 ml-2 capitalize">
        {#if dateChosen} {formattedSelected} {:else} {endDateShow} {/if}
      </div>
      <svg
        class="h-6 w-6 text-gray-500 mx-auto dark:text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  </div>
</Datepicker>

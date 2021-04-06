<script lang="ts">
  import Progress from "../components/progress.svelte";
  import { storeDataDep } from "../stores/storeData";
  import { shuffle } from "../libs/shuffleText";

  let progressComponentParcial: Progress;
  let progressComponentTotal: Progress;

  export const updateData = (parcial: number, total: number) => {};

  $: {
    if (progressComponentParcial && progressComponentTotal) {
      progressComponentParcial.changeProgress($storeDataDep.g_parcial);
      progressComponentTotal.changeProgress($storeDataDep.g_total);
    }
  }
</script>

<div
  class="grid grid-cols-1 sm:grid-cols-3 gap-5 w-60 xs:w-10/12 lg:w-limit mt-5  mx-auto"
>
  <div
    class="normal:bg-blur font-semibold flex items-center  normal:shadow semiflat:shadow semiflat:bg-opacity-20 normal:bg-opacity-20 rounded-lg p-2 semiflat:bg-gray-600 normal:bg-gray-600 bg-gray-300 text-center dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
  >
    <div class="w-full">
      <div class="uppercase text-xl">
        dosis parcial <span class="text-xs align-top font-normal">[1]</span>
      </div>
      <div
        class="text-3xl mt-1"
        id="r2-dp"
        data-random={shuffle($storeDataDep.dosis_parcial, "r2-dp")}
      >
        {$storeDataDep.dosis_parcial}
      </div>
      <div class="uppercase text-sm mt-4">
        % sobre entregadas <span class="text-xs align-top font-normal">[9]</span
        >
      </div>
      <div
        class="text-2xl mt-1"
        id="r2-pe"
        data-random={shuffle($storeDataDep.p_parcial, "r2-pe")}
      >
        {$storeDataDep.p_parcial}
      </div>
    </div>
  </div>
  <div
    class="normal:bg-blur text-center font-semibold flex items-center justify-center normal:shadow semiflat:shadow semiflat:bg-opacity-20 normal:bg-opacity-20 rounded-lg p-2 semiflat:bg-gray-600 normal:bg-gray-600 bg-gray-300 dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
  >
    <div class="w-full">
      <div class="uppercase text-xl">
        dosis total <span class="text-xs align-top font-normal">[2]</span>
      </div>
      <div
        class="text-3xl mt-1"
        id="r2-dt"
        data-random={shuffle($storeDataDep.dosis_total, "r2-dt")}
      >
        {$storeDataDep.dosis_total}
      </div>
      <div class="uppercase text-sm mt-4">
        % sobre parcial <span class="text-xs align-top font-normal">[10]</span>
      </div>
      <div
        class="text-2xl mt-1"
        id="r2-pp"
        data-random={shuffle($storeDataDep.p_total, "r2-pp")}
      >
        {$storeDataDep.p_total}
      </div>
    </div>
  </div>
  <div
    class="normal:bg-blur font-semibold   normal:shadow semiflat:shadow semiflat:bg-opacity-20 normal:bg-opacity-20 rounded-lg py-2 px-4 semiflat:bg-gray-600 normal:bg-gray-600 bg-gray-300 text-center dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
  >
    <div class="uppercase text-xl">población</div>
    <div class="flex justify-center items-center flex-col  w-full">
      <div class="w-full h-12 mt-4">
        <Progress
          bind:this={progressComponentParcial}
          defaultValue={$storeDataDep.g_parcial}
        />
        <div class="uppercase  text-xs">dosis parcial</div>
      </div>
      <div class="w-full h-12">
        <Progress
          bind:this={progressComponentTotal}
          foreColor="bg-indigo-400"
          backColor="bg-indigo-600"
          defaultValue={$storeDataDep.g_total}
        />
        <div class="uppercase  text-xs">dosis total</div>
      </div>
      <div>
        <span
          class="text-lg mt-3"
          id="r2-h"
          data-random={shuffle($storeDataDep.habitantes, "r2-h")}
          >{$storeDataDep.habitantes}</span
        >
        <span class="capitalize text-xs">habitantes</span>
      </div>
    </div>
  </div>
</div>

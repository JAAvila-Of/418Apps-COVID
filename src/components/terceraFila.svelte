<script lang="ts">
  import { storeEstimated } from "../stores/storeEstimated";
  import { storeDepEstimate } from "../stores/storeDepEstimate";
  import estimaciones from "../../public/build/data/estimaciones.json";
  import { shuffle } from "../libs/shuffleText";

  $: {
    try {
      $storeEstimated = estimaciones[$storeDepEstimate];
    } catch (e) {
      console.log(e);
    }
  }
</script>

<div
  class="grid grid-cols-1 gap-5 mt-3 sm:grid-cols-3 w-60 xs:w-10/12 lg:w-limit   mx-auto h-auto text-center "
>
  <div
    class="normal:bg-blur font-semibold normal:shadow semiflat:shadow  rounded-lg py-5 bg-gray-300 semiflat:bg-gray-600 normal:bg-gray-600 semiflat:bg-opacity-20 normal:bg-opacity-20 dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
  >
    <div class="text-5xl text-yellow-600 normal:text-shadow-md">50%</div>
    <div
      class="text-gray-600 dark:text-gray-400 capitalize"
      id="r3-50"
      data-random={shuffle($storeEstimated._50, "r3-50")}
    >
      {$storeEstimated._50}
    </div>
  </div>
  <div
    class="normal:bg-blur font-semibold normal:shadow semiflat:shadow  rounded-lg py-5 bg-gray-300 semiflat:bg-gray-600 normal:bg-gray-600 semiflat:bg-opacity-20 normal:bg-opacity-20 dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
  >
    <div class="text-5xl text-green-500 normal:text-shadow-md">75%</div>
    <div
      class="text-gray-600 dark:text-gray-400 capitalize"
      id="r3-75"
      data-random={shuffle($storeEstimated._75, "r3-75")}
    >
      {$storeEstimated._75}
    </div>
  </div>
  <div
    class="normal:bg-blur font-semibold normal:shadow semiflat:shadow   rounded-lg py-5 bg-gray-300 semiflat:bg-gray-600 normal:bg-gray-600 semiflat:bg-opacity-20 normal:bg-opacity-20 dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
  >
    <div class="text-5xl text-green-700  normal:text-shadow-md">100%</div>
    <div
      class="text-gray-600 dark:text-gray-400 capitalize"
      id="r3-100"
      data-random={shuffle($storeEstimated._100, "r3-100")}
    >
      {$storeEstimated._100}
    </div>
  </div>
</div>

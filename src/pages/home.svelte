<script lang="ts">
  import { onMount } from "svelte";

  import type { IDataResultFab } from "../models/fabData";

  import { storeFab } from "../stores/storeFab";
  import { storeDep } from "../stores/storeDep";
  import { storeFec } from "../stores/storeFec";
  import { storeDataDep } from "../stores/storeData";
  import { storeEstimated } from "../stores/storeEstimated";
  import { storeDepEstimate } from "../stores/storeDepEstimate";

  import cnf from "../../public/build/data/config.json";

  import day from "dayjs";
  import "dayjs/locale/es";
  import relativeTime from "dayjs/plugin/relativeTime";
  import customFormat from "dayjs/plugin/customParseFormat";

  import { convert as convertDataFab } from "../libs/convertDataFab";
  import * as convertNumber from "../libs/shortNumber";
  import { mainDep } from "../libs/generateDataDep";
  import { estimate } from "../libs/estimated";
  import { setClass } from "../libs/verifyPerformance";
  import { shuffle } from "../libs/shuffleText";

  import ChartArea from "../components/chartArea.svelte";
  import Table from "../components/table.svelte";
  import SegundaFila from "../components/segundaFila.svelte";
  import TerceraFila from "../components/terceraFila.svelte";
  import News from "../components/news.svelte";
  import Definitions from "../components/definitions.svelte";
  import DatePicker from "../components/datePicker.svelte";
  import DepPicker from "../components/depPicker.svelte";
  import TypePicker from "../components/typeChartPicker.svelte";
  import ToggleDark from "../components/toggle_night.svelte";
  import SvgBmc from "../components/svg_bmc.svelte";
  import ArrowUp from "../components/svg_arrowHome.svelte";
  import { Scroll } from "../libs/scrollOut";

  day.extend(customFormat);
  day.extend(relativeTime);

  let sf: SegundaFila;
  let innerWidth;
  let innerHeight;
  let loadedTime;
  let timeInitial = new Date();

  let dataFab1Row: Array<IDataResultFab>;
  let fabs: Array<string>;

  let w_md: boolean = false;

  setClass();

  onMount(() => {
    Scroll();
  });

  window.addEventListener("load", () => {
    let timeEnd = new Date();
    loadedTime = timeEnd.getTime() - timeInitial.getTime();
  });

  let cht: ChartArea;

  (() => {
    dataFab1Row = convertDataFab();
    fabs = Object.keys(dataFab1Row).reverse();

    $storeDataDep = mainDep($storeFec, $storeDep);
    $storeEstimated = estimate($storeDepEstimate);
    if (window.innerWidth >= 768) {
      w_md = true;
    } else {
      w_md = false;
    }
  })();

  let ago: string = day(cnf.fechaActualizacion).locale("es").fromNow();

  let t: boolean = false;
  let timeAgo: string = ago;

  const changeFabData = (e): MouseEvent => {
    $storeFab = e.target.id;
    return;
  };

  $: {
    $storeDataDep = mainDep($storeFec, $storeDep);
  }
</script>

<svelte:window
  on:resize={() => {
    if (window.innerWidth >= 768) {
      w_md = true;
    } else {
      w_md = false;
    }
  }}
  bind:innerWidth
  bind:innerHeight
/>

<main class="p-5 font-circular text-gray-700 dark:text-gray-300">
  <div>
    <div class="sticky top-4 z-50">
      <ToggleDark />
    </div>
    <div class="fixed bottom-4 right-2 md:right-8 md:bottom-8 z-50">
      <ArrowUp />
    </div>
    <section class="text-center mt-10" data-scroll>
      <div class="uppercase text-4xl sm:text-5xl font-circularbold">
        vacunación covid-19 en perú
      </div>
      <div class="mt-5 text-sm dark:text-gray-400">
        Datos Actualizados
        <span class=" border-bottom border-black font-bold">{timeAgo}</span>.
        Fuente:
        <a
          href="https://www.datosabiertos.gob.pe/dataset/vacunaci%C3%B3n-contra-covid-19-ministerio-de-salud-minsa"
          target="_blank">Ministerio de Salud</a
        >
      </div>
      <div class=" flex justify-center font-circularmedium text-lg mt-5">
        <div class="flex flex-col sm:flex-row sm:space-x-4 relative">
          <div
            class="flex self-center items-center h-10 w-48 normal:bg-blur semiflat:shadow-lg normal:shadow-lg p-2 rounded-lg bg-gray-300 semiflat:bg-opacity-20 normal:bg-opacity-20 semiflat:bg-gray-600 normal:bg-gray-600 dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-opacity-80 dark:semiflat:bg-gray-800 dark:bg-gray-800"
          >
            <!-- <img src="./build/assets/bmc.png" class=" h-7 w-5" alt="vacunas1" /> -->
            <SvgBmc />
            <div class="text-gray-600 ml-3 dark:text-gray-400">
              Invítame un Café
            </div>
          </div>
          <a
            href="https://www.buymeacoffee.com/jaavila"
            target="_blank"
            class="absolute inset-0"><div /></a
          >
        </div>
      </div>
    </section>

    <section class="mt-7">
      <div class="grid grid-cols-1 gap-2  w-full">
        <!-- PRIMER LINEA DEL GRID -->
        <div
          class="grid grid-cols-1 sm:grid-cols-5 sm:gap-4 sm:h-60  w-60 xs:w-10/12  lg:w-limit mx-auto"
          data-scroll
        >
          <div
            class="p-2 text-center font-semibold relative normal:bg-blur normal:shadow semiflat:shadow semiflat:bg-opacity-20 normal:bg-opacity-20 rounded-lg bg-gray-300 col-span-2 semiflat:bg-gray-600 normal:bg-gray-600 dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
          >
            <div class="grid grid-cols-1">
              <div class=" col-span-1">
                <div class="uppercase mt-2">
                  dosis solicitadas <span class="text-xs align-top font-normal"
                    >[3]</span
                  >
                </div>
                <div
                  class="text-4xl"
                  id="r1-ds"
                  data-random={shuffle(
                    convertNumber.generate(dataFab1Row[$storeFab].v_s),
                    "r1-ds"
                  )}
                >
                  {convertNumber.generate(dataFab1Row[$storeFab].v_s)}
                </div>
                <div class="uppercase mt-4">
                  dosis entregadas <span class="text-xs align-top font-normal"
                    >[4]</span
                  >
                </div>
                <div
                  class="text-4xl"
                  id="r1-de"
                  data-random={shuffle(
                    convertNumber.generate(dataFab1Row[$storeFab].v_e),
                    "r1-de"
                  )}
                >
                  {convertNumber.generate(dataFab1Row[$storeFab].v_e)}
                </div>
                <div class="flex w-full justify-center">
                  <hr class=" w-6/12  border-gray-400 my-2" />
                </div>
                <div class="uppercase text-xs">
                  % dosis entregadas <span class="text-xs align-top font-normal"
                    >[7]</span
                  >
                </div>
                <div
                  class="text-3xl"
                  id="r1-pe"
                  data-random={shuffle(dataFab1Row[$storeFab].p_e, "r1-pe")}
                >
                  {dataFab1Row[$storeFab].p_e}
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-span-1 rounded-lg bg-gray-200 sm:py-2 normal:bg-blur overflow-hidden normal:shadow semiflat:shadow mt-3 sm:mt-0 semiflat:bg-opacity-10 normal:bg-opacity-10 semiflat:bg-gray-600 normal:bg-gray-600 dark:normal:bg-gray-700 dark:normal:bg-opacity-70 dark:semiflat:bg-gray-700 dark:semiflat:bg-opacity-70 dark:bg-gray-700"
          >
            <div
              class="overflow-auto flex justify-center sm:h-full scroll-journal"
            >
              <div
                class="flex  items-center justify-center h-full sm:h-60 w-11/12 sm:w-full"
              >
                <div
                  class=" flex flex-row sm:flex-col sm:space-y-2  text-xs uppercase justify-around w-full h-full font-semibold"
                >
                  {#each fabs as fab}
                    <div
                      class="h-16 w-16 sm:w-full flex flex-col justify-center relative items-center text-center"
                      id={fab}
                    >
                      <img
                        src={dataFab1Row[fab].logo}
                        class=" h-8 w-8 mb-1"
                        alt="{fab}_logo"
                      />
                      <span class="hidden sm:grid">
                        {fab}
                      </span>
                      <div
                        class="absolute inset-0 cursor-pointer"
                        id={fab}
                        on:click={changeFabData}
                      />
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
          <div
            class=" h-60 sm:h-full col-span-2 p-2 normal:bg-blur normal:shadow semiflat:shadow  rounded-lg semiflat:bg-opacity-20 normal:bg-opacity-20 mt-3 sm:mt-0 bg-gray-300 relative semiflat:bg-gray-600 normal:bg-gray-600 dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
          >
            <div class="h-full">
              <div class=" text-center font-semibold">
                <div class="flex  items-center justify-center h-full">
                  <div class="">
                    <div class=" uppercase text-2xl">
                      {$storeFab}
                    </div>
                    <div class="uppercase text-base mt-4">
                      dosis entregadas <span
                        class="text-xs align-top font-normal">[4]</span
                      >
                    </div>
                    <div
                      class="text-2xl"
                      id="r1-ve"
                      data-random={shuffle(
                        convertNumber.generate(dataFab1Row[$storeFab].v_e),
                        "r1-ve"
                      )}
                    >
                      {convertNumber.generate(dataFab1Row[$storeFab].v_e)}
                    </div>
                    <div class="uppercase text-base mt-2">
                      dosis aplicadas <span
                        class="text-xs align-top font-normal">[5]</span
                      >
                    </div>
                    <div
                      class="text-2xl"
                      id="r1-va"
                      data-random={shuffle(
                        convertNumber.generate(dataFab1Row[$storeFab].v_a),
                        "r1-va"
                      )}
                    >
                      {convertNumber.generate(dataFab1Row[$storeFab].v_a)}
                    </div>
                    <div class="uppercase text-xs mt-2">
                      % dosis aplicadas <span
                        class="text-xs align-top font-normal">[8]</span
                      >
                    </div>
                    <div
                      class="text-2xl"
                      id="r1-pa"
                      data-random={shuffle(dataFab1Row[$storeFab].p_a, "r1-pa")}
                    >
                      {dataFab1Row[$storeFab].p_a}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- FIN PRIMER LINEA DEL GRID -->
        <div data-scroll>
          <div class=" flex justify-center font-circularmedium text-lg mt-16">
            <div class="flex flex-col sm:flex-row sm:space-x-4 ">
              <DatePicker />
              <DepPicker store={1} />
            </div>
          </div>
          <!-- SEGUNDA LINEA DEL GRID -->
          <SegundaFila bind:this={sf} />
          <!-- FIN SEGUNDA LINEA DEL GRID -->
        </div>
        <div data-scroll>
          <div class="uppercase text-3xl text-center  font-semibold  mt-16">
            <div>
              estimaciones <span class="text-xs align-top font-normal"
                >[12]</span
              >
            </div>
            <div class="flex justify-center">
              <div class="w-5/6 text-xs normal-case sm:text-sm">
                El cálculo de las ESTIMACIONES están basadas en el porcentaje de
                personas con dosis completa del total de habitantes.
              </div>
            </div>
          </div>
          <div
            class="flex justify-center w-full font-circularmedium text-lg mt-4"
          >
            <DepPicker store={2} />
          </div>
          <!-- TERCERA LINEA DEL GRID -->
          <TerceraFila />
          <!-- FIN TERCERA LINEA DEL GRID -->
        </div>
        <div data-scroll>
          <div class="uppercase text-3xl text-center  font-semibold  mt-16">
            <div>gráfico</div>
          </div>
          <div class=" flex justify-center font-circularmedium text-lg mt-3">
            <div class="flex flex-col sm:flex-row sm:space-x-4 ">
              <TypePicker />
              <DepPicker store={3} />
            </div>
          </div>
          <!-- CUARTA LINEA DEL GRID -->
          <div
            class="normal:bg-blur scroll font-semibold w-60 h-96 xs:w-10/12 lg:w-limit normal:shadow semiflat:shadow semiflat:bg-opacity-20 normal:bg-opacity-20 semiflat:bg-gray-600 normal:bg-gray-600 mx-auto rounded-lg py-5 mt-5 bg-gray-300 capitalize dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800 "
          >
            <ChartArea cls="font-circular" bind:this={cht} />
          </div>
          <!-- FIN CUARTA LINEA DEL GRID -->
        </div>
        <!-- QUINTA LINEA DEL GRID -->
        <div class="space-y-2 md:space-y-0" data-scroll>
          <Table />
        </div>
        <!-- FIN QUINTA LINEA DEL GRID -->
        <div data-scroll>
          <div class="mt-16 text-3xl text-center  font-semibold ">NOTICIAS</div>
          <!-- SEXTA LINEA DEL GRID -->
          <News />
          <!-- FIN SEXTA LINEA DEL GRID -->
        </div>
        <!-- SEPTIMA LINEA DEL GRID -->
        <div class="text-center mt-16" data-scroll>
          <span class="text-3xl font-semibold"> ENLACES </span>
          <div
            class="mt-3 flex flex-col md:text-xl dark:text-gray-400 text-gray-600"
          >
            <div>
              <a
                class="border-b-2 border-gray-900 dark:border-gray-400 border-dashed  "
                href="https://www.minsa.gob.pe/vacuna-covid-19/"
                target="_blank"
                >Plan Nacional de Vacunación contra la COVID-19</a
              >
            </div>
            <div class="mt-2">
              <a
                class="border-b-2 border-gray-900 dark:border-gray-400 border-dashed "
                href="https://gis.minsa.gob.pe/GisVisorVacunados/"
                target="_blank">Progreso de Vacunados - APP MINSA</a
              >
            </div>
          </div>
        </div>
        <!-- FIN SEPTIMA LINEA DEL GRID -->
        <div data-scroll>
          <Definitions />
        </div>
      </div>
    </section>
  </div>
</main>
<footer
  class="normal:bg-blur w-full h-auto  mx-auto rounded-lg  mt-16 bg-gray-300 semiflat:bg-opacity-20 normal:bg-opacity-20 semiflat:bg-gray-600 normal:bg-gray-600 text-center relative py-7 sm:py-10 dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800 dark:text-gray-300"
>
  <div
    class="flex flex-col sm:flex-row sm:justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-sm"
  >
    <a
      href="/#"
      class="border-b-2 mx-auto sm:mx-1 border-gray-900 dark:border-gray-400 border-dashed"
    >
      Desarrollado por JAAvila</a
    >
    <span class="hidden sm:block">•</span>
    <a
      href="https://github.com/JAAvila-Of"
      target="_blank"
      class="border-b-2 mx-auto sm:mx-1 border-gray-900 dark:border-gray-400 border-dashed"
    >
      GitHub</a
    >
    <span class="hidden sm:block">•</span>
    <a
      href="https://www.instagram.com/jaavila_of/"
      target="_blank"
      class="border-b-2 mx-auto sm:mx-1 border-gray-900 dark:border-gray-400 border-dashed"
    >
      Instagram</a
    >
    <span class="hidden sm:block">•</span>
    <a
      href="https://twitter.com/JoseAngelAvil18"
      target="_blank"
      class="border-b-2 mx-auto sm:mx-1 border-gray-900 dark:border-gray-400 border-dashed"
    >
      Twitter</a
    >
  </div>
</footer>

<style>
  .border-bottom {
    border-bottom: 1px dashed;
  }
</style>

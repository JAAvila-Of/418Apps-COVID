<script lang="ts">
  import def from "../../public/build/data/definiciones.json";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  let show: boolean = false;

  const toggle = () => {
    if (show) {
      show = false;
      return;
    }
    show = true;
  };
</script>

<div
  class="normal:bg-blur w-60 xs:w-10/12 md:w-1/2 lg:w-5/12 xl:w-news normal:shadow semiflat:shadow mx-auto rounded-lg  mt-16 bg-gray-300 semiflat:bg-opacity-20 normal:bg-opacity-20 semiflat:bg-gray-600 normal:bg-gray-600 text-center h-auto py-4 px-3 dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
>
  <div on:click={toggle} class="cursor-pointer ">
    <span class=" text-3xl font-semibold">DEFINICIONES</span>
    <span class=" float-right text-3xl self-center">{show ? "-" : "+"}</span>
  </div>
  {#if show}
    <div class="text-left mt-4 " transition:slide={{ easing: quintOut }}>
      <ol class="list-decimal list-inside space-y-2">
        {#each def as d}
          <li>
            <span class="font-semibold">{d.name}</span>:
            <span class="text-sm">{d.description}</span>
          </li>
        {/each}
      </ol>
    </div>
  {/if}
</div>

<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  export let foreColor: string = "bg-blue-400";
  export let backColor: string = "bg-blue-600";
  export let defaultValue: number = 0;

  export const changeProgress = (f: number) => {
    progress.set(f);
  };

  //$progress * 100 < 15 ? 15 : $progress * 100

  const progress = tweened(defaultValue, {
    duration: 400,
    easing: cubicOut,
  });
</script>

<div
  class="w-full block rounded-full {foreColor} relative h-6 overflow-hidden shadow"
>
  <div
    class="rounded-full {backColor}  h-full "
    style="width:{$progress * 100}%"
  />
  <div class="absolute right-2 inset-y-0 text-gray-200 font-normal">
    {Number(($progress * 100).toFixed(2))}%
  </div>
</div>

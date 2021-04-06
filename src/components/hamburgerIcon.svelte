<script lang="ts">
  export let show: boolean = false;

  const toggle = () => {
    show = !show;
    console.log(show);
  };
</script>

<div class="relative h-10 w-10 text-gray-500" on:click={toggle}>
  <div
    class="w-5 absolute left-1/2 top-1/2 block transform -translate-x-1/2 -translate-y-1/2"
  >
    <span
      class="block h-0.5 w-5 absolute bg-current transform transiton duration-300 ease-in-out {show
        ? 'rotate-45'
        : '-translate-y-1.5'}"
    />
    <span
      class="block h-0.5 w-5 absolute bg-current transform transiton duration-300 ease-in-out {show
        ? 'opacity-0 -translate-x-4'
        : 'opacity-100 -translate-x-0'}"
    />
    <span
      class="block h-0.5 w-5 absolute bg-current transform transiton duration-300 ease-in-out {show
        ? '-rotate-45'
        : 'translate-y-1.5'}"
    />
  </div>
</div>

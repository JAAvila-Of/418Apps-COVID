<script lang="ts">
  import Index from "./routes/index.svelte";
</script>

<Index />

<style global>
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss stop ignore */
  @tailwind utilities;

  @layer utilities {
    .text-shadow-md {
      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
    }
  }
</style>

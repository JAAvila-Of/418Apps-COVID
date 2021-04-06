<script lang="ts">
  import ArrowDownIcon from "./icons/ArrowDown.svelte";
  import ArrowUpIcon from "./icons/ArrowUp.svelte";

  interface IDataDep {
    dep: string;
    p: string;
    d_p: string;
    d_p_p: string;
    d_t: string;
    d_t_p: string;
    p_dt_dp: string;
    p_n?: number;
    d_p_n?: number;
    d_t_n?: number;
    _class?: string;
  }

  export let stripped = false;
  export let hover = false;

  export let head = {};

  export let rows: Array<IDataDep> = [];

  // get string or object value
  function val(attr) {
    if (attr === undefined || attr === null) return "";
    if (typeof attr === "object") return attr.value || "";
    return attr;
  }

  function isCmp(attr) {
    return (
      (typeof attr === "object" && typeof attr.value === "function") ||
      typeof attr === "function"
    );
  }

  function props(attr) {
    if (typeof attr === "object") return attr.props || {};
    return {};
  }

  function classes(attr) {
    if (typeof attr === "object") return attr._class || "";
    return "";
  }

  // exclude _class
  function keys(obj) {
    return Object.keys(obj).filter((k) => k != "_class");
  }

  function mergeClass(c1, c2) {
    return c1
      .split(" ")
      .filter((c) => c.split("-")[0] && ~c.split("-")[0].indexOf(c2))
      .join(" ");
  }

  // override with head and default classes class
  function rowClasses(row) {
    const default_class = "";
    const row_class = classes(row);
    const head_class = classes(head);
    let res_class = default_class;

    if (row_class !== "") {
      res_class = mergeClass(default_class, row_class);
    }
    res_class += " " + row_class;
    // TODO Need to test it !!
    if (head_class !== "") {
      res_class += " " + mergeClass(head_class, res_class);
    }

    return res_class;
  }

  function colClasses(row, h) {
    const col_class = classes(row[h]);
    const head_class = classes(head[h]);
    let res_class = head_class;
    if (col_class != "") {
      res_class = mergeClass(head_class, col_class);
    }
    return `${res_class} ${col_class}`;
  }

  let sorted_by;
  let sorted_asc = {};
  function sort(h) {
    if (sorted_asc[h]) {
      head[h].sort.desc();
      sorted_asc[h] = false;
    } else {
      head[h].sort.asc();
      sorted_asc[h] = true;
    }
    sorted_by = h;
  }
</script>

<table
  class="table-auto normal:bg-blur w-60 xs:w-10/12 lg:w-limit normal:shadow semiflat:shadow mx-auto rounded-lg py-5 bg-gray-300 semiflat:bg-opacity-10 normal:bg-opacity-10 semiflat:bg-gray-600 normal:bg-gray-600 text-center dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
>
  <thead
    class="md:table-header-group hidden border-b border-dashed border-gray-600  {!stripped
      ? 'bg-gray-100 '
      : ''}
    text-center font-semibold uppercase  text-sm text-gray-700 "
  >
    <tr class={classes(head)}>
      {#each keys(head) as h}
        <td
          class="p-2 {classes(
            head[h]
          )} sticky top-0 dark:text-gray-200 dark:bg-black bg-gray-400 "
        >
          {#if head[h].sort}
            <div
              class="cursor-pointer justify-center flex"
              on:click={() => sort(h)}
            >
              {#if sorted_by == h}
                {#if sorted_asc[h]}
                  <ArrowDownIcon class="w-5 p-1" />
                {:else}
                  <ArrowUpIcon class="w-5 p-1" />
                {/if}
              {/if}
              {val(head[h])}
            </div>
          {:else}{val(head[h])}{/if}
        </td>
      {/each}
    </tr>
  </thead>

  <tbody>
    {#each rows as row, i}
      <tr
        class="hidden md:table-row bg-opacity-25 {hover
          ? 'hover:bg-blue-200 '
          : ''}
        {stripped && i % 2 == 0
          ? 'bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-900 '
          : ''}
        {rowClasses(row)}"
      >
        {#each keys(head) as h}
          <td class="md:table-cell hidden p-2 {colClasses(row, h)}">
            {#if isCmp(row[h])}
              <svelte:component this={val(row[h])} {...props(row[h])} />
            {:else}{val(row[h])}{/if}
          </td>
        {/each}
      </tr>
      <tr class=" md:hidden">
        {#each keys(head) as h}
          <tr
            class="md:hidden p-2 {stripped && i % 2 == 0
              ? 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
              : ''}
            {rowClasses(row)}"
          >
            <th
              class="p-2 uppercase text-xs text-gray-600 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 "
            >
              {val(head[h])}
            </th>
            <td class="p-2 w-full {colClasses(row, h)}">
              {#if isCmp(row[h])}
                <svelte:component this={val(row[h])} {...props(row[h])} />
              {:else}{val(row[h])}{/if}
            </td>
          </tr>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

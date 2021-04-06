<script lang="ts">
  import news from "../../public/build/data/finalNews.json";
</script>

{#each news as item}
  <div
    class="normal:bg-blur font-semibold w-60 xs:w-10/12 md:w-1/2 lg:w-5/12 xl:w-news normal:shadow semiflat:shadow  mx-auto rounded-lg  mt-4 bg-gray-300 semiflat:bg-opacity-20 normal:bg-opacity-20 semiflat:bg-gray-600 normal:bg-gray-600 text-center h-auto relative dark:normal:bg-gray-800 dark:normal:bg-opacity-80 dark:semiflat:bg-gray-800 dark:semiflat:bg-opacity-80 dark:bg-gray-800"
  >
    <a class="absolute inset-0" href={item.link} target="_blank"><div /></a>
    <div class="grid grid-cols-8  h-full w-full  ">
      <div class="col-span-5 text-left flex  items-center h-full">
        <div>
          <div class="mt-3 px-2">
            <span class="text-xs sm:text-sm font-semibold leading-3"
              >{item.title}</span
            >
          </div>
          <div
            class="flex flex-row text-xs pb-2 font-normal mt-1 text-gray-500 px-2"
          >
            <span>{item.source}</span>
            <span class="ml-2">{item.time}</span>
          </div>
        </div>
      </div>
      <div class="col-span-3 flex items-center justify-center">
        <div class="w-20 h-20 shadow-lg my-4 rounded-lg">
          <img
            class="w-full h-full object-cover rounded-lg"
            src={item.image}
            alt="news_{item.source}"
          />
        </div>
      </div>
    </div>
  </div>
{/each}

<div
  class="font-semibold w-60 xs:w-10/12 md:w-1/2 lg:w-5/12 xl:w-news mx-auto mt-4 px-4 text-right h-auto "
>
  <a
    href="https://news.google.com/search?q=vacuna%20covid%20peru%20when%3A5d&hl=es-419&gl=PE&ceid=PE%3Aes-419"
    target="_blank">...ver más</a
  >
</div>

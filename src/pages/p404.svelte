<script lang="ts">
  import { storeDarkMode } from "../stores/storeDarkMode";
  import { navigate } from "svelte-routing";

  import Footer from "../components/footer.svelte";

  (() => {
    if (localStorage.getItem("_theme") == "dark") {
      const root = document.getElementsByTagName("html")[0];
      root.classList.add("dark");
      $storeDarkMode = true;
    }
  })();

  const inicio = () => {
    navigate("/", { replace: true });
  };
</script>

<section class="px-4 py-24 mx-auto max-w-7xl h-screen">
  <div
    class="grid items-center w-full grid-cols-1 gap-10 mx-auto md:w-4/5 lg:grid-cols-2 xl:gap-32 h-full"
  >
    <div>
      <p
        class="mb-2 text-sm font-semibold tracking-wide text-gray-500 uppercase"
      >
        Error 404
      </p>
      <h1
        class="mb-4 text-3xl font-extrabold leading-tight tracking-tight lg:text-left text-gray-900 dark:text-gray-200 md:text-5xl text-center"
      >
        Upss! La página buscada ya no está aquí.
      </h1>
      <p
        class="mb-5 text-base lg:text-left text-center text-gray-800 dark:text-gray-400 md:text-xl"
      >
        Quizá esté mal escrita la URL, o ya no se encuentre disponible.
      </p>
      <div
        class="grid grid-cols-2 gap-3  text-gray-200 sm:w-10/12 mx-auto lg:mx-0"
      >
        <div
          class="cursor-pointer h-12 flex justify-center items-center col-span-1 bg-gray-700 rounded-lg "
          on:click={inicio}
        >
          <div>Inicio</div>
        </div>
        <div
          class="cursor-pointer col-span-1 h-12 flex justify-center items-center bg-gray-800 hover:bg-gray-700 rounded-lg "
        >
          <div>Contáctanos</div>
        </div>
      </div>
    </div>
    <div>
      <!-- <div class="w-full h-full py-48 bg-gray-200 rounded-lg mb-10 lg:mb-0" /> -->
      <img src="./build/assets/404.svg" alt="404" />
    </div>
  </div>
</section>
<Footer />

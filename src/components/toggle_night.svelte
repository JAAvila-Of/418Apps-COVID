<script>
  import { storeDarkMode } from "../stores/storeDarkMode";

  let checked = false;

  (() => {
    if (localStorage.getItem("_theme") == "dark") {
      const root = document.getElementsByTagName("html")[0];
      root.classList.add("dark");
      checked = true;
      $storeDarkMode = true;
    }
  })();

  const changeTheme = () => {
    const root = document.getElementsByTagName("html")[0];
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("_theme", "light");
      $storeDarkMode = false;
    } else {
      root.classList.add("dark");
      $storeDarkMode = true;
      localStorage.setItem("_theme", "dark");
    }
  };
</script>

<div>
  <input type="checkbox" id="time" {checked} />
  <label
    id="night"
    for="time"
    class="border border-blue-500 dark:border-gray-500 shadow-lg"
    on:click={changeTheme}>Night</label
  >
</div>

<style>
  @keyframes float {
    to {
      transform: translateY(0.75em);
    }
  }

  #night {
    width: 46px;
  }

  #time {
    position: absolute;
    right: 100vw;
  }
  #time + label {
    --i: 0;
    --j: calc(1 - var(--i));
    display: grid;
    grid-gap: 0.5em 0.25em;
    overflow: hidden;
    padding: 0.25em;
    height: 1.7em;
    border-radius: 1.75em;
    background: hsl(208, 60%, calc(var(--j) * 54%));
    color: transparent;
    user-select: none;
    transition: 0.3s;
    cursor: pointer;
  }
  #time + label:before,
  #time + label:after {
    width: 1em;
    height: 1em;
    transition: inherit;
    content: "";
  }
  #time + label:before {
    transform-origin: 20% 20%;
    transform: translate(calc(var(--i) * (100% + 0.2em)))
      scale(calc(1 - var(--i) * 0.6));
    background: yellow;
    --poly: polygon(
      44.13371% 12.96169%,
      50% 0%,
      55.86629% 12.96169%,
      59.70571% 13.77778%,
      63.4388% 14.99073%,
      67.02464% 16.58726%,
      79.38926% 9.54915%,
      76.5165% 23.4835%,
      79.14297% 26.40049%,
      81.45015% 29.57604%,
      83.41274% 32.97536%,
      97.55283% 34.54915%,
      87.03831% 44.13371%,
      87.44861% 48.0374%,
      87.44861% 51.9626%,
      87.03831% 55.86629%,
      97.55283% 65.45085%,
      83.41274% 67.02464%,
      81.45015% 70.42396%,
      79.14297% 73.59951%,
      76.5165% 76.5165%,
      79.38926% 90.45085%,
      67.02464% 83.41274%,
      63.4388% 85.00927%,
      59.70571% 86.22222%,
      55.86629% 87.03831%,
      50% 100%,
      44.13371% 87.03831%,
      40.29429% 86.22222%,
      36.5612% 85.00927%,
      32.97536% 83.41274%,
      20.61074% 90.45085%,
      23.4835% 76.5165%,
      20.85703% 73.59951%,
      18.54985% 70.42396%,
      16.58726% 67.02464%,
      2.44717% 65.45085%,
      12.96169% 55.86629%,
      12.55139% 51.9626%,
      12.55139% 48.0374%,
      12.96169% 44.13371%,
      2.44717% 34.54915%,
      16.58726% 32.97536%,
      18.54985% 29.57604%,
      20.85703% 26.40049%,
      23.4835% 23.4835%,
      20.61074% 9.54915%,
      32.97536% 16.58726%,
      36.5612% 14.99073%,
      40.29429% 13.77778%
    );
    -webkit-clip-path: var(--poly);
    clip-path: var(--poly);
  }
  #time + label:after {
    grid-column: 2;
    border-radius: 50%;
    transform: translatey(calc(var(--i) * (-100% - 0.93em)));
    background: radial-gradient(
      circle at 19% 19%,
      rgba(0, 0, 0, 0) 41%,
      #ffffff 43%
    );
  }
  #time:checked + label {
    --i: 1;
  }
</style>

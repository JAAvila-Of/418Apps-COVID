<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import SvelteSeo from "svelte-seo";
  import Home from "../pages/home.svelte";
  import Error from "../pages/p404.svelte";
</script>

<SvelteSeo
  description="Mira el estado de la vacunación contra el Covid-19 en el Perú con datos oficiales del gobierno."
  twitter={{
    site: "@JoseAngelAvil18",
    creator: "@JoseAngelAvil18",
    title: "Vacunación Covid-19 en Perú",
    description:
      "Mira el estado de la vacunación contra el Covid-19 en el Perú con datos oficiales del gobierno.",
    image: "",
    imageAlt: "Portada de App",
  }}
/>

<Router>
  <Route path="*">
    <Error />
  </Route>
  <Route path="/" let:params>
    <Home />
  </Route>
</Router>

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
    image: "https://418-apps-covid.vercel.app/og.jpg",
    imageAlt: "Portada de App",
  }}
  openGraph={{
    title: "Vacunación Covid-19 en Perú",
    description:
      "Mira el estado de la vacunación contra el Covid-19 en el Perú con datos oficiales del gobierno.",
    type: "article",
    url: "https://418-apps-covid.vercel.app",
    images: [
      {
        url: "https://418-apps-covid.vercel.app/og.jpg",
        width: 1200,
        height: 627,
        alt: "progreso_de_la_vacunacion_peru",
      },
    ],
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

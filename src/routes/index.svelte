<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "../pages/home.svelte";
  import Error from "../pages/p404.svelte";
</script>

<Router>
  <Route path="*">
    <Error />
  </Route>
  <Route path="/" let:params>
    <Home />
  </Route>
</Router>

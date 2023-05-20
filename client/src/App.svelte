<script>
  import "carbon-components-svelte/css/g90.css";
  import "carbon-icons-svelte";
  import { onMount } from 'svelte';
  import { user } from './stores/user.js';
  import { Router } from "svelte-navigator";
  import AppRouter from "./components/AppRouter/AppRouter.svelte";
  import Navbar from "./components/Navbar/Navbar.svelte";

  onMount(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      user.set(JSON.parse(loggedInUser));
    }

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('user', JSON.stringify($user));
    });
  });
</script>

<Router>
  <Navbar/>
  <AppRouter/>
</Router>

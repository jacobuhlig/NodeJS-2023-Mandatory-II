<script>
  import "carbon-components-svelte/css/g90.css";
  import "carbon-icons-svelte";
  import { onMount } from 'svelte';
  import { user } from './stores/user.js';
  import { Router, Route } from "svelte-navigator";
  import PrivateRoute from "./components/RoutesPrivate/PrivateRoute.svelte";
  import AllAccess from "./pages/AllAccess/AllAccess.svelte";
  import Home from './pages/Home/Home.svelte'
  import Signin from "./pages/Signin/Signin.svelte";
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

  <main>
    <Route path="/">
      {#if $user}
        <Home />
      {:else}
        <AllAccess />
      {/if}
    </Route>
    <Route path="/signin" component={Signin}></Route>
    <PrivateRoute path="/home">
        <Home/>
    </PrivateRoute>
  </main>
	<!-- <main>

    <Route path="/" component={AllAccess}></Route>
    <Route path="/signin" component={Signin}></Route>
    

		<PrivateRoute path="/home">
        <Home/>
    </PrivateRoute>

	</main> -->
</Router>


<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
</style>

<script>
  import { user } from '../../stores/user.js';
  import { Route, useLocation, useNavigate } from "svelte-navigator";
  import PrivateRoute from "../RoutesPrivate/PrivateRoute.svelte";
  import AllAccess from "../../pages/AllAccess/AllAccess.svelte";
  import Home from '../../pages/Home/Home.svelte'
  import Signin from "../../pages/Signin/Signin.svelte";

  let location = useLocation();
  let navigate = useNavigate();

  $: {
    if ($user && $location.pathname === '/') {
      navigate('/home', { replace: true });
    }
  }
</script>

<main>
  <Route path="/">
    <AllAccess />
  </Route>
  <Route path="/signin" component={Signin}></Route>
  <PrivateRoute path="/home">
      <Home/>
  </PrivateRoute>
</main>

<style>

  
  main {
    display: grid;
    grid-template-rows: auto 1fr;
    justify-items: center;
    min-height: 100vh;
  }
</style>
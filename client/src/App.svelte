<script>
  import { Router, Route } from "svelte-navigator";
  import PrivateRoute from "./components/RoutesPrivate/PrivateRoute.svelte";
  import AllAccess from "./pages/AllAccess/AllAccess.svelte";
  import Home from './pages/Home/Home.svelte'
  import Signin from "./pages/Signin/Signin.svelte";
  import Navbar from "./components/Navbar/Navbar.svelte";
</script>

<Router>
  
  <Navbar/>

	<main>

    <Route path="/" component={AllAccess}/>
    <Route path="/signin" component={Signin}/>
    

		<PrivateRoute path="/home">
        <Home/>
    </PrivateRoute>

	</main>
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

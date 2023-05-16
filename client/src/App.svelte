<script>
  import { Router, Route } from "svelte-navigator";
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
    <Route path="/home" component={Home}/>
    

		<!-- <PrivateRoute path="profile" let:location>
			<h3>Welcome {$user.username}</h3>
			<button on:click={handleLogout}>Logout</button>
		</PrivateRoute> -->
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

<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Home from './pages/Home/Home.svelte'
</script>

<Router>
	<!-- <Navbar/> -->

	<main>
    <Route path="/">
			<Home/>
		</Route>
    
    <!-- <Route path="login">
      <Login />
    </Route> -->

		<Route path="about">
			<h3>About</h3>
			<p>That's what it's all about!</p>
		</Route>

		<!-- <PrivateRoute path="profile" let:location>
			<h3>Welcome {$user.username}</h3>
			<button on:click={handleLogout}>Logout</button>
		</PrivateRoute> -->
	</main>
</Router>


<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>

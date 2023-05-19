<!-- <script>
	import { Route } from "svelte-navigator";
	import PrivateRouteGuard from "./PrivateRouteGuard.svelte";

	let navigate;
  let location;
	
	export let path;
</script>

<Route {path}>
	<PrivateRouteGuard {location} {navigate}>
		<slot/>
	</PrivateRouteGuard>
</Route> -->


<script>
	import { Route } from "svelte-navigator";
	import PrivateRouteGuard from "./PrivateRouteGuard.svelte";

	export let path;
</script>

<Route {path} let:params let:location let:navigate>
	<PrivateRouteGuard>
		<slot {params} {location} {navigate} />
	</PrivateRouteGuard>
</Route>
<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import { user } from "../../stores/user.js";

	export let navigate = useNavigate();
	export let location = useLocation();

	$: if (!$user) {
		navigate("/", {
			state: { from: $location.pathname },
			replace: true
		});
	}
</script>

{#if $user}
	<slot />
{/if}
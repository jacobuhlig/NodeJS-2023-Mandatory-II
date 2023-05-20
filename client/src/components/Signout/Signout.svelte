<script>
  import { BASE_URL } from "../../stores/urls.js";
  import { user } from "../../stores/user.js";
  import { Link } from "svelte-navigator";
  import toastr, { toastrSetup } from "../../utils/toaster/toastr.js";

  import { HeaderGlobalAction } from "carbon-components-svelte";
  import { Logout } from "carbon-icons-svelte";

  toastrSetup();



  async function handleSignout() {
    const signoutURL = $BASE_URL + "/auth/signout";
    console.log(signoutURL);

    const response = await fetch(signoutURL, {
            credentials: "include"
    });

    const data = await response.json();
    console.log(data);
    console.log(data.message);

    $user = null;

    if (data.message) {
        toastr.info("You've signed out successfully.");
    } else {
        toastr.error("Failed to log out. Please try again later.");
    }
  }

</script>

<HeaderGlobalAction on:click={handleSignout} aria-label="Signout" icon={Logout}/>
<!-- <Link to="/" on:click={handleSignout}>Sign out</Link> -->
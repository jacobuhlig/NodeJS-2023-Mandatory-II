<script>
  import { user } from "../../stores/user.js";
  import { Link, useLocation } from "svelte-navigator";
  import Signout from "../Signout/Signout.svelte";

  import {
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderGlobalAction,
    HeaderPanelLinks,
    HeaderPanelDivider,
    HeaderPanelLink
  } from "carbon-components-svelte";
  
  import {
    Login,
    Undo,
    UserAvatarFilledAlt,
    Home
  } from "carbon-icons-svelte";

  let isSideNavOpen = true;
  let isOpen1 = false;
  let isOpen2 = false;
  
  let location = useLocation();
  let targetRoute;
  let icon;

  $: email = $user;

  $: {
    if ($location.pathname === '/signin') {
      targetRoute = '/';
      icon = Undo;
    } else {
      targetRoute = '/signin';
      icon = Login;
    }
  }
</script>

<header class="navbar">
  <Header company="Node.js" platformName="Mandatory II" bind:isSideNavOpen>

    {#if email}

    <HeaderUtilities>
      <Link to="/home">
        <HeaderGlobalAction aria-label="Home" icon={Home} />
      </Link>
      <HeaderAction
        bind:isOpen={isOpen1}
        icon={UserAvatarFilledAlt}
        closeIcon={UserAvatarFilledAlt}>
        <HeaderPanelLinks>
          <HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
          <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
          <HeaderPanelLink>Switcher item 2</HeaderPanelLink>
          <HeaderPanelLink>Switcher item 3</HeaderPanelLink>
          <HeaderPanelLink>Switcher item 4</HeaderPanelLink>
          <HeaderPanelDivider>Switcher subject 2</HeaderPanelDivider>
          <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
          <HeaderPanelLink>Switcher item 2</HeaderPanelLink>
        </HeaderPanelLinks>
      </HeaderAction>
      <Signout/>
    </HeaderUtilities>

    {:else}

    <HeaderUtilities>
      <Link to={targetRoute}>
        <HeaderGlobalAction icon={icon} />
      </Link>
    </HeaderUtilities>

    {/if}

  </Header>
</header>
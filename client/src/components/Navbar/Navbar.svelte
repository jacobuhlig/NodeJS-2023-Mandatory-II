<script>
  import { user } from "../../stores/user.js";
  import { Link } from "svelte-navigator";
  import Signout from "../Signout/Signout.svelte";

  import {
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderGlobalAction,
    HeaderPanelLinks,
    HeaderPanelDivider,
    HeaderPanelLink
    // SideNav,
    // SideNavItems,
    // SideNavMenu,
    // SideNavMenuItem,
    // SideNavLink,
    // SkipToContent,
    // Content,
    // Grid,
    // Row,
    // Column,
  } from "carbon-components-svelte";
  
  import {
    Login,
    Logout,
    SettingsAdjust,
    UserAvatarFilledAlt,
    Home
  } from "carbon-icons-svelte";
  

  let isSideNavOpen = true;
  let isOpen1 = false;
  let isOpen2 = false;

  $: email = $user;

  // const handleLogout = () => {
  //   event.preventDefault();
  // };
  
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
      <!-- <HeaderGlobalAction on:click={Signout} aria-label="Signout" icon={Logout}/> -->
      <Signout/>
    </HeaderUtilities>

    {:else}

    <HeaderUtilities>
      <Link to="/signin">
        <HeaderGlobalAction icon={Login}/>
      </Link>
    </HeaderUtilities>

    {/if}

  </Header>
</header>
<script>
  import { Link } from "svelte-navigator";
  
  import {
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderGlobalAction,
    HeaderPanelLinks,
    HeaderPanelDivider,
    HeaderPanelLink,
    SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
    SideNavLink,
    SkipToContent,
    Content,
    Grid,
    Row,
    Column,
  } from "carbon-components-svelte";
  
  import {
    Login,
    Logout,
    SettingsAdjust,
    UserAvatarFilledAlt
  } from "carbon-icons-svelte";
  

  let isSideNavOpen = true;
  let isOpen1 = false;
  let isOpen2 = false;
  
  // Check up in this
  let loggedIn = localStorage.getItem("loggedIn") === "false";


  const handleLogout = () => {
    event.preventDefault();
    loggedIn = false;
    localStorage.setItem("loggedIn", "false");
  };
  
</script>

<header class="navbar">
  <Header company="Node.js" platformName="Mandatory II" bind:isSideNavOpen>

    {#if !loggedIn}

    <HeaderUtilities>
      <Link to="/signin">
        <HeaderGlobalAction
          icon={Login}>
        </HeaderGlobalAction>
      </Link>
    </HeaderUtilities>

    {:else}

    <HeaderUtilities>
      <HeaderGlobalAction aria-label="Settings" icon={SettingsAdjust} />
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
          <HeaderPanelDivider>Switcher subject 3</HeaderPanelDivider>
          <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
        </HeaderPanelLinks>
      </HeaderAction>
      <Link to="/">
        <HeaderGlobalAction on:click={handleLogout} icon={Logout}>
        </HeaderGlobalAction>
      </Link>
    </HeaderUtilities>

    {/if}

  </Header>
</header>
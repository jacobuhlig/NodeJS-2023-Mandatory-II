<script>
  import { Button, TextInput } from "carbon-components-svelte";
  import { Email, Password, Login } from "carbon-icons-svelte";

  let email = "";
  let password = "";

  const handleLogin = () => {
    // Handle login logic here
    console.log(email, password);
    email = "";
    password = "";
  };

</script>

<div class="outer">
  <h1>Signin</h1>
  <form on:submit|preventDefault={handleLogin}>
    <div class="inner" style="display: flex; flex-direction: column; gap: 1rem;">
      <div class="line">
        <div class="icon">
          <Email size={20}/>
        </div>
        <TextInput 
          bind:value={email} 
          placeholder="Email" 
          type="email"  
          labelText="Email address"
        />
      </div>

      <div class="line">
        <div class="icon">
          <Password size={20}/>
        </div>
        <TextInput 
          bind:value={password} 
          placeholder="Password" 
          type="password" 
          labelText="Password"
        />
      </div>
    </div>
    <div class=button>
      <Button type="submit" icon={Login}>Signin</Button>
    </div>
  </form>
</div>

<style>
  .outer, form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1 {
    margin-bottom: 1em;
  }
  
  .button {
    margin-top: 4em;
  }


  .inner {
    min-width: 400px;
  }


  .line {
    /* flex-direction: row; */
    display: flex;
    align-items: center;
    gap: 1em;
  }

  .icon {
    margin-top: 20px;
  }
</style>
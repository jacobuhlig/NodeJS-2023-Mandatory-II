<script>
  import { navigate } from "svelte-navigator";
  import { BASE_URL } from "../../stores/urls.js";
  import { user } from "../../stores/user.js";
  import { Button, TextInput } from "carbon-components-svelte";
  import { Email, Password, Login } from "carbon-icons-svelte";
  import toastr, { toastrSetup } from "../../utils/toaster/toastr.js";


  toastrSetup();

  let email = "";
  let password = "";


  async function handleLogin() {
    console.log(email, password);
    const userCredentials = JSON.stringify({email, password});
    console.log(userCredentials);
    const signinURL = $BASE_URL + "/auth/signin";

    try {
      console.log(`1`);
      const response = await fetch(signinURL, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
            },
            body: userCredentials,
            credentials: "include"
      });
      
      if (!response.ok) {
        if(response.status === 400) {
          throw new Error("Wrong email or password. Please try again.");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log("data: " + data);
      
      if (data.email === email) {
          let authenticatedEmail = data.email;
          user.set(authenticatedEmail);
    
          toastr.success(`You've signed in successfully.`);
          setTimeout(() => {
              navigate("/home", { replace: true });
          }, 0)
      }
      
      email = "";
      password = "";

    } catch (error) {
      console.error('An error occurred:', error);
      toastr.error(error.message);
    }
  };
</script>

<div class="flex-center">
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
            type="email"  
            placeholder="Email"
            name="email" 
            labelText="Email address"
          />
        </div>

        <div class="line">
          <div class="icon">
            <Password size={20}/>
          </div>
          <TextInput 
            bind:value={password} 
            type="password" 
            placeholder="Password"
            name="password"
            labelText="Password"
          />
        </div>
      </div>
      <div class=button>
        <Button type="submit" icon={Login}>Signin</Button>
      </div>
    </form>
  </div>
</div>

<style>
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 48px);
    width: 100%;
  }

  .outer, form {
    display: flex;
    flex-direction: column;
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
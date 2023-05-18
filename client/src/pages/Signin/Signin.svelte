<script>
  import { navigate } from "svelte-navigator";
  import { BASE_URL } from "../../stores/urls.js";
  import { user } from "../../stores/user.js";
  import { Button, TextInput } from "carbon-components-svelte";
  import { Email, Password, Login } from "carbon-icons-svelte";
  import toastr from "toastr";
  import 'toastr/build/toastr.css';

  toastr.options = {
        "positionClass": "toast-top-left",
        "timeOut": "1200"
  }

  let email = "";
  let password = "";


  async function handleLogin() {
    // console.log(email, password);
    const userCredentials = JSON.stringify({email, password});
    const signinURL = $BASE_URL + "/auth/signin";

    const response = await fetch(signinURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: userCredentials,
        credentials: "include"
    });
    
    const data = await response.json();
    
    // let data;

    // if (response.headers.get("content-type").includes("application/json")) {
    //     data = await response.json();
    // } else {
    //     data = await response.text();
    // }

    // typeof data === 'object' && 

    if (data.email === email) {
        let authenticatedEmail = data.email;
        $user = authenticatedEmail;
        
        
        toastr.success(`You've signed in successfully, welcome back ${authenticatedEmail}`);
        setTimeout(() => {
            navigate("/home", { replace: true });
        }, 1500)
    } else {
        toastr.error("Wrong email or password. Try again.");
    }

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
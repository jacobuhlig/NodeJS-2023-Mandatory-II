<script>
  import { navigate } from "svelte-navigator";
  import { BASE_URL } from "../../stores/urls.js";
  import { Button, TextInput, ComposedModal, ModalHeader, ModalBody, ModalFooter } from "carbon-components-svelte";
  import { Email, Renew } from "carbon-icons-svelte";
  
  import toastr, { toastrSetup } from "../../utils/toaster/toastr.js";
  toastrSetup();

  let email = "";
  let isModalOpen = false;

  $: if (isModalOpen) {
    setTimeout(() => {
      const inputWrapper = document.getElementById('email-input-wrapper');
      if (inputWrapper) {
        const inputElement = inputWrapper.querySelector('input');
        if (inputElement) inputElement.focus();
      }
    }, 0);
  }

  const openModal = () => {
    isModalOpen = true;
  };

  const closeModal = () => {
    isModalOpen = false;
  };

  async function handleReset(event) {
    event.preventDefault();

    const userCredential = JSON.stringify({email});
    const resetURL = $BASE_URL + "/auth/reset";

    try {
      const response = await fetch(resetURL, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
            },
            body: userCredential,
            credentials: "include"
      });
      
      if (!response.ok) {
        if(response.status === 400) {
          throw new Error("User does not exist. Please try again.");
        } 
        else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log("data: " + data.message);

      if (!data) {
        throw new Error("No response from server.");
      }

      // Check for the message property being returned
      if (data.message) {
        toastr.success(`${data.message}`);
        closeModal();
        setTimeout(() => {
            navigate("/", { replace: true });
        }, 2000);
      }
      
      closeModal();
      email = "";

    } catch (error) {
      toastr.error(error.message);
      email = "";
    }
  };

</script>

<div class="flex-center">
  <div class="outer">
    <div class="inner">
      <div class="button-wrapper">
        <Button kind="ghost" on:click={openModal} class="link-like-button">Forgot password?</Button>
      </div>
    </div>
  </div>
</div>

{#if isModalOpen}
  <div class="composed-modal">
    <ComposedModal bind:open={isModalOpen} size="sm">
      <ModalHeader iconDescription="Close">
        <h1>Reset Password</h1>
      </ModalHeader>
      <ModalBody>
        <form on:submit|preventDefault={handleReset} class="modal-inner">
          <div class="modal-line">
            <div class="icon">
              <Email size={20}/>
            </div>
            <div id="email-input-wrapper">
              <TextInput bind:value={email} type="email" placeholder="Email" name="email" labelText="Email address" required={true} autofocus />
            </div>
          </div>
          <div class="modal-line">
            <div class="new2">
                <Renew size={20}/>
              </div>
            <Button size="field" kind="primary" type="submit" class="reset-button">
              Reset
            </Button>
          </div>
        </form>
      </ModalBody>
      <ModalFooter class="modal-footer">
        <Button size="small" kind="secondary" on:click={closeModal} class="cancel-button">
          Cancel
        </Button>
      </ModalFooter>
    </ComposedModal>
  </div>
{/if}


<style>
  #email-input-wrapper {
    width: 100%;
  }

  .link-like-button {
    color: blue;
    text-decoration: none;
    background-color: transparent;
    border: none;
    padding: 0;
  }
  
  h1 {
    font-size: 2.2em;
    padding-left: 75px;
    margin: 10px 0 12px 0;
  }
  
  :global(.bx--modal-container.bx--modal-container--sm) {
    max-width: 400px;
    min-width: 150px;
    max-height: 400px;
    min-height: 200px;
  }

  .composed-modal {
    position: fixed;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
}
  
  .composed-modal:first-child {
    border-radius: 12px;
  }

  form > div:last-child {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  .modal-inner, .modal-line, .modal-under {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .modal-under {
    width: 80%;
  }

  .modal-line {
    justify-content: flex-start;
    flex-direction: row;
    width: 80%;
  }

  :global(.bx--btn.bx--btn--field.bx--btn--primary.reset-button) {
    width: 90%;
    max-width: none;
    margin-left: 3%;
    padding-left: 38%;
  }

  .modal-header {
    margin: 1.2em auto 1em auto;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
  }

  :global(.bx--btn.bx--btn--sm.bx--btn--secondary.cancel-button) {
    height: 30px; 
    padding: 0 5px; 
    margin: 0 52px 0 280px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    margin-right: 10px;
    margin-top: 20px;
  }
</style>

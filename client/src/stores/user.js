import { writable } from "svelte/store";

// export const user = writable(null);
// export const mail = writable(null);

function createUserStore() {
  const { subscribe, set } = writable(null);

  return {
    subscribe,
    set: (value) => {
      localStorage.setItem('user', JSON.stringify(value));
      set(value);
    },
    remove: () => {
      localStorage.removeItem('user');
      set(null);
    }
  }
}

export const user = createUserStore();
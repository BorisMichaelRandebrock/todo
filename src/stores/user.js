import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useQuasar } from "quasar";

const $q = useQuasar();

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      //console.log(user);
      if (user) {
        this.user = user;
      }
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    async signOut() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        this.user = null;
        localStorage.removeItem("persist:supabase");
      } catch (error) {
        // console.log(error);
        $q.notify({
          type: "negative",
          message: "Error signing out",
        });
      }
    },

    async stateChange() {
      await supabase.auth.onAuthStateChange((event, session) => {
        $q.notify({
          type: "positive",
          message: "Signed in",
        });
        // alert("hello");
        // console.log(event, session);
      });
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});

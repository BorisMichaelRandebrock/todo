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
          icon: "check",
        });
      });
    },

    async resetPasswordForEmail(email) {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(
        email
      );
      if (error) throw error;
    },

    async updatePassword(newPassword) {
      const { user, error } = await supabase.auth.update({
        password: newPassword,
      });
      if (error) throw error;
      if (user) this.fetchUser();
    },

    async updateData(newData) {
      const { user, error } = await supabase.auth.update({
        data: newData,
      });
      if (error) throw error;
      if (user) this.user = user;
    },

    async updateAvatar(avatarImg) {
      // const avatarFile = event.target.files[0];
      const { data, error } = await supabase.storage
        .from("avatar")
        // .upload("public/avatar1.png", avatarFile);
        .upload("public/" + this.user.id + Date.now() + ".jpg", avatarImg);
      // const { data, error } = await supabase.storage
      //   .from("avatar")
      if (error) throw error;
      if (data) return data;
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

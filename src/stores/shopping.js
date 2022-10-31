import { defineStore } from "pinia";
import { supabase } from "../supabase.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

export const useTaskStore = defineStore("items", {
  state: () => ({
    items: [],
  }),
  actions: {
    async fetchTasks(id) {
      const { data: items } = await supabase
        .from("items")
        .select("*")
        .eq("user_id", id)
        .order("id", { ascending: true });
      this.items = items;
    },

    async createTask(newItem) {
      try {
        const { data, error } = await supabase.from("items").insert({
          user_id: newItem.user_id,
          title: newItem.title,
          is_complete: newItem.is_complete,
          inserted_at: newItem.inserted_at,
        });
        if (error) throw error;
      } catch (error) {
        $q.notify({
          message: error.message,
          color: "negative",
          position: "top",
          icon: "report_problem",
        });
      }
    },

    async updateTask(id, isComplete) {
      try {
        const { data, error } = await supabase
          .from("items")
          .update({ is_complete: isComplete })
          .eq("id", id);
        if (error) throw error;
      } catch (error) {
        $q.notify({
          message: error.message,
          color: "negative",
          position: "top",
          icon: "report_problem",
        });
      }
    },

    async deleteTask(id) {
      try {
        const { data, error } = await supabase
          .from("items")
          .delete()
          .eq("id", id);
        if (error) throw error;
      } catch (error) {
        $q.notify({
          message: error.message,
          color: "negative",
          position: "top",
          icon: "report_problem",
        });
      }
    },
  },
});

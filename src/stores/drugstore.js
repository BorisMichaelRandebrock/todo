import { defineStore } from "pinia";
import { supabase } from "../supabase.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

export const useTaskStore = defineStore("meds", {
  state: () => ({
    meds: [],
  }),
  actions: {
    async fetchTasks(id) {
      const { data: meds } = await supabase
        .from("meds")
        .select("*")
        .eq("user_id", id)
        .order("id", { ascending: true });
      this.meds = meds;
    },

    async createTask(newMed) {
      try {
        const { data, error } = await supabase.from("meds").insert({
          user_id: newMed.user_id,
          title: newMed.title,
          is_complete: newMed.is_complete,
          inserted_at: newMed.inserted_at,
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
          .from("meds")
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
          .from("meds")
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

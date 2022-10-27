// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks(id) {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", id)
        .order("id", { ascending: false });
      this.tasks = tasks;
    },

    async createTask(newTask) {
      try {
        const { data, error } = await supabase.from("tasks").insert({
          user_id: newTask.user_id,
          title: newTask.title,
          is_complete: newTask.is_complete,
          inserted_at: newTask.inserted_at,
        });
        if (error) throw error;
        // this.tasks.push({ user_id: newTask.user_id, title: newTask.value });
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

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
        .order("id", { ascending: true });
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
          .from("tasks")
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
          .from("tasks")
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

    async updateTaskTitle(id, title) {
      try {
        const { data, error } = await supabase

          .from("tasks")
          .update({ title: title })
          .eq("id", id)
          .select("*");
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

    async updateData(title, task_id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: title })
        .match({ id: task_id });
      if (error) throw error;
    },
  },
});

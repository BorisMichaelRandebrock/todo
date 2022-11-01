<template>
  <q-page class="bg-blue-1 column main-body">
    <div class="top-space">

    </div>
    <div class="row q-pa-sm add-task">

      <q-input filled bottom-slots v-model="newTask" label="add task" bg-color="white" class="col" dense
        @keyup.enter="addTask">
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add" />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white" separator bordered>
      <q-item v-for="(task) in tasks" :key="task.id" @click="taskIsComplete(task)"
        :class="{ 'done bg-blue-2' :task.is_complete }" clickable="" v-ripple>
        <q-item-section avatar>
          <q-checkbox v-model="task.is_complete" @click="taskIsCompleteTwice(task)" color="blue-10" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="task.is_complete" side>
          <q-btn flat round icon="delete" color="blue-10" @click.stop="deleteTask(task.id)" />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <q-icon name="check" size="100px" color="blue-10" />
      <div class="text-h5 text-blue-10">No tasks</div>

    </div>
  </q-page>
</template>



<script setup>
import { useUserStore } from '../stores/user.js'
import { useTaskStore } from '../stores/task'
import { supabase } from '../supabase';
import { onMounted, computed } from 'vue'
import { data } from "browserslist";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { storeToRefs } from 'pinia'

import { scroll } from 'quasar'
const { getScrollTarget } = scroll
getScrollTarget()



const newTask = ref("");
const $q = useQuasar();



const title = ref("");

const userStore = useUserStore()
const taskStore = useTaskStore()
const { user } = storeToRefs(userStore)
const tasks = computed(() => taskStore.tasks);
const id = userStore.user.id;
taskStore.fetchTasks(id);


const deleteTask = (id) => {

  $q.dialog({
    title: "Delete Task",
    message: "Are you sure you want to delete this task?",
    cancel: true,
    color: "red-10",
    bgColor: "green",
    persistent: true,
  }).onOk(async () => {
    // tasks.value.splice(index, 1);
    await taskStore.deleteTask(id);
    await taskStore.fetchTasks(userStore.user.id);
    $q.notify({
      message: "Task deleted",
      color: "negative",
      icon: "delete",
    });
  });
}


const addTask = async () => {

  try {
    await taskStore.createTask(
      {
        user_id: user.value.id,
        title: newTask.value,
        is_complete: false,
        inserted_at: new Date(),
      }
    );
    await taskStore.fetchTasks(id);
    newTask.value = '';
    $q.notify({
      color: "green-5",
      textColor: "white",
      icon: "add_task",
      message: "new task submitted.",
    });
  } catch (error) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "error",
      message: "error submitting task.",
    });
  }
}

const taskIsComplete = async (task) => {

  try {
    task.is_complete = !task.is_complete;
    await taskStore.updateTask(task.id,
      task.is_complete,
    );
    $q.notify({
      color: "green-5",
      textColor: "white",
      icon: "cloud_done",
      message: "task updated.",
    });
  } catch (error) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "error",
      message: "error updating task.",
    });
  }
}

const taskIsCompleteTwice = (task) => {
  taskIsComplete(task);
  taskIsComplete(task);
}
</script>

<style scoped>
.top-space {
  height: 150px;
}

.main-body {
  height: 100vh;
  /* padding-bottom: 50px; */
}

.done {
  text-decoration: line-through;
  color: gray
}

.add-task {
  height: 50px;
  align-items: center;
  margin-bottom: 10px;
}


.no-tasks {
  opacity: 0.5;

}
</style>

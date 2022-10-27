<template>

  <q-input filled bottom-slots v-model="newTask" label="add task" bg-color="white" class="col" dense
    @keyup.enter="addTask">
    <template v-slot:append>
      <q-btn @click="addTask" round dense flat icon="add" />
    </template>
  </q-input>


</template>



<script setup>

import { data } from "browserslist";
import { ref } from "vue";
import { useQuasar } from "quasar";


import { supabase } from '../supabase';
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import { useTaskStore } from '../stores/task.js'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const taskStore = useTaskStore()
const title = ref('');




const newTask = ref("");
const tasks = ref([]);
const $q = useQuasar();



// const createNewTask = async () => {

//   const addTask = () => {
//     user_id: user.value.id;
//     title: title;
//     is_complete: false;
//     inserted_at: new Date();
//   }
//   try {
//     const response = await taskStore.createTask(addTask);
//     await taskStore.fetchTasks();
//     title.value = '';

//     console.log(response);
//     $q.notify({
//       color: "green-5",
//       textColor: "white",
//       icon: "add_task",
//       message: "new task submitted.",
//     });
//   } catch (error) {
//     console.log(error);
//     $q.notify({
//       color: "red-5",
//       textColor: "white",
//       icon: "warning",
//       message: `An error occurred: ${error}`,
//     });
//   }
// }

const addTask = () => {
  console.log("newTask", newTask.value);
  if (newTask.value) {
    tasks.value.push({
      title: newTask.value,
      done: false,
    });
    newTask.value = "";
  }
}

</script>

<style scoped>
.add-task {
  height: 50px;
  align-items: center;
  z-index: 999;
  margin-bottom: 10px;
}
</style>

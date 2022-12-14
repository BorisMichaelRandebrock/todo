<template>
  <q-page class="bg-blue-1 column main-body">
    <div class="row q-pa-sm add-task">
      <q-input filled bottom-slots v-model="newTask" label="add task" bg-color="white" class="col" dense
        @keyup.enter="addTask">
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add" id="add-task-button" aria-label="add-task-button" />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white scroll-area" separator bordered>
      <q-item v-for="(task) in tasks" :key="task.id" @click="taskIsComplete(task)"
        :class="{ 'done bg-blue-2': task.is_complete }" clickable="" v-ripple v>
        <div v-if="!task.edit" class="task-row">

          <q-item-section avatar>
            <q-checkbox v-model="task.is_complete" @click="taskIsCompleteTwice(task)" color="blue-10" role="checkbox" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ task.title }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="task.is_complete" side>
            <q-btn flat round icon="delete" color="blue-10" @click.stop="deleteTask(task.id)" id="delete-task-button"
              aria-label="delete-task-button" />
          </q-item-section>
          <q-item-section side>
            <q-btn @click.stop="task.edit = !task.edit" round dense flat icon="edit" color="blue-10º"
              aria-label="edit-task-button" />
          </q-item-section>
        </div>
        <div v-else class="task-row-two">
          <q-input v-show="task.edit" filled v-model="newTitle" type="text" placeholder="Edit task" @click.stop
            lazy-rules :rules="[
              (val) => (val && val.length > 0) || 'Please enter a task',
            ]" />
          <q-btn class="link cancel-safe-buttons" v-show="task.edit" @click.stop="task.edit = !task.edit" round dense
            flat icon="close" color="red-10" aria-label="cancel-edit-task-button" />
          <q-btn class="link  cancel-safe-buttons" v-show="task.edit" @click.stop="editTaskTitle(task)" round dense flat
            icon="check" color="green-10" aria-label="save-edit-task-button" />
        </div>
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
const newTitle = ref('')
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

const editTaskTitle = async (task) => {

  task.title = newTitle.value
  try {
    await taskStore.updateData(newTitle.value, task.id)

    await taskStore.fetchTasks(id);

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




// const modifyTask = async (id, newTitle) => {
//   try {
//     if (newTitle) {
//       await taskStore.editTask(id, newTitle)
//       newTitle = ''
//       if (errorMsg.value != null) {
//         //Display error
//         showError.value = true
//       }
//       else {
//         //Redirect to dashboard after successful edit
//         router.push({ path: '/dashboard' })
//       }
//     }
//     else {
//       // errorMsg.value = "Oops! Something went wrong, please try again. "
//       // showError.value = true
//       console.log("Oops! Something went wrong, please try again. ")
//     }
//   } catch (e) {
//     $q.notify({
//       color: "red-5",
//       textColor: "white",
//       icon: "error",
//       message: "error updating task.",
//     });
//   }
// }



</script>

<style scoped>
.task-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

.task-row-two {

  width: 100%;
  justify-content: space-between;

}

.cancel-safe-buttons {
  padding: 0 12px 10px 10px;
}

.top-space {
  height: 150px;
}

.main-body {
  height: 100%;
  flex-wrap: nowrap;
}

.done {
  text-decoration: line-through;
  color: gray
}

.add-task {
  height: 205px;
  align-items: center;
  padding-top: 155px;
}


.no-tasks {
  opacity: 0.5;
  margin-top: 55px;
}

.scroll-area {
  overflow-y: scroll;
  height: auto;
  margin-bottom: 50px;
}

@media screen and (max-width: 600px) {
  .add-task {
    margin-top: 0px;
  }
}
</style>

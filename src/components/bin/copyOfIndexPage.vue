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
    <!-- <AddTaskComponent /> -->
    <q-list class="bg-white" separator bordered>
      <q-item v-for="(task, index) in tasks" :key="task.title" @click="task.done =!task.done"
        :class="{ 'done bg-blue-2' :task.done }" clickable="" v-ripple>
        <q-item-section avatar>
          <q-checkbox v-model="task.done" class="no-pointer-event" color="blue-10" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>

        <q-item-section v-if="task.done" side>
          <q-btn flat round icon="delete" color="blue-10" @click.stop="deleteTask(index)" />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <q-icon name="check" size="100px" color="blue-10" />
      <div class="text-h5 text-blue-10">No tasks</div>

    </div>
  </q-page>
</template>

<!-- <script>
import { data } from "browserslist";
import { defineComponent } from "vue";

export default {

  data() {
    return {
      newTask: "",
      tasks: [
      ]
    };
  },
  methods: {
    deleteTask(index) {
      this.$q.dialog({
        title: "Delete Task",
        message: "Are you sure you want to delete this task?",
        cancel: true,
        color: "red-10",
        bgColor: "green",
        persistent: true,
      }).onOk(() => {
        this.tasks.splice(index, 1);
        this.$q.notify({
          message: "Task deleted",
          color: "negative",
          icon: "delete",
        });
      });

    },
    addTask() {
      if (this.newTask) {
        this.tasks.push({
          title: this.newTask,
          done: false,
        });
        this.newTask = "";
      }
    }
  }
};
</script> -->

<script setup>

import { data } from "browserslist";
import { ref } from "vue";
import { useQuasar } from "quasar";
import AddTaskComponent from '../components/AddTaskComponent.vue'


const newTask = ref("");
const tasks = ref([]);
const $q = useQuasar();

const deleteTask = (index) => {
  $q.dialog({
    title: "Delete Task",
    message: "Are you sure you want to delete this task?",
    cancel: true,
    color: "red-10",
    bgColor: "green",
    persistent: true,
  }).onOk(() => {
    tasks.value.splice(index, 1);
    $q.notify({
      message: "Task deleted",
      color: "negative",
      icon: "delete",
    });
  });
}

const addTask = () => {
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
.top-space {
  height: 150px;
}

.main-body {
  height: -webkit-fill-available;
}

.done {
  text-decoration: line-through;
  color: gray
}

.add-task {
  height: 50px;
  align-items: center;
  z-index: 999;
  margin-bottom: 10px;
}

.q-card__section.q-card__section--vert.q-dialog__title {
  background-color: blue;
}

.no-tasks {
  opacity: 0.5;

}
</style>

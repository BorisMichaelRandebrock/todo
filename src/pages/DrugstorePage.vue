<template>
  <q-page class="bg-green-1 column main-body">
    <div class="top-space">

    </div>
    <div class="row q-pa-sm add-task">

      <q-input filled bottom-slots v-model="newMed" label="add medication" bg-color="white" class="col" dense
        @keyup.enter="addTask">
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add" />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white scroll-area" separator bordered>
      <q-item v-for="(med) in meds" :key="med.id" @click="taskIsComplete(med)"
        :class="{ 'done bg-green-2' :med.is_complete }" clickable="" v-ripple>
        <q-item-section avatar>
          <q-checkbox v-model="med.is_complete" @click="taskIsCompleteTwice(med)" color="green-10" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ med.title }}</q-item-label>
        </q-item-section>

        <q-item-section v-if="med.is_complete" side>
          <q-btn flat round icon="delete" color="green-10" @click.stop="deleteTask(med.id)" />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!meds.length" class="no-tasks absolute-center">
      <q-icon name="medical_services" size="100px" color="green-10" />
      <div class="text-h5 text-green-10">No meds</div>

    </div>
  </q-page>
</template>



<script setup>

import { useUserStore } from '../stores/user.js'
import { useTaskStore } from '../stores/drugstore'
import { supabase } from '../supabase';
import { onMounted, computed } from 'vue'
import { data } from "browserslist";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { storeToRefs } from 'pinia'



const newMed = ref("");
const $q = useQuasar();



const title = ref("");

const userStore = useUserStore()
const taskStore = useTaskStore()
const { user } = storeToRefs(userStore)
const meds = computed(() => taskStore.meds);
const id = userStore.user.id;
taskStore.fetchTasks(id);


const deleteTask = (id) => {

  $q.dialog({
    title: "Delete Item",
    message: "Are you sure you want to delete this Item?",
    cancel: true,
    color: "red-10",
    bgColor: "green",
    persistent: true,
  }).onOk(async () => {
    await taskStore.deleteTask(id);
    await taskStore.fetchTasks(userStore.user.id);
    $q.notify({
      message: "Item deleted",
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
        title: newMed.value,
        is_complete: false,
        inserted_at: new Date(),
      }
    );
    console.log("hello kitty"),
      await taskStore.fetchTasks(id);
    newMed.value = '';
    $q.notify({
      color: "green-5",
      textColor: "white",
      icon: "add_task",
      message: "new medication submitted.",
    });
  } catch (error) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "error",
      message: "error submitting medication.",
    });
  }
}

const taskIsComplete = async (med) => {

  try {
    med.is_complete = !med.is_complete;
    await taskStore.updateTask(med.id,
      med.is_complete,
    );
    $q.notify({
      color: "green-5",
      textColor: "white",
      icon: "cloud_done",
      message: "item updated.",
    });
  } catch (error) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "error",
      message: "error updating item.",
    });
  }
}

const taskIsCompleteTwice = (med) => {
  taskIsComplete(med);
  taskIsComplete(med);
}

</script>

<style scoped>
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
  height: 50px;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
}

.no-tasks {
  opacity: 0.5;
}

.scroll-area {
  overflow-y: scroll;
  height: auto;
  margin-bottom: 50px;
}

@media screen and (max-width: 600px) {
  .add-task {
    margin-top: 10px;
  }
}
</style>

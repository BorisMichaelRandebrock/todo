<template>
  <q-page class="bg-green-1 column main-body">
    <div class="top-space">

    </div>
    <div class="row q-pa-sm add-task">

      <q-input filled bottom-slots v-model="newItem" label="add shopping item" bg-color="white" class="col" dense
        @keyup.enter="addTask">
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add" />
        </template>
      </q-input>
      <!-- <AddTaskComponent /> -->
    </div>
    <q-list class="bg-white" separator bordered>
      <q-item v-for="(item) in items" :key="item.id" @click="taskIsComplete(item)"
        :class="{ 'done bg-blue-2' :item.is_complete }" clickable="" v-ripple>
        <q-item-section avatar>
          <q-checkbox v-model="item.is_complete" @click="taskIsCompleteTwice(item)" color="blue-10" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.title }}</q-item-label>
        </q-item-section>

        <q-item-section v-if="item.is_complete" side>
          <q-btn flat round icon="delete" color="blue-10" @click.stop="deleteTask(item.id)" />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!items.length" class="no-tasks absolute-center">
      <q-icon name="add_shopping_cart" size="100px" color="blue-10" />
      <div class="text-h5 text-blue-10">No items</div>

    </div>
  </q-page>
</template>



<script setup>

import { useUserStore } from '../stores/user.js'
import { useTaskStore } from '../stores/shopping'
import { supabase } from '../supabase';
import { onMounted, computed } from 'vue'
import { data } from "browserslist";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { storeToRefs } from 'pinia'



const newItem = ref("");
const $q = useQuasar();

// import AddTaskComponent from '../components/AddTaskComponent.vue'


const title = ref("");

const userStore = useUserStore()
const taskStore = useTaskStore()
const { user } = storeToRefs(userStore)
const items = computed(() => taskStore.items);
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
    // tasks.value.splice(index, 1);
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
        title: newItem.value,
        is_complete: false,
        inserted_at: new Date(),
      }
    );
    await taskStore.fetchTasks(id);
    newItem.value = '';
    $q.notify({
      color: "green-5",
      textColor: "white",
      icon: "add_task",
      message: "new item submitted.",
    });
  } catch (error) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "error",
      message: "error submitting item.",
    });
  }
}

const taskIsComplete = async (item) => {

  try {
    item.is_complete = !item.is_complete;
    await taskStore.updateTask(item.id,
      item.is_complete,
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

const taskIsCompleteTwice = (item) => {
  taskIsComplete(item);
  taskIsComplete(item);
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
  margin-bottom: 10px;
}


.no-tasks {
  opacity: 0.5;

}
</style>

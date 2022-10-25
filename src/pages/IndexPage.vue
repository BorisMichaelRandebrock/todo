<template>
  <q-page class="bg-blue-1 column main-body">
    <div class="top-space"></div>
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
  </q-page>
</template>

<script>
import { data } from "browserslist";
import { defineComponent } from "vue";

export default {
  // name: "IndexPage",

  data() {
    return {
      tasks: [
        {
          title: "get dog",
          done: false,
        },
        {
          title: "walk dog",
          done: false,
        },
        {
          title: "wash dog",
          done: false,
        },
      ]
    };
  },
  methods: {
    deleteTask(index) {
      this.$q.dialog({
        title: "Delete Task",
        message: "Are you sure you want to delete this task?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        this.tasks.splice(index, 1);
        this.$q.notify({
          message: "Task deleted",
          color: "negative",
          icon: "delete",
        });
      });

    }
  }
};

// const tasks = [
//   {
//     title: "get dog",
//     done: false,
//   },
//   {
//     title: "walk dog",
//     done: false,
//   },
//   {
//     title: "wash dog",
//     done: false,
//   },
// ];

// const deleteTask = (index) => {
//   this.tasks.splice(index, 1)
// }
</script>

<style scoped>
.top-space {
  height: 150px;
}

/* .flex-center {
  flex-direction: column;
} */
.main-body {
  height: -webkit-fill-available;
}

.done {
  text-decoration: line-through;
  color: gray
}
</style>

<template>
  <q-page class="column q-pa-xl q-mt-xl profile-page">
    <div class="top-space"></div>
    <div class="profile-page-content">
      <div class="q-mb-xl">
        <q-avatar size="100px" class="q-mb-sm user-image-avatar">
          <img v-if="user.user_metadata.image" :src="
            'https://xjwouybdvmgnqzlrqahh.supabase.co/storage/v1/object/public/' +
            user.user_metadata.image
          " />
          <img v-else src="/boy-avatar.png" />
        </q-avatar>
        <q-file v-show="editAvatar" filled v-model="img" label="Avatar image">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" />
          </template>
        </q-file>
        <div class="q-mt-sm cancel-safe-area">
          <q-btn class="link edit-btn" v-show="!editAvatar" @click="editAvatar = !editAvatar" color="purple-6" glossy=""
            label="Edit" aria-label="edit-avatar-button" />
          <q-btn class="link inline-blocks cancel-safe-buttons" v-show="editAvatar" @click="editAvatar = !editAvatar"
            color="red-6" glossy="" label="Cancel" />
          <q-btn class="link inline-blocks q-ml-lg cancel-safe-buttons" v-show="editAvatar" @click="updateAvatar"
            color="green-6" glossy="" label="Save" />
        </div>
      </div>
      <div>
        <p>
          Name: <b class="name-tag">{{ user.user_metadata.first_name }}</b>
          <q-input v-show="editData" filled v-model="name" label="Your name" lazy-rules :rules="[
            (val) => (val && val.length > 0) || 'Please enter your name',
          ]" />
        </p>
        <p>
          Surname: <b>{{ user.user_metadata.last_name }}</b>
          <q-input v-show="editData" filled v-model="surname" label="Your surname" lazy-rules :rules="[
            (val) => (val && val.length > 0) || 'Please enter your surname',
          ]" />
        </p>
        <div class="cancel-safe-area-two">
          <q-btn class="link edit-btn" v-show="!editData" @click="editData = !editData" color="purple-6" glossy=""
            label="Edit" aria-label="edit-userData-button" />
          <q-btn class="link inline-blocks cancel-safe-buttons" v-show="editData" @click="editData = !editData"
            color="red-6" glossy="" label="Cancel" />
          <q-btn class="link inline-blocks q-ml-lg cancel-safe-buttons" v-show="editData" @click="updateData"
            color="green-6" glossy="" label="Save" />
        </div>
      </div>
    </div>


    <!-- <div class="q-mt-lg">
        <q-btn @click="router.push({ name: 'reset' })" class="link" label="reset password" color="purple-6" glossy />
      </div> -->
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useUserStore } from "/src/stores/user";
import { useTaskStore } from "/src/stores/task";
import { useRouter } from "vue-router";

const $q = useQuasar();
const $userStore = useUserStore();
const $tasksStore = useTaskStore();
const { user } = storeToRefs($userStore);
const router = useRouter();
const avatarImg = ref("");
const name = ref($userStore.user.user_metadata.first_name);
const surname = ref($userStore.user.user_metadata.last_name);
const editData = ref(false);
const img = ref("");
const editAvatar = ref(false);



const updateData = async () => {
  if (!name.value || !surname.value) {
    $q.notify({
      color: "red-9",
      textColor: "white",
      icon: "warning",
      message: "Fill all inputs",
    });
    return;
  }
  const data = {
    first_name: name.value,
    last_name: surname.value,
  };

  $userStore
    .updateData(data)
    .then(() => {
      editData.value = false;
      $q.notify({
        color: "green-5",
        textColor: "white",
        icon: "cloud_done",
        message: "Profile updated!",
      });
    })
    .catch((err) => {
      $q.notify({
        color: "negative",
        textColor: "white",
        icon: "warning",
        message: `${err.message}`,
      });
    });
}



const updateAvatar = () => {
  $userStore
    .updateAvatar(img.value)
    .then((data) => {
      editAvatar.value = false;
      $q.notify({
        color: "primary",
        textColor: "white",
        icon: "cloud_done",
        message: "Avatar uploaded!",
      });
      $userStore.updateData({ image: data.Key });
    })
    .catch((err) => {
      $q.notify({
        color: "red-9",
        textColor: "white",
        icon: "warning",
        message: `${err.message}`,
      });
    });
}
</script>

<style scoped>
.top-space {
  margin-top: 75px;
}

.edit-btn {
  width: 150px;
}

.cancel-safe-buttons {
  width: 150px;
}

.cancel-safe-area {
  display: flex;
  justify-content: space-between;
}

.cancel-safe-area-two {
  display: flex;
  justify-content: flex-end;
  padding: 0px 15px;
}

.profile-page {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: stretch;
  justify-content: center;
}

.profile-page-content {
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-image-avatar {
  padding: 0px 23px;
}

p {
  margin: 0 15px 16px;
}

.name-tag {
  padding-left: 22px;
}

b {
  padding-left: 5px;
}
</style>

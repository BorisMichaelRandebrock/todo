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
        <div class="q-mt-sm">
          <q-btn class="link edit-btn" v-show="!editAvatar" @click="editAvatar = !editAvatar" round dense flat
            icon="edit" aria-label="edit-avatar-button" />
          <q-btn class="link inline-blocks" v-show="editAvatar" @click="editAvatar = !editAvatar" color="red-6" round
            dense flat icon="cancel" />
          <q-btn class="link inline-blocks q-ml-lg" v-show="editAvatar" @click="updateAvatar" color="green-6" round
            dense flat icon="check" />
        </div>
      </div>
      <div>
        <div v-if="!editData" class="bg-blue-grey-1">
          <p class="user-data-input">
            <b class="name-tag"> <span class="text-blue-grey-7 name-input">Name: </span> {{
                user.user_metadata.first_name
            }}</b>
            <q-input v-show="editData" filled v-model="name" label="Your name" lazy-rules :rules="[
              (val) => (val && val.length > 0) || 'Please enter your name',
            ]" />
          </p>
          <p class="user-data-input">
            <b><span class="text-blue-grey-7 surname-input">Surname: </span> {{ user.user_metadata.last_name }}</b>
            <q-input v-show="editData" filled v-model="surname" label="Your surname" lazy-rules :rules="[
              (val) => (val && val.length > 0) || 'Please enter your surname',
            ]" />

          </p>
          <p class="user-data-input">
            <b><span class="text-blue-grey-7 e-mail-input">e-mail: </span> {{ user.email }}</b>
            <q-btn class="link" v-show="!editData" @click="editData = !editData" color="blue-grey-8" round dense flat
              icon="edit" />
          </p>
        </div>

        <div v-else>
          <p class="user-data-input-open">
            <q-input v-show="editData" filled v-model="name" label="Your name" lazy-rules :rules="[
              (val) => (val && val.length > 0) || 'Please enter your name',
            ]" />
            <q-btn class="link" v-show="!editData" @click="editData = !editData" round dense flat icon="edit" />
          </p>
          <p class="user-data-input-open">
            <q-input v-show="editData" filled v-model="surname" label="Your surname" lazy-rules :rules="[
              (val) => (val && val.length > 0) || 'Please enter your surname',
            ]" />
            <q-btn class="link" v-show="!editData" @click="editData = !editData" round dense flat icon="edit" />

          </p>
          <p class="user-data-input-open">
            <q-input v-show="editData" filled v-model="email" label="Your e-mail" lazy-rules :rules="[
              (val) => (val && val.length > 0) || 'Please enter your e-mail',
            ]" />
            <q-btn class="link" v-show="!editData" @click="editData = !editData" round dense flat icon="edit" />
          </p>
          <q-btn class="link inline-blocks" v-show="editData" @click="editData = !editData" color="red-6" round dense
            flat icon="cancel" />
          <q-btn class="link inline-blocks q-ml-lg " v-show="editData" @click="updateData" color="green-6" round dense
            flat icon="check" />
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
const email = ref($userStore.user.email);
const editData = ref(false);
const img = ref("");
const editAvatar = ref(false);



const updateData = async () => {
  // if (!name.value || !surname.value) {
  //   $q.notify({
  //     color: "red-9",
  //     textColor: "white",
  //     icon: "warning",
  //     message: "Fill all inputs",
  //   });
  //   return;
  // }
  const data = {
    first_name: name.value,
    last_name: surname.value,
    email: email.value,

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
  margin-left: 60px;
}

.user-data-input-open {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


.user-image-avatar {
  padding: 0px 23px;
}


b {
  padding-left: 5px;
}

.user-data-input {
  display: flex;
  align-items: center;
  justify-content: space-between;


}

.name-input {
  margin-right: 40px;
}

.surname-input {
  margin-right: 20px;
}

.e-mail-input {
  margin-right: 38px;
}
</style>

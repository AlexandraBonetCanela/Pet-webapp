<script>
import { useUserStore } from "../store/user";
import ModalView from "./ModalView.vue";

export default {
  name: "RegisterModal",
  components: { ModalView },
  setup() {
    const store = useUserStore();
    return {
      store,
      form: {
        username: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    closeRegisterModal() {
      this.store.toggleRegisterModal(false);
    },
    async register() {
      this.errorMessage = "";

      const requestBody = {
        username: this.form.username,
        password: this.form.password,
      };

      try {
        const response = await fetch("http://localhost:8080/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to register. Check credentials.");
        }

        const data = await response.json();

        this.store.setUserData({
          name: requestBody.username,
          token: data.token,
        });

        this.closeRegisterModal(); // Close modal after success
      } catch (error) {
        console.error("Registration error:", error);
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<template>
  <ModalView
      :title="'Register'"
      :modalState="store.isRegisterModalOpen"
      :closeModal="closeRegisterModal"
  >
    <form @submit.prevent="register">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="form.username" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="form.password" required />

      <button type="submit">Sign Up</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </ModalView>
</template>
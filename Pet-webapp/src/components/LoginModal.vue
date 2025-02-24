<script>
import { useUserStore } from "../store/user";
import ModalView from "./ModalView.vue"; // Corrected path

export default {
  name: "LoginModal",
  components: { ModalView },
  data() {
    return {
      store: useUserStore(),
      form: {
        username: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  computed: {
    isLoginModalOpen() {
      return this.store.isLoginModalOpen;
    },
  },
  methods: {
    closeLoginModal() {
      this.store.toggleLoginModal(false);
    },
    async login() {
      this.errorMessage = "";

      const requestBody = {
        username: this.form.username,
        password: this.form.password,
      };

      try {
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to login. Check credentials.");
        }

        const data = await response.json();

        this.store.setUserData({
          name: requestBody.username,
          token: data.token,
        });

        this.closeLoginModal(); // Close modal after success
      } catch (error) {
        console.error("Login error:", error);
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<template>
  <ModalView
      :title="'Login'"
      :modalState="isLoginModalOpen"
      :closeModal="closeLoginModal"
  >
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="form.username" required />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="form.password" required />

      <button type="submit">Login</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </ModalView>
</template>

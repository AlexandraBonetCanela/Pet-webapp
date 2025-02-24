<script>
import { useUserStore } from "../store/user"; // Import the store

export default {
  name: "NavBar",
  setup() {
    const store = useUserStore(); // Ensure reactivity

    return {
      store,
    };
  },
  computed: {
    isLogged() {
      return this.store.isLogged; // Reactive computed property
    },
  },
  methods: {
    login() {
      console.log("User logged in");
    },
    logout() {
      this.store.logout();
    },
    openRegisterModal() {
      this.store.toggleRegisterModal(true);
    },
    openLoginModal(){
      this.store.toggleLoginModal(true);
    }
  },
};
</script>

<template>
  <nav class="navbar">
    <div class="logo">My Pets</div>
    <div class="nav-links">
      <button v-if="!isLogged" @click="openLoginModal">Login</button>
      <button v-if="!isLogged" @click="openRegisterModal">Register</button>
      <button v-if="isLogged" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<style scoped>
/* Navigation Bar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-size: 18px;
  z-index: 1000;
}

.logo {
  font-weight: bold;
}

.nav-links button {
  margin-left: 15px;
  padding: 8px 12px;
  border: none;
  background: #ff4081;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: background 0.3s;
}

.nav-links button:hover {
  background: #ff79b0;
}
</style>

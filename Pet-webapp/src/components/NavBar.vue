<script>
export default {
  name: "NavBar",
  data() {
    return {
      isLoggedIn: false, // Simulated login state
    };
  },
  methods: {
    login() {
      this.isLoggedIn = true;
      console.log("User logged in");
    },
    register() {
      console.log("User registered");
    },
    logout() {
      this.isLoggedIn = false;
      console.log("User logged out");
    }
  }
}
</script>

<template>
  <nav class="navbar">
    <div class="logo">My App</div>
    <div class="nav-links">
      <button @click="login">Login</button>
      <button @click="register">Register</button>
      <button v-if="isLoggedIn" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<style scoped>
/* Navigation bar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.7); /* Semi-transparent */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-size: 18px;
  z-index: 1000;
}

/* Logo */
.logo {
  font-weight: bold;
}

/* Buttons */
.nav-links button {
  margin-left: 15px;
  padding: 8px 12px;
  border: none;
  background: #ff4081; /* Neon pink */
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
<script>
import NavBar from "./components/NavBar.vue";
import RegisterModal from "./components/RegisterModal.vue";
import LoginModal from "./components/LoginModal.vue";
import AnimatedBackground from "./components/AnimatedBackground.vue";

export default {
  name: "App",
  components: {
    NavBar,
    RegisterModal,
    LoginModal,
    AnimatedBackground,
  },
};
</script>

<template>
  <NavBar />
  <RegisterModal />
  <LoginModal />
  <AnimatedBackground />
</template>

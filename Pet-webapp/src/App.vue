<script>
import { useUserStore } from "./store/user";
import { storeToRefs } from "pinia";
import NavBar from "./components/NavBar.vue";
import RegisterModal from "./components/RegisterModal.vue";
import LoginModal from "./components/LoginModal.vue";
import AnimatedBackground from "./components/AnimatedBackground.vue";
import PetsView from "./views/PetsView.vue";
import CatGrass from "./components/CatGrass.vue";

export default {
  name: "App",
  components: {
    AnimatedBackground,
    CatGrass,
    NavBar,
    RegisterModal,
    LoginModal,
    PetsView
  },
  setup() {
    const userStore = useUserStore();
    const { isLogged } = storeToRefs(userStore); // ✅ Make sure `isLogged` is reactive

    return { isLogged };
  },
};
</script>

<template>
  <AnimatedBackground />
  <NavBar />
  <RegisterModal />
  <LoginModal />
<!--  <CatGrass />-->
  <PetsView v-if="isLogged" />
</template>

<script>
export default {
  name: "CatGrass",
  data() {
    return {
      isThirsty: false, // 🌿 Initial state is healthy
      images: {
        healthy: "/images/healthy-plant.png", // Path to healthy plant
        thirsty: "/images/thirsty-plant.png", // Path to thirsty plant
      },
    };
  },
  computed: {
    currentImage() {
      return this.isThirsty ? this.images.thirsty : this.images.healthy;
    },
  },
  methods: {
    toggleThirst() {
      this.isThirsty = !this.isThirsty; // 🥀 Toggle between healthy/thirsty state
    },
  },
};
</script>

<template>
  <div class="plant-container">
    <transition name="fade">
      <img :src="currentImage" :key="currentImage" alt="Cat Grass" class="plant" />
    </transition>
    <button @click="toggleThirst">Toggle Thirst</button>
  </div>
</template>

<style scoped>
.plant-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plant {
  width: 200px; /* Adjust size */
  height: auto;
  transition: filter 0.5s ease-in-out; /* Smooth filter transition */
}

/* Vue transition effect */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Add a dry effect when thirsty */
.thirsty {
  filter: grayscale(70%) brightness(70%); /* Makes plant look dry */
}
</style>

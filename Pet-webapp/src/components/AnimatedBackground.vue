<script>
export default {
  name: "AnimatedBackground.vue",
  methods: {
    getCloudStyle(index) {
      const delay = Math.random() * 5; // Random animation delay
      const speed = 10 + Math.random() * 10; // Random speed
      return {
        top: `${index * 20 + Math.random() * 10}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`
      };
    }
  }
}
</script>

<template>
  <div class="background">
    <div class="stars"></div>
    <div class="clouds">
      <div v-for="n in 5" :key="n" class="cloud" :style="getCloudStyle(n)"></div>
    </div>
  </div>
</template>

<style scoped>
/* Background Styling */
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('../assets/images/background-image.png') no-repeat center center/cover;
  overflow: hidden;
  z-index: -1; /* ✅ Ensures the background stays behind everything */
}

/* Stars Animation */
.stars {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(white 2px, transparent 3px);
  background-size: 100px 100px;
  animation: twinkle 5s infinite alternate ease-in-out;
  z-index: -1; /* ✅ Keeps stars behind foreground content */
}

@keyframes twinkle {
  0% { opacity: 0.7; }
  50% { opacity: 0.85; }
  100% { opacity: 1; }
}

/* Clouds Animation */
.cloud {
  position: absolute;
  width: 150px;
  height: 80px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  filter: blur(10px);
  animation: floatClouds 30s linear infinite;
  z-index: -1; /* ✅ Ensures clouds remain in the background */
}

@keyframes floatClouds {
  from { transform: translateX(-150%); }
  to { transform: translateX(150vw); }
}
</style>
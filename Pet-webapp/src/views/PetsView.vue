<template>
  <div class="pets-container">
    <h2>Your Pets</h2>

    <p v-if="isLoading">Loading pets...</p>
    <p v-if="error">{{ error }}</p>

    <ul v-if="pets.length > 0">
      <li v-for="pet in pets" :key="pet.id" @click="openPetModal(pet)">
        {{ pet.name }} ({{ pet.type }})
      </li>
    </ul>
    <p v-else>No pets found.</p>

    <!-- Modal to interact with the selected pet -->
    <ModalView
        v-if="isPetModalOpen"
        :title="selectedPet?.name"
        :modalState="isPetModalOpen"
        :closeModal="closePetModal"
    >
      <div class="pet-info">
        <p>Type: {{ selectedPet?.type }}</p>
        <p>Happiness Level: {{ selectedPet?.happinessLevel }}</p>
        <p>Food Level: {{ selectedPet?.foodLevel }}</p>
      </div>
      <button class="action-btn" @click="feedPet">Feed</button>
      <button class="action-btn" @click="playWithPet">Play</button>
    </ModalView>
  </div>
</template>

<script>
import ModalView from "../components/ModalView.vue";
import { usePetStore } from "../store/pet";

export default {
  name: "PetsView",
  components: { ModalView },
  data() {
    return {
      store: usePetStore(),
      isPetModalOpen: false,
      selectedPet: null,
    };
  },
  computed: {
    pets() {
      return this.store.pets;
    },
    isLoading() {
      return this.store.loading;
    },
    error() {
      return this.store.error;
    },
  },
  methods: {
    openPetModal(pet) {
      this.selectedPet = pet;
      this.isPetModalOpen = true;
    },
    closePetModal() {
      this.isPetModalOpen = false;
      this.selectedPet = null;
    },
    async feedPet() {
      console.log("Feeding pet:", this.selectedPet.name);
      // Call API to update pet food level (to be implemented)
    },
    async playWithPet() {
      console.log("Playing with pet:", this.selectedPet.name);
      // Call API to update pet happiness (to be implemented)
    },
  },
  mounted() {
    this.store.fetchPets();
  },
};
</script>

<style scoped>
.pets-container {
  padding: 20px;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #222;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

li:hover {
  background: #444;
}

.action-btn {
  background: #ff4081;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;
}

.action-btn:hover {
  background: #ff79b0;
}
</style>

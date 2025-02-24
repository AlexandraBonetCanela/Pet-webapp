<template>
  <div class="pets-container">
    <h2>Your Pets</h2>
    <p v-if="isLoading">Loading pets...</p>
    <p v-if="error">{{ error }}</p>

    <ul v-if="pets.length > 0">
      <li v-for="pet in pets" :key="pet.id" @click="openPetModal(pet)">
        <img :src="getPetImage(pet.type)" alt="Pet Image" class="pet-image" />
        {{ pet.name }} ({{ pet.type }})
      </li>
    </ul>
    <p v-else>No pets found.</p>

    <button class="add-pet-btn" @click="openAddPetModal">Add Pet</button>

    <!-- Modal for pet details and activities -->
    <div v-if="isPetModalOpen" class="modal-overlay" @click.self="closePetModal">
      <div class="modal">
        <h2>{{ selectedPet?.name }}</h2>
        <img :src="getPetImage(selectedPet?.type)" alt="Pet Image" class="pet-image-large" />
        <p>Type: {{ selectedPet?.type }}</p>
        <p>Happiness Level: {{ selectedPet?.happinessLevel }}</p>
        <p>Food Level: {{ selectedPet?.foodLevel }}</p>

        <button class="action-btn" @click="feedPet">Feed</button>
        <button class="action-btn" @click="playWithPet">Play</button>
        <button class="close-btn" @click="closePetModal">Close</button>
      </div>
    </div>
    <AddPetModal v-if="isAddPetModalOpen" :closeModal="() => isAddPetModalOpen = false" :petTypes="petTypes" />
  </div>
</template>

<script>
import { usePetStore } from "../store/pet";
import AddPetModal from "../components/AddPetModal.vue";

export default {
  name: "PetsView",
  components: {AddPetModal},
  data() {
    return {
      store: usePetStore(),
      isAddPetModalOpen: false,
      isPetModalOpen: false,
      selectedPet: null,
      petTypes: {
        "CAT_GRASS": "Cat Grass",
        "DEVIL_BLACK_CAT_SIBLINGS": "Devil Black Cat Siblings",
        "EXTINGUISHER": "Extinguisher",
        "BUS_STOP": "Bus Stop",
      },
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
    getPetImage(type) {
      const petImages = {
        "CAT_GRASS": new URL('../assets/pets/grass/healthy-grass.png', import.meta.url).href,

        // Add other pet types and their corresponding images here
      };
      return petImages[type] || "../assets/pets/default-pet.png";
    },
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
    openAddPetModal() {
      this.isAddPetModalOpen = true;
    },
    closeAddPetModal() {
      this.isAddPetModalOpen = false;
    },
  },
  mounted() {
    this.store.fetchPets();
  },
};
</script>

<style scoped>
.pets-container {
  background: rgba(50, 50, 50, 0.7); /* Semi-transparent background */
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  color: white;
  width: 90%;
  max-width: 600px;
  margin: auto;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
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
  display: flex;
  align-items: center;
  gap: 10px;
}

li:hover {
  background: #444;
}

.pet-image {
  width: 50px;
  height: 50px;
  border-radius: 6px;
}

.pet-image-large {
  width: 100px;
  height: 100px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.add-pet-btn {
  background: #ff4081;
  color: white;
  padding: 12px;
  margin-top: 15px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;
}

.add-pet-btn:hover {
  background: #ff79b0;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6); /* Dark overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
}

/* Modal Box */
.modal {
  background: rgba(30, 30, 30, 0.95); /* Dark semi-transparent background */
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
  color: white;
}

/* Action Buttons */
.action-btn, .close-btn {
  background: #ff4081;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;
}

.action-btn:hover, .close-btn:hover {
  background: #ff79b0;
}
</style>

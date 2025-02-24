<template>
  <div class="pets-container">
    <h2>Your Pets</h2>
    <p v-if="isLoading">Loading pets...</p>
    <p v-if="error">{{ error }}</p>

    <ul v-if="pets.length > 0">
      <li v-for="pet in pets" :key="pet.id" @click="openPetModal(pet)">
        <img :src="getPetImage(pet.type)" alt="Pet Image" class="pet-image" />
        {{ pet.name }} ({{ formattedPetType(pet.type) }})
      </li>
    </ul>
    <p v-else>No pets found.</p>

    <button class="add-pet-btn" @click="openAddPetModal">Add Pet</button>

    <AddPetModal v-if="isAddPetModalOpen" :closeModal="closeAddPetModal" :petTypes="petTypes" />
    <PetModal v-if="isPetModalOpen" :modalState="isPetModalOpen" :closeModal="closePetModal" :selectedPet="selectedPet" />
  </div>
</template>

<script>
import { usePetStore } from "../store/pet";
import AddPetModal from "../components/AddPetModal.vue";
import PetModal from "../components/PetModal.vue";

export default {
  name: "PetsView",
  components: { AddPetModal, PetModal },
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
    formattedPetType(type) {
      return this.petTypes[type] || type;
    },
    getPetImage(type) {
      const petImages = {
        "CAT_GRASS": new URL("../assets/pets/grass/healthy-grass.png", import.meta.url).href,
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
  background: rgba(50, 50, 50, 0.7);
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
</style>

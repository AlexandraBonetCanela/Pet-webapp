<template>
  <div class="pets-container">
    <h2>{{isAdmin ? "All Pets:" : "Your Pets"}}</h2>
    <p v-if="isLoading">Loading pets...</p>
    <p v-if="error">{{ error }}</p>

    <ul v-if="pets.length > 0">
      <li v-for="pet in pets" :key="pet.id" @click="openPetModal(pet)">
        <img :src="petStore.getPetImage(pet.type)" alt="Pet Image" class="pet-image" />
        {{ pet.name }} ({{ petStore.getPetType(pet.type) }})
      </li>
    </ul>
    <p v-else>No pets found.</p>

    <button v-if="!isAdmin" class="add-pet-btn" @click="openAddPetModal">Add Pet</button>

    <AddPetModal v-if="isAddPetModalOpen" :closeModal="closeAddPetModal" :petTypes="petTypes" />
    <PetModal v-if="isPetModalOpen" :modalState="isPetModalOpen" :closeModal="closePetModal" :selectedPetId="selectedPetId" />
  </div>
</template>

<script>
import { usePetStore } from "../store/pet";
import { useUserStore} from "../store/user.js";
import AddPetModal from "../components/AddPetModal.vue";
import PetModal from "../components/PetModal.vue";

export default {
  name: "PetsView",
  components: { AddPetModal, PetModal },
  data() {
    return {
      petStore: usePetStore(),
      userStore: useUserStore(),
      isAddPetModalOpen: false,
      isPetModalOpen: false,
      selectedPetId: null,
    };
  },
  computed: {
    pets() {
      return this.petStore.pets;
    },
    isLoading() {
      return this.petStore.loading;
    },
    error() {
      return this.petStore.error;
    },
    isAdmin(){
      return this.userStore.getRole === 'ADMIN';
    }
  },
  methods: {
    formattedPetType(type) {
      return this.petStore.getPetType[type] || type;
    },
    openPetModal(pet) {
      this.selectedPetId = pet.id;
      this.isPetModalOpen = true;
    },
    closePetModal() {
      this.isPetModalOpen = false;
      this.selectedPetId = null;
    },
    openAddPetModal() {
      this.isAddPetModalOpen = true;
    },
    closeAddPetModal() {
      this.isAddPetModalOpen = false;
    },
  },
  mounted() {
    this.petStore.fetchPets();
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

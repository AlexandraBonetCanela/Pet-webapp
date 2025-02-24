<template>
  <ModalView :title="selectedPet?.name" :modalState="modalState" :closeModal="closeModal">
    <div class="pet-details">
      <img :src="getPetImage(selectedPet?.type)" alt="Pet Image" class="pet-image-large" />
      <p>Type: {{ formattedPetType }}</p>
      <p>Happiness Level: {{ selectedPet?.happinessLevel }}</p>
      <p>Food Level: {{ selectedPet?.foodLevel }}</p>

      <button class="action-btn" @click="feedPet">Feed</button>
      <button class="action-btn" @click="playWithPet">Play</button>
    </div>
  </ModalView>
</template>

<script>
import ModalView from "../components/ModalView.vue";

export default {
  name: "PetDetailsModal",
  components: { ModalView },
  props: {
    modalState: Boolean,
    closeModal: Function,
    selectedPet: Object,
  },
  computed: {
    formattedPetType() {
      const petTypes = {
        "CAT_GRASS": "Cat Grass",
        "DEVIL_BLACK_CAT_SIBLINGS": "Devil Black Cat Siblings",
        "EXTINGUISHER": "Extinguisher",
        "BUS_STOP": "Bus Stop",
      };
      return petTypes[this.selectedPet?.type] || this.selectedPet?.type;
    },
  },
  methods: {
    getPetImage(type) {
      const petImages = {
        "CAT_GRASS": new URL('../assets/pets/grass/healthy-grass.png', import.meta.url).href,
      };
      return petImages[type] || "../assets/pets/default-pet.png";
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
};
</script>

<style scoped>
.pet-details {
  text-align: center;
}

.pet-image-large {
  width: 100px;
  height: 100px;
  border-radius: 6px;
  margin-bottom: 10px;
}

/* Action Buttons */
.action-btn {
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

.action-btn:hover {
  background: #ff79b0;
}
</style>
yle>
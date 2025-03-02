<template>
  <ModalView :title="pet?.name" :modalState="modalState" :closeModal="closeModal">
    <div class="pet-details">
      <img :src="getPetImage(pet?.type)" alt="Pet Image" class="pet-image-large" />
      <p>Type: {{ formattedPetType }}</p>
      <p>Happiness Level: {{ pet?.happinessLevel }}</p>
      <p>Food Level: {{ pet?.foodLevel }}</p>

      <button class="action-btn" @click="feedPet">Feed</button>
      <button class="action-btn" @click="playWithPet">Play</button>
      <button class="action-btn" @click="deletePet">Delete Pet</button>
    </div>
  </ModalView>
</template>

<script>
import ModalView from "../components/ModalView.vue";
import { usePetStore } from "../store/pet.js";
import { computed, watch, ref } from "vue";

export default {
  name: "PetDetailsModal",
  components: { ModalView },
  props: {
    modalState: Boolean,
    closeModal: Function,
    selectedPetId: String, // Pass the pet ID instead of the full object
  },
  setup(props) {
    const petStore = usePetStore();
    const pet = ref(null);

    // Watch for changes in the selected pet ID and fetch updated details
    watch(
        () => props.selectedPetId,
        (newId) => {
          if (newId) {
            pet.value = petStore.pets.find((p) => p.id === newId) || null;
          }
        },
        { immediate: true } // Fetch immediately when the component mounts
    );
    const formattedPetType = computed(() => {
      return petStore.petTypes[pet.value?.type] || pet.value?.type;
    });

    const getPetImage = computed(() => (type) => {
      return petStore.petImages[type] || "../assets/pets/default-pet.png";
    });

    const feedPet = async () => {
      if (pet.value) {
        await petStore.feedPet(pet.value.id);
        pet.value = petStore.pets.find((p) => p.id === pet.value.id); // Refresh pet data
      }
    };

    const playWithPet = async () => {
      if (pet.value) {
        await petStore.playWithPet(pet.value.id);
        pet.value = petStore.pets.find((p) => p.id === pet.value.id); // Refresh pet data
      }
    };

    const deletePet = async () => {
      if (pet.value) {
        await petStore.deletePet(pet.value.id);
        props.closeModal();
      }
    };

    return { pet, formattedPetType, getPetImage, feedPet, playWithPet, deletePet };
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

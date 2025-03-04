<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h2>Add a New Pet</h2>
      <form @submit.prevent="addPet">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="newPet.name" required />

        <label for="type">Type:</label>
        <select id="type" v-model="newPet.type" required class="custom-select">
          <option v-for="(label, key) in store.petTypes" :key="key" :value="key">
            {{ label }}
          </option>
        </select>

        <button type="submit" class="action-btn">Add Pet</button>
      </form>
    </div>
  </div>
</template>

<script>
import { usePetStore } from "../store/pet";

export default {
  name: "AddPetModal",
  props: {
    closeModal: Function,
  },
  data() {
    return {
      store: usePetStore(),
      newPet: { name: "", type: "" },
    };
  },
  methods: {
    async addPet() {
      await this.store.addPet(this.newPet);
      if (!this.store.error) {
        this.closeModal();
      }
    },
  },
};
</script>

<style scoped>
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
  background: rgba(30, 30, 30, 0.95);
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
  color: white;
}
</style>

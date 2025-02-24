<script>
import { useUserStore } from "../store/user";

export default {
  name: "ModalView",
  props: {
    title: String, // Modal title
    submitText: String, // Text for the submit button
    modalState: Boolean, // Determines whether modal is open
    closeModal: Function, // Function to close the modal
  },
  setup() {
    return {
      store: useUserStore(),
    };
  },
};
</script>

<template>
  <div v-if="modalState" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h2>{{ title }}</h2>
      <slot></slot> <!-- Injects form from child components -->

      <button class="close-btn" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<style >
  /* Modal Overlay (Dark Background) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8); /* Slightly darker background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
}

/* Modal Box */
.modal {
  background: #1e1e1e; /* Dark gray to match navbar */
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
  color: white;
}

/* Modal Title */
.modal h2 {
  font-size: 22px;
  margin-bottom: 15px;
  color: #ddd; /* Match the navbar color */
}

/* Form Styling */
.modal form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Labels */
.modal label {
  text-align: left;
  font-weight: bold;
  color: #ddd; /* Slightly lighter for readability */
}

/* Input Fields */
.modal input {
  padding: 10px;
  border: 1px solid #555;
  border-radius: 6px;
  background: #222; /* Dark background for input */
  color: white;
  font-size: 16px;
}

/* Input Focus */
.modal input:focus {
  outline: none;
  border-color: #ff4081; /* Highlight on focus */
}

/* Buttons */
.modal button {
  padding: 12px;
  margin-top: 10px;
  border: none;
  background: #ff4081; /* Primary button color */
  color: white;
  cursor: pointer;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease-in-out;
}

.modal button:hover {
  background: #ff79b0;
}

  .custom-select {
    width: 100%;
    padding: 10px;
    margin-top: 8px;
    border-radius: 6px;
    background: #222;
    color: white;
    border: 1px solid #555;
    font-size: 16px;
    cursor: pointer;
    transition: border-color 0.3s;
  }

  .custom-select:focus {
    border-color: #ff4081;
    outline: none;
  }


/* Close Button */
.close-btn {
  background: transparent;
  color: #aaa;
  font-weight: bold;
  border: 1px solid #aaa;
  padding: 10px;
  width: 100%;
  border-radius: 6px;
  margin-top: 15px;
  cursor: pointer;
}

  .close-btn:hover {
    background:  #333;
    color: white;
}
  /* Custom Select Dropdown */
  .custom-select {
    width: 100%;
    padding: 10px;
    margin-top: 8px;
    border-radius: 6px;
    background: #222;
    color: white;
    border: 1px solid #555;
    font-size: 16px;
    cursor: pointer;
    transition: border-color 0.3s;
  }

  .custom-select:focus {
    border-color: #ff4081;
    outline: none;
  }

/* Error Message */
.error {
  color: #ff5252;
  font-size: 14px;
  margin-top: 12px;
}
</style>

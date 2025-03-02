import { defineStore } from "pinia";
import { useUserStore } from "./user"; // Import user store for auth

export const usePetStore = defineStore("pet", {
    state: () => ({
        pets: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchPets() {
            const userStore = useUserStore();
            if (!userStore.getUserId) return;

            this.loading = true;
            this.error = null;

            try {
                let endpoint = `http://localhost:8080/pet/${userStore.getUserId}`;

                if(userStore.role === "ADMIN"){
                    endpoint = `http://localhost:8080/pet`;
                }

                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userStore.getToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch pets.");

                this.pets = await response.json();
            } catch (error) {
                this.error = error.message;
                console.error("Error fetching pets:", error);
            } finally {
                this.loading = false;
            }
        },

        async addPet(newPet) {
            const userStore = useUserStore();
            if (!userStore.getUserId) return;

            this.loading = true;
            this.error = null;

            try {
                const response = await fetch("http://localhost:8080/pet", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${userStore.getToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: userStore.getUserId,
                        name: newPet.name,
                        type: newPet.type,
                    }),
                });

                if (!response.ok) throw new Error("Failed to add pet.");

                const pet = await response.json();
                this.pets.push(pet); // Update state
            } catch (error) {
                this.error = error.message;
                console.error("Error adding pet:", error);
            } finally {
                this.loading = false;
            }
        },

        async deletePet(petId) {
            const userStore = useUserStore();
            if (!userStore.getUserId) return;

            try {
                const response = await fetch(`http://localhost:8080/pet/${petId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${userStore.getToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("Failed to delete pet.");

                this.pets = this.pets.filter(pet => pet.id !== petId); // Remove pet from state
            } catch (error) {
                this.error = error.message;
                console.error("Error deleting pet:", error);
            }
        },

        async updatePetActivity(petId, activity) {
            console.log("Inside updatePetActivity");
            const userStore = useUserStore();
            if (!userStore.getUserId) return;

            this.loading = true;
            this.error = null;

            try {
                const response = await fetch(`http://localhost:8080/pet/${petId}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${userStore.getToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ activity }),
                });

                if (!response.ok) throw new Error("Failed to update pet activity.");

                const updatedPet = await response.json();

                // Update the pet in the store
                this.pets = this.pets.map(pet => pet.id === updatedPet.id ? updatedPet : pet);
            } catch (error) {
                this.error = error.message;
                console.error("Error updating pet activity:", error);
            } finally {
                this.loading = false;
            }
        },

        async playWithPet(petId) {
            return this.updatePetActivity(petId, "PLAY");
        },

        async feedPet(petId) {
            return this.updatePetActivity(petId, "FEED");
        }
    },
});

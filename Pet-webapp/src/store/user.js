import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import

export const useUserStore = defineStore("user", {
    state: () => ({
        logged: false,
        name: "",
        token: "",
        userId: "", // Store userId from JWT
        isLoginModalOpen: false, // ✅ Ensure this exists
        isRegisterModalOpen: false, // ✅ Ensure this exists
    }),
    actions: {
        setUserData(payload) {
            this.logged = true;
            this.name = payload.name;
            this.token = payload.token;

            // ✅ Decode JWT and extract userId
            try {
                const decoded = jwtDecode(payload.token);
                this.userId = decoded.userId; // Assuming userId is stored in JWT
            } catch (error) {
                console.error("Failed to decode JWT:", error);
            }

            localStorage.setItem("token", payload.token);
        },
        logout() {
            this.logged = false;
            this.name = "";
            this.token = "";
            this.userId = ""; // Reset userId
            this.isLoginModalOpen = false;
            this.isRegisterModalOpen = false;
            localStorage.removeItem("token");
        },
        toggleLoginModal(state) { // ✅ Ensure this exists
            this.isLoginModalOpen = state;
        },
        toggleRegisterModal(state) { // ✅ Ensure this exists
            this.isRegisterModalOpen = state;
        },
    },
    getters: {
        isLogged: (state) => state.logged,
        getName: (state) => state.name,
        getToken: (state) => state.token,
        getUserId: (state) => state.userId,
    },
});

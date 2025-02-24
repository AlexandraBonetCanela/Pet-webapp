import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        logged: false,
        name: "",
        token: "",
        isRegisterModalOpen: false,
        isLoginModalOpen: false// Manage modal state
    }),
    actions: {
        setUserData(payload) {
            this.logged = true;
            this.name = payload.name;
            this.token = payload.token;
            localStorage.setItem("token", payload.token);
        },
        logout() {
            this.logged = false;
            this.name = "";
            this.token = "";
            localStorage.removeItem("token");
        },
        toggleRegisterModal(state) {
            this.$patch({ isRegisterModalOpen: state }); // Ensure modal state updates
        },
        toggleLoginModal(state) {
            this.$patch({ isLoginModalOpen: state });
        },
    },
    getters: {
        isLogged: (state) => state.logged,
        getName: (state) => state.name,
        getToken: (state) => state.token,
    },
});

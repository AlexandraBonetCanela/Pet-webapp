import {defineStore} from "pinia";

export const useUserStore = defineStore('user', {
    state: ()=>{
        return {
            logged: true,
            name: 'Alexandra',
            token: 'fkefdsgklk',
        }
    },
    actions: {
        setUserData(payload) {
            this.logged = true;
            this.name = payload.name;
            this.token = payload.token;
        },
        logout(){
            this.logged = false;
            this.name = '';
            this.token = '';
        },
    },
    getters: {
        isLogged: (state) => state.logged,
        getName: (state) => state.name,
        getToken: (state) => state.token,
    },
});
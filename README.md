# 🐾 Pet App (Vue Frontend)  

## 🎯 Overview  
Welcome to the **Pet App**, a **Vue 3-based** frontend for managing virtual pets. This application provides an interactive interface for users to **create, feed, play, and track their pets**, seamlessly integrating with the **Pet API**.  This application uses both **Options api** and **Composition api**.

## 📌 Related Projects

There is also a **Hexagonal Architecture backend** for this project that you can find [here](https://github.com/AlexandraBonetCanela/Pet-api-hexagonal).

If you're interested in the **MVC version of the backend**, check it out [here](https://github.com/AlexandraBonetCanela/Pet-api-mvc).

## 🚀 Key Features  
✅ **Vue 3 with Options API** – Structured and easy-to-maintain frontend.  
✅ **REST API Integration** – Communicates with the **Pet API** for full pet management.  
✅ **Vuex / Pinia (Optional)** – Manages global state efficiently.  
✅ **SCSS Support** – Organized and reusable styles.  
✅ **Responsive Design** – Works on desktop and mobile devices.  
✅ **Axios for API Requests** – Handles HTTP requests efficiently.  

---

### **🛠 Technologies**  
- **Vue 3**  
- **Vite**  
- **Axios**  
- **SCSS**  

### **📦 Dependencies**  
- **Vue 3** (Core framework)  
- **Axios** (HTTP client)  
- **Pinia** (State management - if used)  
- **Lodash** (Optional utility functions)  

---

## 📖 **Project Structure**  

```plaintext
📦 src
│── 📂 assets          # Static assets (images, icons, etc.)
│── 📂 components      # Reusable Vue components
│── 📂 views          # Main pages/views
│── 📂 store          # Vuex/Pinia state management (if used)
│── 📂 services       # API calls (Axios)
│── 📜 App.vue        # Root component
│── 📜 main.js        # Entry file


## To run the application

```code
  cd Pet-webapp
```
```code
  npm install
```
```code
  npm run dev
```

## This frontend relies on the Pet API as the backend. To configure the API URL, update the .env file:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

## Snapshots

### Main Page
![Captura de pantalla 2025-03-07 a les 9 13 51](https://github.com/user-attachments/assets/4193dfd9-452e-4119-b0c7-bd46cfbbe799)

### Login Page
![Captura de pantalla 2025-03-07 a les 9 13 34](https://github.com/user-attachments/assets/0eaf194d-76c5-4ff5-b761-b94e1d1be7de)





import './assets/main.css'

import { getStorage } from 'firebase/storage'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: 'AIzaSyBVESzUe1dEQMco3W603xU5tfkVlSDKCKk',
    authDomain: 'vuemo-grasp.firebaseapp.com',
    projectId: 'vuemo-grasp',
    storageBucket: 'vuemo-grasp.appspot.com',
    messagingSenderId: '320551227573',
    appId: '1:320551227573:web:7a424f12eabf090951aefc',
    measurementId: 'G-NL7MFJW3QH'
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App);
app.config.globalProperties.$storage = storage;

app.use(router);
app.mount('#app');




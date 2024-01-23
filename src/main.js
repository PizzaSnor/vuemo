import './assets/main.css'
import '../dist/output.css'

import { getStorage } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


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
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp)

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App);

app.config.globalProperties.$db = db
app.config.globalProperties.$storage = storage;
app.config.globalProperties.$auth = auth;

app.use(router);
app.mount('#app');




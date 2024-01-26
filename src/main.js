import './assets/main.css'
import '../dist/output.css'

import { getStorage } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


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

onAuthStateChanged(getAuth(firebaseApp), (user) => {
  app.config.globalProperties.$db = getFirestore(firebaseApp);
  app.config.globalProperties.$storage = getStorage(firebaseApp);
  app.config.globalProperties.$auth = getAuth(firebaseApp);

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      const user = auth.currentUser;
  
      if (!user) {
        next('/Login');
      } else {
        next();
      }
    } else {
      next();
    }
  });

  app.use(router);
  app.mount('#app');
});




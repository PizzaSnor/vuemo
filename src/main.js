import './assets/main.css';
import '../dist/output.css';

import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBVESzUe1dEQMco3W603xU5tfkVlSDKCKk',
  authDomain: 'vuemo-grasp.firebaseapp.com',
  projectId: 'vuemo-grasp',
  storageBucket: 'vuemo-grasp.appspot.com',
  messagingSenderId: '320551227573',
  appId: '1:320551227573:web:7a424f12eabf090951aefc',
  measurementId: 'G-NL7MFJW3QH',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

// Add Vue global properties
app.config.globalProperties.$db = getFirestore(firebaseApp);
app.config.globalProperties.$storage = getStorage(firebaseApp);
app.config.globalProperties.$auth = getAuth(firebaseApp);

// Create a promise that resolves when the authentication state is checked
const authCheckPromise = new Promise((resolve) => {
  onAuthStateChanged(auth, (user) => {
    resolve(user);
  });
});

// Before resolving the app, check if the user is authenticated
router.beforeResolve(async (to, from, next) => {
  // Wait for the authentication check to complete
  const user = await authCheckPromise;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user) {
      // If the user is not authenticated, redirect to the login page
      next({ path: '/Login', query: { redirect: to.fullPath } });
    } else {
      // If the user is authenticated, proceed with the navigation
      next();
    }
  } else {
    // For routes that do not require authentication, proceed with the navigation
    next();
  }
});

// Mount the app once the authentication state has been checked
authCheckPromise.then(() => {
  app.use(router);
  app.mount('#app');
});
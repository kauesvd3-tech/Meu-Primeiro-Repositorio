import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"

import { getAuth } from 
"https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"

import { getFirestore } from 
"https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

const { initializeApp } = require('firebase/app');
const firebase = require("../config/firebase");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } = require('firebase/auth');
const firebaseConfig = require('../config/firebase');

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

async function signUp(email, password, displayName) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        await updateProfile(user, {
            displayName: displayName
        })

        console.log(`Usuário  registrado`)
        return userCredential.user;
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            return 'Email já cadastrado!';
        } else if (error.code === "auth/invalid-email") {
            return 'Email inválido!';
        } else {
            //await auth.currentUser.delete();
            return error.message;
        }
    }
}

async function signIn(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('logado')
    } catch (error) {
        return error.message
    }
}

module.exports = {
    signUp,
    signIn
};
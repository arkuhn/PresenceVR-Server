import firebase from 'firebase'


var config = {
    apiKey: "AIzaSyDF3kCQm2TH07c7sDVsJkb1K0Vk38fwf18",
    authDomain: "presencevr-ak.firebaseapp.com",
    databaseURL: "https://presencevr-ak.firebaseio.com",
    projectId: "presencevr-ak",
    storageBucket: "presencevr-ak.appspot.com",
    messagingSenderId: "786453047013"
};

firebase.initializeApp(config);

export var user = '';
export var isAuthenticated = false;
export const firebaseAuth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export function loginWithGoogle() {
    return firebaseAuth.signInWithRedirect(googleProvider)
    .then((result) => {
        isAuthenticated = true;
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log('here')
        console.log(user)
        console.log(isAuthenticated)
    })
    .catch((err) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
    });
}

export function logout() {
    return firebaseAuth.signOut();
}


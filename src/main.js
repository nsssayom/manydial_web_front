import {
    createApp,
    // eslint-disable-next-line no-unused-vars
    h
} from 'vue'
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "@/assets/css/style.css"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMicrophone, faCircle, faPlay, faUpload, faDownload, faKeyboard, faCheck, faCheckSquare, faTimesCircle, faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin, faTwitter, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons'

import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

import store from "./store";

library.add(faMicrophone);
library.add(faCircle);
library.add(faPlay);
library.add(faUpload);
library.add(faDownload);
library.add(faKeyboard);
library.add(faCheck);
library.add(faCheckSquare);
library.add(faFacebook);
library.add(faInstagram);
library.add(faTwitter);
library.add(faYoutube);
library.add(faTimesCircle);
library.add(faLinkedin);
library.add(faWhatsapp);
library.add(faArrowLeft);
library.add(faSpinner);

import AudioVisual from 'vue-audio-visual';

// Firebase credentials 
var firebaseConfig = {
    apiKey: "AIzaSyB5KUY_RkGVyTBgm9w8pKF1lCfdlJRL0jo",
    authDomain: "manydial.firebaseapp.com",
    projectId: "manydial",
    storageBucket: "manydial.appspot.com",
    messagingSenderId: "1064723673902",
    appId: "1:1064723673902:web:d311d78fccca508aab00bf",
    measurementId: "G-6BQ8VRW67G"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const app = createApp(App);
app.use(AudioVisual);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);

app.mount('#app');

/* createApp(App)
    .use(AudioVisual)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
 */
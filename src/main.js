import {
    createApp,
} from 'vue'
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "@/assets/css/style.css"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMicrophone, faCircle, faPlay, faUpload, faDownload, faKeyboard, faCheck, faCheckSquare, faTimesCircle, faArrowLeft, faSpinner, faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin, faTwitter, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons'

import VCalendar from 'v-calendar';

import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

import store from "./store";

// add font-awesome icons to library
library.add(faMicrophone, faCircle, faPlay, faUpload,
    faDownload, faKeyboard, faCheck, faCheckSquare,
    faFacebook, faInstagram, faTwitter,
    faYoutube, faTimesCircle, faLinkedin,
    faWhatsapp, faArrowLeft, faSpinner, faCheckCircle, faChevronCircleDown);


import AudioVisual from 'vue-audio-visual';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

// Firebase credentials 
var firebaseConfig = {
    apiKey: "AIzaSyDfW6JF6VBktJxW8CDlQksjumsTs84PrDg",
    authDomain: "manydial-c4ab2.firebaseapp.com",
    projectId: "manydial-c4ab2",
    storageBucket: "manydial-c4ab2.appspot.com",
    messagingSenderId: "707421704446",
    appId: "1:707421704446:web:62632c57553cbf09ba55af",
    measurementId: "G-Z895ENQJTB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics();

const app = createApp(App);
app.use(AudioVisual);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store);
app.use(VCalendar);

app.mount('#app');

/* createApp(App)
    .use(AudioVisual)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
 */
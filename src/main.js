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
import { faMicrophone, faCircle, faPlay, faUpload, faDownload, faKeyboard, faCheck, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

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

import AudioVisual from 'vue-audio-visual';

createApp(App)
    .use(AudioVisual)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')

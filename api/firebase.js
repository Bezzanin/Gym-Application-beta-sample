
import * as firebase from "firebase";

class Firebase {

    /**
     * Initialises Firebase
     */
    static initialise() {
        firebase.initializeApp({
            apiKey: "",
            authDomain: "",
            databaseURL: "",
            storageBucket: "",
            messagingSenderId: ""
        });
    }

}

module.exports = Firebase;
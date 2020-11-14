import firebase from "firebase";


export default class DataLoader {
    constructor() {
        const firebaseConfig = {

            apiKey: "AIzaSyD6DnGbVfdJlDJ_pEOUfDfTDJrA8j3lIs8",

            authDomain: "dv-inventory.firebaseapp.com",

            databaseURL: "https://dv-inventory.firebaseio.com",

            projectId: "dv-inventory",

            storageBucket: "dv-inventory.appspot.com",

            messagingSenderId: "130062240176",

            appId: "1:130062240176:web:ecbca5d29b37d25c6cee75"

        };
        firebase.initializeApp(firebaseConfig);
    }

    async loadData() {
        let places = this.loadPlaces();
        let inventories = this.loadInventory();
        return this.addInventoryToPlaces(places, inventories);
    }

    async loadPlaces() {
        const loadData = await firebase.firestore().collection("places").get();
        let places = [];
        loadData.forEach((x) => {
            let obj;
            obj = {
                id: x.id,
                name: x.data().name,
                parts: x.data().parts && x.data().parts.map(part => part.id)
            };
            places.push(obj);
        });
        return places;
    }

    async loadInventory() {
        const loadData = await firebase.firestore().collection("inventory").get();
        let inventories = [];
        loadData.forEach((x) => {
            let obj;
            obj = {
                id: x.id,

                name: x.data().name,

                count: x.data().count,

                place: x.data().place === undefined ? undefined : x.data().place.id
            };
            inventories.push(obj)
        });
        return inventories;
    }

    addInventoryToPlaces(places, inventories) {
        let equipmentMap = new Map();
        for (let el of inventories) {
            if (!equipmentMap.has(el.place)) {
                equipmentMap.set(el.place, [el]);
            } else {
                let arr = equipmentMap.get(el.place);
                arr.push(el);
                equipmentMap.set(el.place, arr)
            }
        }

        for (let o of places) {
            o.equipment = equipmentMap.get(o.id);
        }


    }
}
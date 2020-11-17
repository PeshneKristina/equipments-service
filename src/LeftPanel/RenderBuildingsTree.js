import {BuildingsTreeView} from "./BuildingsTreeView";
import React, {useEffect} from "react";
import firebase from "firebase";
import buildTree from "../BuildTree/BuildTree";


let firebaseConfig = {

    apiKey: "AIzaSyD6DnGbVfdJlDJ_pEOUfDfTDJrA8j3lIs8",

    authDomain: "dv-inventory.firebaseapp.com",

    databaseURL: "https://dv-inventory.firebaseio.com",

    projectId: "dv-inventory",

    storageBucket: "dv-inventory.appspot.com",

    messagingSenderId: "130062240176",

    appId: "1:130062240176:web:ecbca5d29b37d25c6cee75"

};

firebase.initializeApp(firebaseConfig);

export function RenderBuildingsTree() {

    const [places, setPlaces] = React.useState([]);
    const [inventories, setInventories] = React.useState([]);

    useEffect(() => {
        firebase.firestore().collection("places").get()
            .then(response => {
                let places = [];
                response.forEach((x) => {
                    let obj;
                    obj = {
                        id: x.id,
                        name: x.data().name,
                        parts: x.data().parts && x.data().parts.map(part => part.id)
                    };
                    places.push(obj);
                });
                setPlaces(places)
            })
    }, [])

    useEffect(() => {
        firebase.firestore().collection("inventory").get()
            .then(response => {
                let inventories = [];
                response.forEach((x) => {
                    let obj;
                    obj = {
                        id: x.id,

                        name: x.data().name,

                        count: x.data().count,

                        place: x.data().place === undefined ? undefined : x.data().place.id
                    };
                    inventories.push(obj)
                });
                setInventories(inventories)
            })
    }, [])

    let data = addInventoryToPlaces(places, inventories);
    let buildings = buildTree(data);

    return (
        <BuildingsTreeView buildings={buildings}/>
    )
}

export function addInventoryToPlaces(places, inventories) {
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

    return places;
}

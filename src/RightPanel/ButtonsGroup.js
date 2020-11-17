import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React from "react";
import firebase from "firebase";
import InputEditRow from "./InputEditRow";
import InputCreateRow from "./InputCreateRow";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    root:{
        width:"100%",
    },
    button: {
        color: "rgb(252,252,252)",
        borderColor: "rgb(252,252,252,0.75)"
    }
})

function isRoom(node) {
    return node.data.parts === undefined;

}

function ButtonsGroup({node, selectedRow, setSelectedRow, setEquipment,stateButtons, setStateButtons}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ButtonGroup id={"buttonGroup"} className={isRoom(node) ? "": "hidden"} size="large" color="primary">
                <Button className={classes.button} id="addButton" disabled={stateButtons.add}
                        onClick={() => addRow()}>Добавить</Button>
                <Button className={classes.button} id="deleteButton" disabled={stateButtons.delete}
                        onClick={() => deleteRow()}>Удалить</Button>
                <Button className={classes.button} id="editButton" disabled={stateButtons.edit}
                        onClick={() => editRow()}>Редактировать</Button>
            </ButtonGroup>
            <div id={"editInput"}>
                <InputEditRow updateRow={updateRow}/>
            </div>
            <div id={"addInput"}>
                <InputCreateRow createRow={createRow}/>
            </div>
        </div>

    )

    function deleteRow() {
        if (selectedRow === null) {
            return;
        }
        let filteredEquipments = [];
        let id;
        for (let equipment of node.data.equipment) {
            if (equipment.name === selectedRow.name) {
                id = equipment.id;
            } else {
                filteredEquipments.push(equipment);
            }
        }
        if (id !== null) {
            deleteFromFirebase(id);
        }
        selectedRow.elem.classList.remove("selected");
        setSelectedRow(null);
        node.data.equipment = filteredEquipments;
        setEquipment(filteredEquipments);

    }


    function editRow() {
        if (selectedRow === null) {
            return;
        }
        setStateButtons({delete: true, add: true, edit: false});

        let form = document.getElementById("editInput").querySelector("form");
        form.classList.remove("hidden");

    }

    function updateRow(value) {
        setStateButtons({delete: false, add: false, edit: false});
        let form = document.getElementById("editInput").querySelector("form");
        form.classList.add("hidden");
        let updatedEquipments = [];
        let id;
        for (let equipment of node.data.equipment) {
            if (equipment.name === selectedRow.name) {
                id = equipment.id;
                let newEquipment = {id: equipment.id, name: equipment.name, count: value.count, place: equipment.place}
                updatedEquipments.push(newEquipment);
            } else {
                updatedEquipments.push(equipment);
            }
        }
        if (id !== null) {
            editFirebase(id, value.count);
        }

        selectedRow.elem.classList.remove("selected");
        setSelectedRow(null);
        node.data.equipment = updatedEquipments;
        setEquipment(updatedEquipments);

    }

    function addRow() {
        let form = document.getElementById("addInput").querySelector("form");
        form.classList.remove("hidden");
        setStateButtons({delete: true, add: false, edit: true});
    }

    function createRow(value) {
        setStateButtons({delete: false, add: false, edit: false});
        let form = document.getElementById("addInput").querySelector("form");
        form.classList.add("hidden");
        let newEquipment = {
            id: generationId(),
            name: value.name,
            count: value.count,
            place: node.data.id
        }
        addToFirebase(newEquipment.name, newEquipment.count, newEquipment.place, newEquipment.id)
        if (node.data.equipment === undefined) {
            node.data.equipment = []
        }
        let updatedEquipment = node.data.equipment.concat(newEquipment);
        node.data.equipment = updatedEquipment;
        setEquipment(updatedEquipment);
    }

}

function deleteFromFirebase(id) {
    firebase.firestore().collection("inventory").doc(id).delete().then(() => {
        console.info("Done");

    });
}

function editFirebase(id, count) {
    firebase.firestore().collection("inventory").doc(id).set({
        count: count

    }).then(() => {
        console.info("Done");

    });
}

function addToFirebase(name, count, placeId, id) {
    firebase.firestore().collection("inventory").doc().set({
        name: name,
        count: count,
        place: firebase.firestore().collection("places").doc(placeId)
    }).then(() => {
        console.info("Done");

    });

}

function generationId() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = ''
    for (let i = 0; i < 20; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id

}

ButtonsGroup.propTypes = {
    node: PropTypes.object.isRequired,
    selectedRow: PropTypes.object,
    setSelectedRow: PropTypes.func.isRequired,
    setEquipment: PropTypes.func.isRequired,
    stateButtons:PropTypes.object,
    setStateButtons:PropTypes.func.isRequired
}

export default ButtonsGroup;
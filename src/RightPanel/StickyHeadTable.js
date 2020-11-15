import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import InputRow from "./InputRow";


const useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: "rgb(66,66,66,0.8)",
        maxWidth: 426,
        marginBottom: 10,

    },
    container: {
        maxHeight: 415,
        border: "1px solid rgb(252,252,252,0.75)",
        borderRadius: 4

    },
    TableCellHead: {
        color: "rgb(252,252,252)",
        backgroundColor: "rgb(66,66,66)",
        fontWeight: "bold"

    },
    h2: {
        color: "rgb(252,252,252)",
        textAlign: "center",
    },
    wrapperDiv: {
        maxWidth: 424,
        width: "100%",
        backgroundColor: "rgb(51,51,51,0.65)",
        padding: 10
    },
    TableCellBody: {
        color: "rgb(252,252,252)"
    }


});

const columns = [
    {id: 'name', label: 'Название', minWidth: 170},
    {
        id: 'count',
        label: 'Количество',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
];

function createData(name, count) {
    return {name: name, count: count};
}


const renderListEquipment = (node, listEquipment) => {
    if (node.data.equipment !== undefined) {
        node.data.equipment.map(el => listEquipment.push(el));

    }
    {
        Array.isArray(node.children) ? node.children.map(node => renderListEquipment(node, listEquipment)) : null
    }
}

function isRoom(node) {
    return node.data.parts === undefined;

}


export default function StickyHeadTable({node}) {
    const classes = useStyles();
    const [equipments, setEquipment] = React.useState(node.data.equipment);
    let selectedRow = null;
    let selectedElem = document.querySelector(".selected");
    if (selectedElem != null) {
        selectedElem.classList.remove("selected");
    }

    let listEquipment = [];
    renderListEquipment(node, listEquipment);

    const rows = listEquipment.length === 0 ? [createData("нет оборудования", null)] : listEquipment.map(equipment =>
        createData(equipment.name, equipment.count))

    return (
        <div className={classes.wrapperDiv}>
            <h2 className={classes.h2}>{node.data.name}</h2>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell className={classes.TableCellHead}
                                               key={column.id}
                                               align={column.align}
                                               style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => {
                                return (
                                    <TableRow onClick={(e) => selectRow(e, row.name)}
                                              key={rows.indexOf(row)} tabIndex={-1}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell className={classes.TableCellBody} key={column.id}
                                                           align={column.align}>

                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <div>

            </div>
            <ButtonGroup className={isRoom(node) ? "buttonGroup" : "hidden"} size="large" color="primary"
                         aria-label="large outlined primary button group">
                <Button onClick={() => addRow()}>Добавить</Button>
                <Button onClick={() => deleteRow()}>Удалить</Button>
                <Button onClick={() => editRow()}>Редактировать</Button>
            </ButtonGroup>
            <div id={"editInput"}>
                <InputRow updateRow={updateRow}/>
            </div>
            <div id={"addInput"}>
                <InputRow updateRow={createRow}/>
            </div>

        </div>

    );

    function selectRow(e, name) {
        if (e.currentTarget.classList.contains("selected")) {
            e.currentTarget.classList.remove("selected");
            selectedRow = null;
            return;
        }

        if (selectedRow !== null) {
            selectedRow.elem.classList.remove("selected");
        }
        e.currentTarget.classList.add("selected");
        selectedRow = {elem: e.currentTarget, name: name};

    }

    function deleteRow() {
        if (selectedRow === null) {
            return;
        }
        let filteredEquipment = node.data.equipment.filter(equipment => equipment.name !== selectedRow.name);
        selectedRow.elem.classList.remove("selected");
        selectedRow = null;
        node.data.equipment = filteredEquipment;
        setEquipment(filteredEquipment);

    }

    function editRow() {
        if (selectedRow === null) {
            return;
        }
        let form = document.getElementById("editInput").querySelector("form");
        form.classList.remove("hidden");
    }

    function updateRow(value) {
        let form = document.getElementById("editInput").querySelector("form");
        form.classList.add("hidden");
        let updatedEquipment = node.data.equipment.map(function (equipment) {
            return equipment.name === selectedRow.name ?
                {id: equipment.id, name: value.name, count: value.count, place: equipment.place} : equipment;
        });
        selectedRow.elem.classList.remove("selected");
        selectedRow = null;
        node.data.equipment = updatedEquipment;
        setEquipment(updatedEquipment);

    }

    function addRow() {
        let form = document.getElementById("addInput").querySelector("form");
        form.classList.remove("hidden");
    }

    function createRow(value) {
        let form = document.getElementById("addInput").querySelector("form");
        form.classList.add("hidden");
        let newEquipment = {
            id: generationId(),
            name: value.name,
            count: value.count,
            place: node.id

        }
        let updatedEquipment = node.data.equipment.concat(newEquipment);
        node.data.equipment = updatedEquipment;
        setEquipment(updatedEquipment);
    }

    function generationId() {
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let id = ''
        for (let i = 0; i < 20; i++) {
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return id

    }

}

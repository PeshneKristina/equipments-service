import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonsGroup from "./ButtonsGroup";
import PropTypes from 'prop-types';


const useStyles = makeStyles({

    root: {
        width: '100%',
        backgroundColor: "rgb(66,66,66,0)",
    },
    rightPanel:{
        marginRight: 120,
        width: 424,
        backgroundColor: "rgb(51,51,51,0.4)",
        padding: 10,
        marginTop: 30,
        borderRadius: 4
    },
    container: {
        boxSizing: "border-box",
        maxHeight: 425,
        border: "1px solid rgb(252,252,252,0.75)",
        borderRadius: 4,
        marginBottom: 10
    },

    TableCellHead: {
        color: "rgb(252,252,252)",
        backgroundColor: "rgb(66,66,66)",
        fontWeight: "bold"

    },
    h2: {
        color: "rgb(252,252,252)",
        textAlign: "center",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif"
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
    Array.isArray(node.children) ? node.children.map(node => renderListEquipment(node, listEquipment)) : null;
}


function EquipmentsTable({node}) {
    const classes = useStyles();
    const [equipments, setEquipment] = React.useState(node.data.equipment);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [stateButtons, setStateButtons] = React.useState({delete: false, add: false, edit: false});
    const [nodeId, setNodeId] = React.useState(node.data.id);
    if (nodeId !== node.data.id) {
        let selectedElem = document.querySelector(".selected");
        if (selectedElem !== null) {
            selectedElem.classList.remove("selected");
        }
        let editForm = document.getElementById("editInput").querySelector("form");
        if(!editForm.classList.contains("hidden")){
            editForm.classList.add("hidden");
            setStateButtons({delete: false, add: false, edit: false});
        }
        let createForm = document.getElementById("addInput").querySelector("form");
        if(!createForm.classList.contains("hidden")){
            createForm.classList.add("hidden");
            setStateButtons({delete: false, add: false, edit: false});
        }
        setNodeId(node.data.id);

    }

    let listEquipment = [];
    renderListEquipment(node, listEquipment);

    const rows = listEquipment.length === 0 ? [createData("нет оборудования", null)] : listEquipment.map(equipment =>
        createData(equipment.name, equipment.count))

    return (

        <div className={classes.rightPanel}>
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
                                                           align={column.align} value={value}>

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
                <ButtonsGroup node={node} selectedRow={selectedRow} setSelectedRow={setSelectedRow}
                              setEquipment={setEquipment} setStateButtons={setStateButtons} stateButtons={stateButtons}>
                </ButtonsGroup>
            </Paper>
        </div>


    );

    function selectRow(e, name) {
        let editForm = document.getElementById("editInput").querySelector("form");
        if(!editForm.classList.contains("hidden")){
            editForm.classList.add("hidden");
            setStateButtons({delete: false, add: false, edit: false});
        }
        let createForm = document.getElementById("addInput").querySelector("form");
        if(!createForm.classList.contains("hidden")){
            createForm.classList.add("hidden");
            setStateButtons({delete: false, add: false, edit: false});
        }

        if (e.currentTarget.classList.contains("selected")) {
            e.currentTarget.classList.remove("selected");
            setSelectedRow(null);
            return;
        }

        if (selectedRow !== null) {
            selectedRow.elem.classList.remove("selected");
        }
        e.currentTarget.classList.add("selected");
        setSelectedRow({elem: e.currentTarget, name: name});

    }

}

EquipmentsTable.propTypes = {
    node: PropTypes.object.isRequired
}

export default EquipmentsTable;




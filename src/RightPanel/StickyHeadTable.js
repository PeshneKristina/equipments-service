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
import Grid from "@material-ui/core/Grid";
import isRoom from "../EventFunction/isRoom";
import InputRow from "./InputRow";


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


export default function StickyHeadTable({node}) {
    const [equipments, setEquipment] = React.useState(node.data.equipment);

    let selectedRow = null;

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
        if(selectedRow===null){
            return;
        }
        let filteredEquipment = node.data.equipment.filter(equipment => equipment.name !== selectedRow.name);
        selectedRow.elem.classList.remove("selected");
        selectedRow = null;
        node.data.equipment = filteredEquipment;
        setEquipment(filteredEquipment);

    }

    function addRow(){

    }

    function editRow(){
        if(selectedRow===null){
            return;
        }
        let inp = document.querySelector("form");
        inp.classList.remove("hidden");
    }

    function updateRow(value){
        let form = document.querySelector("form");
        form.classList.add("hidden");
        console.log(node.data.equipment);
        for(let equipment of node.data.equipment){
            if(equipment.name === selectedRow.name){
               equipment.name = value.name;
               equipment.count = value.count;
            }
        }
        console.log(node.data.equipment);
        selectedRow.elem.classList.remove("selected");
        selectedRow = null;
        setEquipment(node.data.equipment);
    }

    let listEquipment = [];
    const renderListEquipment = (node) => {
        if (node.data.equipment !== undefined) {
            node.data.equipment.map(el => listEquipment.push(el));

        }
        {
            Array.isArray(node.children) ? node.children.map(node => renderListEquipment(node)) : null
        }
    }
    renderListEquipment(node);


    const rows = listEquipment.length === 0 ? [createData("нет оборудования", null)] : listEquipment.map(equipment =>
        createData(equipment.name, equipment.count))


    const classes = useStyles();

    return (
        <div className={classes.wrapperDiv}>
            <Grid>
                <h2 className={classes.h2}>{node.data.name}</h2>
            </Grid>
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
            <InputRow updateRow={updateRow}  />
        </div>

    );
}
//onClick={(e) => selectRow(index)}
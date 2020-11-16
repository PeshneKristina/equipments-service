import React, {useEffect} from 'react';
import ReactDOM from "react-dom";
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import StickyHeadTable from "../RightPanel/StickyHeadTable";



const useStyles = makeStyles({
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
    h1: {
        fontFamily: "Roboto, Helvetica, Arial, sans-serif"
    },
    leftPanel: {
        color: "rgb(252,252,252)",
        marginRight: 100,
        width: 400

    }
});



const renderListEquipment = (node, listEquipment) => {
    if (node.data.equipment !== undefined) {
        node.data.equipment.map(el => listEquipment.push(el));

    }
    {
        Array.isArray(node.children) ? node.children.map(node => renderListEquipment(node, listEquipment)) : null
    }
}

function getListEquipment(node) {
    let listEquipment = [];
    renderListEquipment(node, listEquipment);
    return listEquipment;
}
function showEquipment(props) {
    ReactDOM.render(<StickyHeadTable node={props} />, document.getElementById("equip"));
}

export default function MultiSelectTreeView({props}) {
    const classes = useStyles();
    const renderTree = (node) => (
        <TreeItem onClick={(e) => showEquipment(node)}
                  className={getListEquipment(node).length !== 0 ? "indicatorYes" : "indicatorNo"} key={node.data.id}
                  nodeId={node.data.id} id={node.data.id}
                  label={node.data.name}>
            {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}


        </TreeItem>
    );


    return (
        <div className={classes.leftPanel}>
            <h1 className={classes.h1}>Структура компании</h1>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                multiSelect
            >
                {props.map(building => renderTree(building))}
            </TreeView>
        </div>
    );
}

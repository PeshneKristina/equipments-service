import React from 'react';
import ReactDOM from "react-dom";
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import EquipmentsTable from "../RightPanel/EquipmentsTable";
import PropTypes from 'prop-types';


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
        marginLeft: 120,
        color: "rgb(252,252,252)"
    }
});

const renderListEquipment = (node, listEquipment) => {
    if (node.data.equipment !== undefined) {
        node.data.equipment.map(el => listEquipment.push(el));
    }
    Array.isArray(node.children) ? node.children.map(node => renderListEquipment(node, listEquipment)) : null;
}

export function getListEquipment(node) {
    if (node === undefined) {
        return []
    }
    let listEquipment = [];
    renderListEquipment(node, listEquipment);
    return listEquipment;
}

function showEquipment(node, setNodes) {
    ReactDOM.render(<EquipmentsTable node={node} setNodes={setNodes}/>, document.getElementById("equip"));
}

export function BuildingsTreeView({buildings}) {
    const [nodes, setNodes] = React.useState(buildings);
    if (nodes !== buildings) {
        setNodes(buildings);
    }

    const classes = useStyles();
    const renderTree = (node) => (
        <TreeItem onLabelClick={event => event.preventDefault()} onClick={(e) => showEquipment(node, setNodes)}
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
            >
                {buildings.map(building => renderTree(building))}
            </TreeView>
        </div>
    );
}


BuildingsTreeView.propTypes = {
    buildings: PropTypes.arrayOf(PropTypes.object).isRequired
}


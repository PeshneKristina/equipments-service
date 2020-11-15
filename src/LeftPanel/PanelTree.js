import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {showEquipment} from "../EventFunction/showEquipment";


const useStyles = makeStyles({
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },


});


export default function MultiSelectTreeView({props}) {

    const classes = useStyles();
    const renderTree = (nodes) => (

        <TreeItem onClick={(e) => showEquipment(nodes)}
                  className={nodes.data.equipment ? "indicatorYes" : "indicatorNo"} key={nodes.data.id}
                  nodeId={nodes.data.id}
                  label={nodes.data.name}>
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}


        </TreeItem>

    );

    return (
        <div>
            <h1>Структура компании</h1>
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

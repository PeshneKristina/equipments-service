import React from 'react';
import ReactDOM from "react-dom";
import StickyHeadTable from "../RightPanel/StickyHeadTable";


export function showEquipment(props) {
    ReactDOM.render(<StickyHeadTable node={props}/>, document.getElementById("equip"));

}


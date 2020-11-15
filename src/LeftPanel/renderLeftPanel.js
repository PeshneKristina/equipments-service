import MultiSelectTreeView from "./PanelTree";
import React from "react";
import ReactDOM from "react-dom";


export default function renderLeftPanel(data) {

    ReactDOM.render(<MultiSelectTreeView props={data}/>, document.getElementById("root"))


}
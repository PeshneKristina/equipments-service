import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";


const useStyles = makeStyles({
    root: {
        textAlign: "center",
        marginTop: 10

    },

    input: {
        border: "1px solid rgb(252,252,252,0.75)",
        color: "rgb(252,252,252)",
        backgroundColor: "rgb(51,51,51,0.5)",
        textAlign: 'left',
        paddingLeft: 10,
        boxSizing: "border-box",
        height: 40,
        width: "50%"
    },
    ok: {
        height: 40,
        width: "100%",
        backgroundColor: "rgb(66,66,66,0)",
        color: "rgb(252,252,252)",
        border: "1px solid rgb(252,252,252,0.75)",
        borderRadius: 4,
        marginTop: 10,

    }

});

function InputCreateRow({createRow}) {
    const classes = useStyles();
    const [name, setName] = React.useState("");
    const [count, setCount] = React.useState("");

    function submitValue(event) {
        event.preventDefault();
        if (name.trim() || count.trim()) {
            createRow({name, count});
            setName('');
            setCount('');
        }
    }

    return (
        <form className={classes.root + " " + "hidden"} onSubmit={submitValue}>
            <input placeholder="название" className={classes.input} value={name}
                   style={{borderRight: "none", borderRadius: "4px 0 0 4px"}}
                   onChange={event => setName(event.target.value)}/>
            <input placeholder="количество" className={classes.input} value={count}
                   style={{borderLeft: "none", borderRadius: "0 4px 4px 0"}}
                   onChange={event => setCount(event.target.value)}/>
            <button className={classes.ok} type="submit">Сохранить</button>
        </form>
    )

}

InputCreateRow.propTypes = {
    createRow: PropTypes.func.isRequired
}

export default InputCreateRow;
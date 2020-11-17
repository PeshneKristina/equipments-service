import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";



const useStyles = makeStyles({
    root:{
        textAlign:"center",
        marginTop:10
    },
    textField:{
        color: "rgb(252,252,252)",
        width: "50%",
        textAlign: 'left',
        marginRight:10,
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: 500,
        fontSize: 18


    },
    inputCount:{
        border: "1px solid rgb(252,252,252,0.75)",
        borderRadius: 4,
        height: 40,
        color: "rgb(252,252,252)",
        backgroundColor: "rgb(66,66,66,0.8)",
        width: "50%",
        textAlign: 'left',
        paddingLeft: 10
    },
    ok:{
        height: 40,
        width:"100%",
        backgroundColor: "rgb(66,66,66,0)",
        color: "rgb(252,252,252)",
        border: "1px solid rgb(252,252,252,0.75)",
        borderRadius: 4,
        marginTop:10
    }



});
function InputEditRow({updateRow}) {
    const classes = useStyles();
    const [count,setCount] = React.useState("");
    function submitValue(event) {
        event.preventDefault();
        if(count.trim()){
            updateRow({count});
            setCount('');
        }
    }

    return (
        <div>
            <form className={classes.root + " "+ "hidden"} onSubmit={submitValue}>
                <label className={classes.textField}>Введите количество: </label>
                <input placeholder="количество" className={classes.inputCount}
                       value={count} onChange={event => setCount(event.target.value)} />
                <button className={classes.ok}  type="submit" >Сохранить</button>
            </form>
        </div>


    )

}

InputEditRow.propTypes = {
    updateRow: PropTypes.func.isRequired
}

export default InputEditRow;
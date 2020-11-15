import Input from '@material-ui/core/Input';
import React from 'react';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    root:{
        textAlign:"center",
        marginTop:10
    },
    inputName:{
        border: "1px solid rgb(252,252,252,0.75)",
        borderRadius: "4px 0 0 4px",
        minHeight: 35,
        color: "rgb(252,252,252)",
        backgroundColor: "rgb(66,66,66,0.8)",
        minWidth: 206,
        textAlign: 'left',
        borderRight: "none"


    },
    inputCount:{
        border: "1px solid rgb(252,252,252,0.75)",
        borderRadius: "0 4px 4px 0",
        minHeight: 35,
        color: "rgb(252,252,252)",
        backgroundColor: "rgb(66,66,66,0.8)",
        minWidth: 206,
        textAlign: 'left',
        borderLeft:"none"
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
export default function InputRow({updateRow}) {
    const classes = useStyles();
    const [name,setName] = React.useState("");
    const [count,setCount] = React.useState("");
    function submitValue(event) {
        event.preventDefault();
        if(name.trim()||count.trim()){
            updateRow({name,count});
            setName('');
            setCount('');
        }
    }

    return (
        <div>
            <form className={classes.root + " "+"hidden"} onSubmit={submitValue}>
                <input placeholder="название" className={classes.inputName} value={name} onChange={event => setName(event.target.value)} />
                <input placeholder="количество" className={classes.inputCount} value={count} onChange={event => setCount(event.target.value)} />
                <button className={classes.ok} type="submit" >Сохранить</button>
            </form>
        </div>


    )

}
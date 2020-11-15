import Input from '@material-ui/core/Input';
import React from 'react';
import {makeStyles} from "@material-ui/core/styles";


// const useStyles = makeStyles({
//     root: {
//         height: 216,
//         flexGrow: 1,
//         maxWidth: 400,
//     },
//
//
// });
export default function InputRow({updateRow}) {
    // const classes = useStyles();
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
        <form className={"hidden"} onSubmit={submitValue}>
            <input value={name} onChange={event => setName(event.target.value)} />
            <input  value={count} onChange={event => setCount(event.target.value)} />
            <button type="submit" >ok</button>
        </form>

    )

}
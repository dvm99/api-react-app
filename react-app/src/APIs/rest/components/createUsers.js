import * as React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useState} from "react";


const styles = theme => ({
    submitButton: {
        fontSize: 'smaller',
        borderColor: '#fff',
        color: '#fff',
        background: '#550055',
        height: 60,
        justifyContent: 'center',
        marginTop: 80,
        width: '100%',
        '&:hover': {
            background: '#310131',
        },
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 400,
        height: 600,
        justifyContent: 'space-around',
        margin: '0 auto',
    },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AddUser(props) {
    const {classes} = props
    const [newUserData, setNewUserData] = useState({})
    const [showSnackbar, setShowSnackbar] = useState(false)

    const  onInput = (event) => {
        const objData = {...newUserData}
        objData[event.target.id] = event.currentTarget.value
        setNewUserData(objData)
    }

    async function postData(url = '', data) {
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json();
    }

    return (
        <div>
            <Typography>Fill in new user info:</Typography>
            <div>
                <form
                    className={classes.container}
                    onSubmit={e => {
                        e.preventDefault();
                        postData('http://localhost:5000/restAPI/', newUserData)
                            .then(data => {
                                console.log(data);
                            });
                        setShowSnackbar(true)
                    }}
                >
                    <TextField id="username" label="Username" onChange={onInput}/>
                    <TextField id="email" label="Email" onChange={onInput}/>
                    <TextField id="telephone" label="Telephone" onChange={onInput}/>
                    <TextField id="role" label="Role" onChange={onInput}/>
                    <TextField id="description" label="Description" onChange={onInput}/>
                    <Button
                        type="submit"
                        className={classes.submitButton}

                    >
                        Add User
                    </Button>
                </form>
                <Snackbar open={showSnackbar} autoHideDuration={6000}>
                    <Alert severity="success">
                        User has been created!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}




export default (withStyles(styles))(AddUser);
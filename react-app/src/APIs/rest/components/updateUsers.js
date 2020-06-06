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
    const [newId, setId] = useState(null)
    const [showSnackbar, setShowSnackbar] = useState(false)

    // Set form in put in the state
    const  onInput = (event) => {
        const objData = {...newUserData}
        objData[event.target.id] = event.currentTarget.value
        setNewUserData(objData)
    }

    // Set the Id in the state
    const generateId = (event) => {
        setId(event.currentTarget.value)
    }

    // Send PUt request to the REST api
    async function postData(url = '', data) {
        const response = await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response
    }
    const url = 'http://localhost:5000/restAPI/'+newId
    return (
        <div>
            <Typography>Select the ID of the user to be updated and fill in the updated user info:</Typography>
            <div>
                <form
                    className={classes.container}
                    onSubmit={e => {
                        e.preventDefault();
                        postData(url, newUserData)
                            .then(data => {
                                console.log(data);
                            });
                        setShowSnackbar(true)
                    }}
                >
                    <TextField id="id" label="id" onChange={generateId}/>
                    <TextField id="role" label="Role" onChange={onInput}/>
                    <TextField id="description" label="Description" onChange={onInput}/>
                    <Button
                        type="submit"
                        className={classes.submitButton}

                    >
                        Add User
                    </Button>
                </form>
                <Snackbar open={showSnackbar} autoHideDuration={3000}>
                    <Alert severity="success">
                        User has been updated!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}




export default (withStyles(styles))(AddUser);
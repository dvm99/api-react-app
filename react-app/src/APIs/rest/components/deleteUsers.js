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
    const [newId, setId] = useState(null)
    const [showSnackbar, setShowSnackbar] = useState(false)

    const generateId = (event) => {
        setId(event.currentTarget.value)
        console.log(newId)
    }

    async function postData(url = '',) {
        const response = await fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        return response
    }
    const url = 'http://localhost:5000/restAPI/'+newId
    return (
        <div>
            <Typography>Select the ID of the user to be deleted:</Typography>
            <div>
                <form
                    className={classes.container}
                    onSubmit={e => {
                        e.preventDefault();
                        postData(url)
                            .then(data => {
                                console.log(data); // JSON data parsed by `response.json()` call
                            });
                        setShowSnackbar(true)
                    }}
                >
                    <TextField id="id" label="id" onChange={generateId}/>
                    <Button
                        type="submit"
                        className={classes.submitButton}
                    >
                        Add User
                    </Button>
                </form>
                <Snackbar open={showSnackbar} autoHideDuration={3000}>
                    <Alert severity="success">
                        User has been deleted!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}




export default (withStyles(styles))(AddUser);
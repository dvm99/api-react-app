import * as React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";
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

const addUser = gql`
    mutation ($username: String! $email: String! $telephone: Int $role: String $description: String){
        newUser(
            username: $username,
            email: $email,
            telephone: $telephone,
            role: $role,
            description: $description,
            ){
        username
        email
        telephone
        role
        description
        }
    }
`;

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AddUser(props) {
    const {classes} = props
    // eslint-disable-next-line no-unused-vars
    const [addData, { data }] = useMutation(addUser);
    const [newUserData, setNewUserData] = useState({})
    const [showSnackbar, setShowSnackbar] = useState(false)

    const  onInput = (event) => {
        const objData = {...newUserData}
        objData[event.target.id] = event.currentTarget.value
        setNewUserData(objData)

    }

    return (
        <div>
            <Typography>Fill in new user info:</Typography>
            <div>
                <form
                    className={classes.container}
                    onSubmit={e => {
                        e.preventDefault();
                        addData({
                            variables: {
                                username: newUserData.username,
                                email: newUserData.email,
                                telephone: Number(newUserData.telephone),
                                role: newUserData.role,
                                description: newUserData.description
                            }
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
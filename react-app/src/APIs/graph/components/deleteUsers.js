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

const deleteUser = gql`
    mutation ($id: ID!){
        deleteUser(
            id: $id,
        ){
            id
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

function DeleteUser(props) {
    const {classes} = props
    // eslint-disable-next-line no-unused-vars
    const [addData, { data }] = useMutation(deleteUser);
    const [newUserData, setNewUserData] = useState({})
    const [showSnackbar, setShowSnackbar] = useState(false)

    const  onInput = (event) => {
        const objData = {...newUserData}
        objData[event.target.id] = event.currentTarget.value
        setNewUserData(objData)
    }

    return (
        <div>
            <Typography>Select the ID of the user to be deleted:</Typography>
            <div>
                <form
                    className={classes.container}
                    onSubmit={e => {
                        e.preventDefault();
                        addData({
                            variables: {
                                id: Number(newUserData.id),
                            }
                        });
                        setShowSnackbar(true)
                    }}
                >
                    <TextField id="id" label="id" onChange={onInput}/>
                    <Button
                        type="submit"
                        className={classes.submitButton}

                    >
                        Delete User
                    </Button>
                </form>
                <Snackbar open={showSnackbar} autoHideDuration={6000}>
                    <Alert severity="success">
                        User has been deleted!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}




export default (withStyles(styles))(DeleteUser);
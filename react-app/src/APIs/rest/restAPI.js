import * as React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GetUsers from "./components/getUsers";
import AddUser from "./components/createUsers";
import UpdateUser from "./components/updateUsers";
import DeleteUser from "./components/deleteUsers";

export const styles = theme => ({
    componentContainer: {
        display: 'flex',
    },
    buttonGroup: {
        width: 180,
        marginRight: 200,
    },
    button: {
        fontSize: 'smaller',
        borderColor: '#fff',
        color: '#fff',
        background: '#550055',
        height: 60,
        justifyContent: 'center',
        '&:hover': {
            background: '#310131',
        },
    },
    buttonSelected: {
        fontSize: 'smaller',
        borderColor: '#550055',
        color: '#550055',
        background: '#fff',
        height: 60,
        justifyContent: 'center',
        '&:hover': {
            background: '#acacac',
        },
    },
    card: {
        width: 800,
        height: 800,
    },
});





class GraphAPI extends React.Component {

    state = {
        currentView: 'read',
        isAddUserOpen: false,
    };

    switchCurrentType = (event) => {
        this.setState({currentView: event.currentTarget.value});
    };


    render() {
        const {classes} = this.props;

        const {currentView} = this.state

        return (
            <React.Fragment>
                <div className={classes.componentContainer}>
                    <ButtonGroup
                        className={classes.buttonGroup}
                        value={currentView}
                        orientation="vertical"
                        aria-label="vertical outlined primary button group"
                    >
                        <Button
                            value={'create'}
                            classes={{
                                root: classes.button,
                                disabled: classes.buttonSelected,
                            }}
                            onClick={this.switchCurrentType}
                            disabled={currentView === 'create'}
                        >Create</Button>
                        <Button
                            value={'read'}
                            classes={{
                                root: classes.button,
                                disabled: classes.buttonSelected,
                            }}
                            onClick={this.switchCurrentType}
                            disabled={currentView === 'read'}
                        >Read</Button>
                        <Button
                            value={'update'}
                            classes={{
                                root: classes.button,
                                disabled: classes.buttonSelected,
                            }}
                            onClick={this.switchCurrentType}
                            disabled={currentView === 'update'}
                        >Update</Button>
                        <Button
                            value={'delete'}
                            classes={{
                                root: classes.button,
                                disabled: classes.buttonSelected,
                            }}
                            onClick={this.switchCurrentType}
                            disabled={currentView === 'delete'}
                        >Delete</Button>
                    </ButtonGroup>

                    {/*Switch between CRUD pages*/}
                    <Card className={classes.card}>
                        <CardContent>
                            {currentView === "create" ?
                                <AddUser/>
                                : null
                            }
                            {currentView === "read" ?
                                <GetUsers/>
                                : null
                            }
                            {currentView === "update" ?
                                <UpdateUser/>
                                : null
                            }
                            {currentView === "delete" ?
                                <DeleteUser/>
                                : null
                            }
                        </CardContent>
                    </Card>


                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(GraphAPI);

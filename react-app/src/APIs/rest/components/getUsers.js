import * as React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
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
    table: {
        minWidth: 650,
    },
    tableHeader: {
        background: '#000',
        color: '#fff'
    },
    tableHeaderCell: {
        color: '#fff'
    },
});


class GetUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {apiResponse: ""};
    }

    callAPI() {
        fetch("http://localhost:5000/restAPI/")
            .then(res => res.text())
            .then(res => this.setState({apiResponse: res}));
    }

    componentWillMount() {
        this.callAPI();
    }

    render() {
        const {classes} = this.props

        let response = this.state.apiResponse
        const jsonString = '[{"id":0,"username":"Diego V.M.","email":"diego@pluxcustoms.nl","telephone":"+123123123","role":"Admin","description":"This person is admin"},{"id":1,"username":"Test User","email":"test@user.com","telephone":"+555000555","role":"Mod","description":"Lorem ipsum dolor sit amet"}]'
        const users = JSON.parse(response || jsonString)


        return (
            <div>
                <div>
                    <TableContainer>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className={classes.tableHeader}>
                                <TableRow>
                                    <TableCell className={classes.tableHeaderCell}>ID</TableCell>
                                    <TableCell className={classes.tableHeaderCell} align="right">Username</TableCell>
                                    <TableCell className={classes.tableHeaderCell} align="right">Email</TableCell>
                                    <TableCell className={classes.tableHeaderCell} align="right">Telephone</TableCell>
                                    <TableCell className={classes.tableHeaderCell} align="right">Role</TableCell>
                                    <TableCell className={classes.tableHeaderCell} align="right">Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right">{row.username}</TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{row.telephone}</TableCell>
                                        <TableCell align="right">{row.role}</TableCell>
                                        <TableCell align="right">{row.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        );
    }
}


export default (withStyles(styles))(GetUsers);
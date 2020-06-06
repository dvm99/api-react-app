import * as React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
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

const getUsers = gql`
    query {
        users {
            id
            username    
            email
            telephone
            role
            description    
            }
        }
`;


function GetUsers(props) {
    const { classes } = props;
    const {data, loading, error} = useQuery(getUsers);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;


    const users = data.users;

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


export default (withStyles(styles))(GetUsers);
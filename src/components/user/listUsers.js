import React, { useContext, useEffect, useState } from 'react'
//import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AuthContext from '../../store/auth-context';
import classes from '../feedback/Feedback.module.css';
import NotFound from '../notFound/NotFound';
import { Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import useHttp from '../../hooks/use-http';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';
const ListUsers = () => {

    const [rows, setRows] = useState([]);
    const [msg, setMessage] = useState('');
    const history = useHistory();
    const ctx = useContext(AuthContext);
    const configuration = {
        url: 'http://localhost:5000/users',
        headers: {
            'Authorization': `Bearer ${ctx.token}`,
            'Content-Type': 'application/json'

        }

    }
    /*
    const response = useFetch(configuration);
    const rows = response.data;
    //const rows = null;
    const loading = response.isLoading;
    const error = response.error;
 */
    const { isLoading: loading, error, sendRequest: fetchUsers } = useHttp();

    useEffect(() => {
        const handleFetchUsers = (data) => {
            setRows(data.users);
        }

        fetchUsers(configuration, handleFetchUsers)
    }, [msg])







    //const classes = useStyles();
    const { isLoading: uloading, error: uerror, sendRequest: deleteUser } = useHttp();


    const removeUser = async (id) => {

        const configuration = {
            url: 'http://localhost:5000/users/' + id,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + ctx.token,
                'Accept': '*/*'
            },

        }

        const handleDeleteUsers = (data) => {
            if (data.success) {
                history.push('/users/all')  
                setMessage('the user deleted succesfully');
                setTimeout(() => {
                    setMessage('')
                }, 3000);

            }
        }

        deleteUser(configuration, handleDeleteUsers);



    }

    return (
        <>
            {loading && <p> loading</p>}
            {error && <h3> {error}</h3>}
            {uerror && <p> {uerror}</p>}
            {uloading && <p> {uloading}</p>}

            {!rows && <NotFound />}

            {rows &&
                <TableContainer component={Paper}>
                    {rows.length === 0 && <h3> No data Found</h3>}
                    {msg && 
                    <Alert variant="filled" severity="success">
                     {msg}
                    </Alert>
                    }

                    <Table className={classes.table} aria-label="simple table">
                        <caption>A Table for listing all Users </caption>

                        <TableHead>
                            <TableRow className={classes.head} >
                                <TableCell>userName</TableCell>
                             
                                <TableCell align="center">Mobile</TableCell>

                                <TableCell align="center">email</TableCell>
                                <TableCell align="center">Card number</TableCell>

                                <TableCell align="center">Actions</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        {row.firstname+' '+row.lastname}
                                    </TableCell>
                            
                                    <TableCell align="center">{row.mobile}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.card_serial_number}</TableCell>

                                    <TableCell align="center">
                                        <Button onClick={() => removeUser(row._id)}
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<DeleteForeverIcon />}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            }
        </>
    );

}

export default ListUsers;


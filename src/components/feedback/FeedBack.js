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
import classes from './Feedback.module.css';
import NotFound from '../notFound/NotFound';
import { Button } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import useHttp from '../../hooks/use-http';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';
const FeedBack = () => {

    const [rows, setRows] = useState([]);
    const [msg, setMessage] = useState('');
    const history = useHistory();
    const ctx = useContext(AuthContext);
    const configuration = {
        url: 'http://localhost:5000/feedback',
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
    const { isLoading: loading, error, sendRequest: FeetchFeedback } = useHttp();

    useEffect(() => {
        const handleFeedBacks = (data) => {
            setRows(data);
        }

        FeetchFeedback(configuration, handleFeedBacks)
    }, [msg])







    //const classes = useStyles();
    const { isLoading: uloading, error: uerror, sendRequest: patchFeedback } = useHttp();


    const resolveUpdate = async (id) => {

        let formData = new FormData();

        formData.append('resolved', true);
        const configuration = {
            url: 'http://localhost:5000/feedback/' + id,
            method: 'PATCH',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + ctx.token,
                'Accept': '*/*'
            },

        }

        const handleUpdateFeedBacks = (data) => {
            if (data.resolved) {
                setMessage('the Feedback Resolved succesfully');
                history.push('/feedbacks')
                setTimeout(() => {
                    setMessage('')
                }, 3000);

            }
        }

        patchFeedback(configuration, handleUpdateFeedBacks);



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
                        <caption>A Table for listing all Feedbacks </caption>

                        <TableHead>
                            <TableRow className={classes.head} >
                                <TableCell>user Name</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Mobile</TableCell>

                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.resolved ? 'Resolved' : 'Not Resolved'}</TableCell>

                                    <TableCell align="center">{row.mobile}</TableCell>
                                    <TableCell align="center">{row.description}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => resolveUpdate(row._id)}
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<VerifiedUserIcon />}
                                        >
                                            Resolve
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

export default FeedBack;


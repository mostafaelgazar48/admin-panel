import React, { useContext, useEffect, useState } from 'react'
//import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AuthContext from '../../../store/auth-context';
import classes from '../../feedback/Feedback.module.css';
import NotFound from '../../notFound/NotFound';
import { Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CheckIcon from '@material-ui/icons/Check';
import useHttp from '../../../hooks/use-http';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';
const AllFacility = () => {

    const [rows, setRows] = useState([]);
    const [msg, setMessage] = useState('');
    const history = useHistory();
    const ctx = useContext(AuthContext);
    const configuration = {
        url: 'http://localhost:5000/facilities',
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
    const { isLoading: loading, error, sendRequest: fetchFacilities } = useHttp();

    useEffect(() => {
        const handleFetchFacilities = (data) => {
            setRows(data.facilities);
        }

        fetchFacilities(configuration, handleFetchFacilities)
    }, [msg])







    //const classes = useStyles();
    const { isLoading: uloading, error: uerror, sendRequest: deleteUser } = useHttp();


    const removeUser = async (id) => {

        const configuration = {
            url: 'http://localhost:5000/facility/' + id,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + ctx.token,
                'Accept': '*/*'
            },

        }

        const handleDeleteFacility = (data) => {
            if (data.success) {
                history.push('/facility/all')  
                setMessage('the user facility succesfully');
                setTimeout(() => {
                    setMessage('')
                }, 3000);

            }
        }

        deleteUser(configuration, handleDeleteFacility);



    }
        const addImage= (id)=>{
            history.push('/facility/addimage/'+id)
        }

        const editFacility = (id)=>{
            history.push('/facility/edit/'+id)
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
                                <TableCell>name</TableCell>
                             
                                <TableCell align="center">description</TableCell>

                                <TableCell align="center">facility type</TableCell>
                                <TableCell align="center">governorate</TableCell>
                                <TableCell align="center">address</TableCell>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Actions</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row._id} onClick={ () =>editFacility(row._id) } className={classes.row} >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                            
                                    <TableCell align="center">{row.description}</TableCell>
                                    <TableCell align="center">{row.facility_type}</TableCell>
                                    <TableCell align="center">{row.governorate}</TableCell>
                                    <TableCell align="center">{row.address}</TableCell>

                                    <TableCell align="center">{row.image ===''?( <Button onClick={() => addImage(row._id)}
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            startIcon={<AddPhotoAlternateIcon />}
                                        >
                                            Add Image
                                        </Button>):<CheckIcon style={{ color:'green' }} />}</TableCell>

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

export default AllFacility;


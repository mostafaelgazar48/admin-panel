import React, { useContext, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useFetch from '../../hooks/use-fetch';
import classes from './ListCategory.module.css';
import NotFound from '../notFound/NotFound';
import { Button } from '@material-ui/core';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router';
import useHttp from '../../hooks/use-http';
import { Alert } from '@material-ui/lab';

const ListCategory = (props) => {

    const [msg, setMessage] = useState('');
    const history = useHistory();
    const ctx = useContext(AuthContext);

    const configuration = {
        url: 'http://localhost:5000/category',
        headers: {
            'Content-Type': 'application/json'

        }

    }

  //  useFetch(()=>{},[])
    const response = useFetch(configuration);
    const rows = response.data;
    //const rows = null;
    const loading = response.isLoading;
    const error =response.error;
    let index =1;


    const { isLoading: uloading, error: uerror, sendRequest: deleteCategory } = useHttp();
    const removeCategory= (id)=>{
        const catConfiguration = {
            url: 'http://localhost:5000/category/'+id,
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${ctx.token}`,
                'Content-Type': 'application/json'
            }
    
        }

        const handleDelete = (data) => {
            if (data.success) {
                setMessage('the category deleted succesfully');
                history.push('/category')
                setTimeout(() => {
                    setMessage('')
                   
                }, 3000);

            }
        }

        deleteCategory(catConfiguration, handleDelete);
      

    }


    return (
        <>
        {loading && <p> loading</p> }
        {error && <h3> {error}</h3>}
        {uerror && <h3> {uerror}</h3>}
        {msg && 
                    <Alert variant="filled" severity="success">
                     {msg}
                    </Alert>}
        {!rows && <NotFound /> }
         {rows &&
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <caption>A Table for listing all Categories </caption>
              
                <TableHead>
                    <TableRow className={classes.head} >
                        <TableCell>id</TableCell>
                        <TableCell align="center">Name</TableCell>
                     {  window.location.pathname==='/category/all' &&   <TableCell align="center">Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {index++}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                          
                          { window.location.pathname==='/category/all' && <TableCell align="center">
                                        <Button onClick={() => removeCategory(row._id)}
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                           
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

}
        </>
    );

}

export default ListCategory;


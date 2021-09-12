import { TextField, Input, Button } from '@material-ui/core';
import React, { useContext, useState } from 'react'

import useHttp from '../../hooks/use-http';
import { useHistory } from 'react-router';
import AuthContext from '../../store/auth-context';
import { Alert } from '@material-ui/lab';
const AddUser = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastaName] = useState('');
    const [email, setEmail] = useState('');
    const [card_type, setCardType] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [cardSerialNumber, setCardSerialNumber] = useState('');
    const [points, setPoints] = useState('');
    const [msg, setMessage] = useState('');
    const history = useHistory();
    const ctx = useContext(AuthContext);





    const { isLoading, error, sendRequest: addUser } = useHttp();





    const submitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();

        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("email", email);
        formData.append("password", password);

        formData.append("mobile", mobile);
        formData.append("cardtype", card_type);
        formData.append("card_serial_number", cardSerialNumber);
        formData.append("points", points);

        const configuration = {
            url: 'http://localhost:5000/users',
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + ctx.token,
                'Accept': '*/*'
            },

        }

        const handdleAddUser = (data) => {
            if (data.success) {
                setMessage('user successfully created');
                setTimeout(() => {
                    setMessage('')
                }, 3000);

            }
        }

        addUser(configuration, handdleAddUser);



    }








    return (
        <div style={{   width:' 60%',
            margin: 'auto' }}>
            {error &&
                <Alert variant="filled" severity="error">
                    {error}
                </Alert>
            }
            {msg &&
                <Alert variant="filled" severity="success">
                    {msg}
                </Alert>
            }
            <form onSubmit={submitHandler}>
                <TextField
                    id="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    label="first name"
                    style={{ margin: 8 }}
                    placeholder="Facility name"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />


                <TextField
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastaName(e.target.value)}
                    label="Last Name"
                    style={{ margin: 8 }}
                    placeholder="Last Name"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />


                <TextField
                    id="address"
                    value={email}
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email Adress"
                    style={{ margin: 8 }}
                    placeholder="Email Address"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />

                <br />

                <TextField
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    label="mobile Number"
                    style={{ margin: 8 }}
                    placeholder="Mobile Number"
                    fullWidth
                    type='number'
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />

                <TextField
                    id="password"
                    value={password}
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    style={{ margin: 8 }}
                    placeholder="Password"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />

                <br />

                <TextField
                    id="cardtype"
                    value={card_type}
                    onChange={(e) => setCardType(e.target.value)}
                    label="Card Type"
                    style={{ margin: 8 }}
                    placeholder="Card Type"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />

                <TextField
                    id="cardserialnumber"
                    value={cardSerialNumber}
                    onChange={(e) => setCardSerialNumber(e.target.value)}
                    label="Card Serial Number"
                    style={{ margin: 8 }}
                    placeholder="Card Serial Number"
                    fullWidth
                    type='number'
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />





                <TextField
                    id="points"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    label="Points"
                    InputProps={{ inputProps: { min: 0 } }}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />





                <Button type='submit' style={{ display:'block',margin:'auto' ,marginTop:'5px'}} variant="contained" color="primary">
                    Submit
                </Button>


            </form>
        </div>

    );
};

export default AddUser;
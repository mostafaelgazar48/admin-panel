import { FormControl, MenuItem, TextField, InputLabel, Input, Button } from '@material-ui/core';
import classes from './FacilityForm.module.css'
import React, { useContext, useEffect, useState } from 'react'
import Category from './category/Category';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkIcon from '@material-ui/icons/Link';
import useHttp from '../../hooks/use-http';
import { useHistory, useParams } from 'react-router';
import AuthContext from '../../store/auth-context';
import { Alert } from '@material-ui/lab';
const FacilityForm = (props) => {

    const [type, setType] = React.useState('hospital');
    const [name,setName]= useState('');
    const [description,setDesc]= useState('');
    const [card_type,setCardType]= useState('');
    const [category,setCategory]= useState('');
    const [governorate,setGovernorate]= useState('');
    const [city,setCity]= useState('');
    const [area,setArea]= useState('');
    let [lat,setLat]= useState('');
    let [lng,setLng]= useState('');

    const [address,setAdress]= useState('');
    const [discount,setDiscount]= useState('');
    const [p_number,setPNumber]= useState('');
    const [facebook,setFacebook]= useState('');
    const [twiter,setTwitter]= useState('');
    const [instagram,setInstagram]= useState('');
    const [website,setWebsite]=useState('');
    const [msg, setMessage] = useState('');
    const history = useHistory();
    const ctx = useContext(AuthContext);
    let cat={};
    const categoryHandler =(data)=>{
        cat.category=data;
    }

    useEffect(() => {
        if(cat.category){
        setCategory(cat.category)
        }
    }, [cat])



  const { isLoading, error ,sendRequest:postFacility } = useHttp();

    



    const types = [
        {
            value: 'hospital',
            label: 'Hospital',
        },
        {
            value: 'clinic',
            label: 'Clinic',
        },
        {
            value: 'laboratory',
            label: 'Labs',
        }
    ];
    const submitHandler =(e)=>{
        e.preventDefault();
        let formData= new FormData();
            lat=Number(lat);
            lng= Number(lng) ;
        formData.append("name",name);
        formData.append("description",description);
        formData.append("city",city);
        formData.append("governorate",governorate);
        formData.append("area",area);
        formData.append("facility_type",type);
        formData.append("address",address);
        formData.append("card_type",card_type);
        formData.append("discount",discount);
        formData.append("priority_number",p_number);
        formData.append("facebook",facebook);
        formData.append("twitter",twiter);
        formData.append("instagram",instagram);
        formData.append("website",website);
        formData.append("category",category);
        formData.append("location.coordinates",lat);
        formData.append("location.coordinates",lng);


        
        formData.append("image",' ');

       // formData.append("location[lng]",lng);
      
        const configuration = {
            url: 'http://localhost:5000/facility',
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + ctx.token,
                'Accept': '*/*'
            },

        }

        const handlPostFacility = (data) => {
            if (data.success) {
                setMessage('the facility successfully added');
                history.push('/facility')
                setTimeout(() => {
                    setMessage('')
                }, 3000);

            }
        }

        postFacility(configuration, handlPostFacility);



    }


    

    


    const handleChange = (event) => {
        setType(event.target.value);
    };
 

    return (

        <div className={classes.container}>
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
                    id="filled-full-width"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    label="Facility Name"
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
                    id="filled-full-width"
                    value={card_type}
                    onChange={(e)=>setCardType(e.target.value)}
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
                    id="filled-full-width"
                    value={description}
                    onChange={(e)=>setDesc(e.target.value)}
                    label="Facility Description"
                    style={{ margin: 8 }}
                    placeholder="Facility Description"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />

                <div className={classes.select}>
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Select"
                        style={{ display: 'flex' }}
                        value={type}
                        onChange={handleChange}
                        helperText="Please select Facility Type"

                    >
                        {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>


                    <Category cat={categoryHandler} />
                </div>

                <TextField
                    label="Governorate"
                    value={governorate}
                    onChange={(e)=>setGovernorate(e.target.value)}
                    id="margin-none"
                    style={{ margin: '4px' }}
                    placeholder="Governorate"
                    className={classes.textField}

                />
                <TextField
                    label="City"
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}
                    id="margin-none"
                    style={{ margin: '4px' }}
                    placeholder="city"

                    className={classes.textField}

                />
                <TextField
                    label="Area"
                    value={area}
                    onChange={(e)=>setArea(e.target.value)}
                    id="margin-none"
                    style={{ margin: '4px' }}
                    placeholder="Area"
                    className={classes.textField}

                />
 

                <TextField
                    id="address"
                    value={address}
                    onChange={(e)=>setAdress(e.target.value)}
                    label="Facility Adress"
                    style={{ margin: 8 }}
                    placeholder="Address"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />

                <br />
                <TextField
          id="outlined-multiline-flexible"
          label="Lat"
          multiline
          maxRows={4}
          value={lat}
          onChange={(e)=>{setLat(e.target.value)}}
          variant="outlined"
        />

<TextField
          id="outlined-multiline-flexible"
          label="Lng"
          multiline
          maxRows={4}
          value={lng}
          onChange={(e)=>{setLng(e.target.value)}}
          variant="outlined"
          style={{ marginBottom:'15px',marginLeft:'8px' }}
        />
                <br />

                <TextField
                    id="outlined-number"
                    value={discount}
                    onChange={(e)=>setDiscount(e.target.value)}
                    label="Discount %"
                    InputProps={{ inputProps: { min: 0 } }}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />

                <TextField
                    id="outlined-number2"
                    label="Piriority Number"
                    type="number"
                    value={p_number}
                    onChange={(e)=>setPNumber(e.target.value)}
                    InputProps={{ inputProps: { min: 0 } }}
                    InputLabelProps={{
                        shrink: true,

                    }}
                    variant="outlined"
                />

            {/* Social Links */}
                <p>Social Links</p>

                <FormControl fullWidth style={{ marginBottom:'20px' }}>
          <InputLabel htmlFor="standard-adornment-amount">Facebook</InputLabel>
          <Input
           value={facebook}
           onChange={(e)=>setFacebook(e.target.value)}
            id="standard-adornment-amount"
            startAdornment={<FacebookIcon />}
          />
        </FormControl>
              
        <FormControl fullWidth style={{ marginBottom:'20px' }}>
          <InputLabel htmlFor="standard-adornment-amount">Twitter</InputLabel>
          <Input
           value={twiter}
           onChange={(e)=>setTwitter(e.target.value)}
            id="standard-adornment-amount"
            startAdornment={<TwitterIcon />}
          />
        </FormControl>

        <FormControl fullWidth style={{ marginBottom:'20px' }}>
          <InputLabel htmlFor="standard-adornment-amount">Instagram</InputLabel>
          <Input
           value={instagram}
           onChange={(e)=>setInstagram(e.target.value)}
            id="standard-adornment-amount"
            startAdornment={<InstagramIcon />}
          />
        </FormControl>


        <FormControl fullWidth style={{ marginBottom:'20px' }}>
          <InputLabel htmlFor="standard-adornment-amount">Website</InputLabel>
          <Input
           value={website}
           onChange={(e)=>setWebsite(e.target.value)}
            id="standard-adornment-amount"
            startAdornment={<LinkIcon />}
          />
        </FormControl>
                  
                   <Button type='submit' variant="contained" color="primary">
  Submit
</Button>
                  

            </form>
        </div>

    )

}


export default FacilityForm;
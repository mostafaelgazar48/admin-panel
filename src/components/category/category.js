import { Button, TextField } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../store/auth-context";
import ListCategory from "./ListCategory";
const Category = () => {

    const [enteredName, setEnteredName] = useState('');
    const nameIsValid = enteredName.trim() !== '';
    const history= useHistory()
  

    const changeNameHandler = (e) => {
        setEnteredName(e.target.value)


    }

    const ctx = useContext(AuthContext);

    const OnSubmitHandler = async (e) => {
    e.preventDefault()
        let formData = new FormData();
        if (!nameIsValid) {
            return;
        }

        formData.append('name', enteredName);
        console.log(formData);
        const response = await fetch('http://localhost:5000/category', {
            method: 'POST',
            body:formData,
            headers:{
                'Authorization':'Bearer '+ctx.token ,
                'Accept':'*/*'
            },

        })
        history.push('/category')

        const res= await response.json();
    }



    return (
        <>
            <div style={{ margin: 'auto' }} onSubmit={OnSubmitHandler}>
            
                <form >

                    <TextField
                        required
                        id="outlined-required"
                        label="Category"
                        placeholder="Category Name"
                        variant="outlined"
                        onChange={changeNameHandler}
                        name="name"

                    />

                    <Button disabled={!nameIsValid} variant="contained" color="primary" type="submit" style={{ margin: '10px' }} endIcon={<AddIcon />}>
                        Add
                    </Button>

                </form>
            </div>

            <ListCategory />
        </>
    )

}

export default Category;
import { MenuItem, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import classes from './Category.module.css'
const Category = (props)=>{


  
    const [category,setCategory] = useState('');
    const [categories,setCategories] = useState([])

    useEffect(()=>{
        fetch('http://localhost:5000/category')
      .then((res) => {
 
        if(res.ok){
         return res.json()
        }else{
          return res.json().then(response =>{
            
              throw Error('failed to authenticate')
          })
        }
      }).then(data =>{
        setCategories(data)
      }).catch(err =>{
        alert(err)
      })

    },[category])
    

      const handleChange = (event) => {
        setCategory(event.target.value);
    };
    props.cat(category);
return (
    <div className={classes.category}>
    <TextField
    id="standard-category"
    select
    label="Select"
    value={category}
    onChange={handleChange}
    helperText="Please select Category"

>
    {categories.map((option) => (
        <MenuItem key={option._id} value={option._id}>
            {option.name}
        </MenuItem>
    ))}
</TextField>
</div>
)

}

export default Category;
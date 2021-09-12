
import empty from '../../assets/empty.svg';
import classes from './NotFound.module.css';

const NotFound =()=>{
    return (
        <>
        <div  className={classes.center}>
          <h3>No Data Found</h3>
        <img className={classes.img} src={empty} alt="no data found" /></div>

        </>
    )
}

export default NotFound;
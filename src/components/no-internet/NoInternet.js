
import empty from '../../assets/warning.svg';
import classes from './NoInternet.module.css';

const NoInternet =()=>{
    return (
        <>
        <div  className={classes.center}>
          <h3>No Network Connection</h3>
        <img className={classes.img} src={empty} alt="no data found" /></div>

        </>
    )
}

export default NoInternet;
import classes from './home.module.css'
import { Link } from 'react-router-dom';

const Home = () => {
    return (


        <>
            <h2>Hi, Welcome back</h2>
            <ul className={classes.cards}>
                <li className={classes.cards_item}>
                    <div className={classes.card}>
                        <div className={classes.card_image}><img src="https://picsum.photos/500/300/?image=10" /></div>
                        <div className={classes.card_content}>
                            <h2 className={classes.card_title}>Add New Facility</h2>
                            <p className={classes.card_text}>to List All Facilities and Add New Facility please Click Button Below</p>
                            <Link to='/facility' className={`${classes.btn} ${classes.card_btn}`}>Click</Link>
                        </div>
                    </div>
                </li>

                <li className={classes.cards_item}>
                    <div className={classes.card}>
                        <div className={classes.card_image}><img src="https://picsum.photos/500/300/?image=10" /></div>
                        <div className={classes.card_content}>
                            <h2 className={classes.card_title}>Add New User</h2>
                            <p className={classes.card_text}>to List All Users Available and Add New User please Click Button Below</p>
                            <Link to='/adduser' className={`${classes.btn} ${classes.card_btn}`}>Click</Link>
                        </div>
                    </div>
                </li>


                <li className={classes.cards_item}>
                    <div className={classes.card}>
                        <div className={classes.card_image}><img src="https://picsum.photos/500/300/?image=10" /></div>
                        <div className={classes.card_content}>
                        <h2 className={classes.card_title}>Add New Category</h2>
                        <p className={classes.card_text}>to List All Categories and Add New category please Click Button Below</p>
                            <Link to='/category' className={`${classes.btn} ${classes.card_btn}`}>Click</Link>
                        </div>
                    </div>
                </li>
                
                <li className={classes.cards_item}>
                    <div className={classes.card}>
                        <div className={classes.card_image}><img src="https://picsum.photos/500/300/?image=10" /></div>
                        <div className={classes.card_content}>
                        <h2 className={classes.card_title}>Pending Feedbacks</h2>
                        <p className={classes.card_text}>to List All FeedBacks and Add resolve pending feedbacks please Click Button Below</p>
                            <Link to='/feedbacks' className={`${classes.btn} ${classes.card_btn}`}>Click</Link>
                        </div>
                    </div>
                </li>
            </ul>
        </>

    )
}


export default Home;
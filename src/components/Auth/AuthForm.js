import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';
import image from '../../assets/Untitled-1-01.png'
const AuthForm = () => {
  const emailRef= useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const ctx=useContext(AuthContext);
  const history = useHistory()


/*   const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
   
  };
 */
  const onSubmitHandler =(e) =>{
    
    let formData = new FormData();
  
    e.preventDefault()
    const  emailInput =emailRef.current.value;
    const passwordInput = passwordRef.current.value;
    formData.append('username', emailInput);
    formData.append('password', passwordInput);
    
      setIsLoading(true)
      fetch('http://localhost:5000/admin/login',{
        method:'POST',
        body:formData,
        Headers:{
        'Content-Type': 'multipart/form-data'
      }        
      })
      .then((res) => {
        setIsLoading(false)
        if(res.ok){
         return res.json()
        }else{
          return res.json().then(response =>{
            
              throw Error('failed to authenticate')
          })
        }
      }).then(data =>{
    ctx.login(data.token);
       history.replace('/');
      }).catch(err =>{
        alert(err)
      })

  }


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <div className ={classes.image}>
          <img src={ image} alt='logo of majesty'/>
        </div>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Username</label>
          <input type='text' id='email' required  ref={emailRef} />
        </div>
        <div  className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
       {!isLoading&&<button>{isLogin ? 'Login' : 'Create Account'}</button>}
       {isLoading && <p> Loading ...</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

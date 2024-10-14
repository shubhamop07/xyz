import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import InputControl from '../InputControl/InputControl';
import { auth } from '../../firebase';
import setUserLoggedin from '../../utils/LoggedInSender';

function Login(props) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    pass: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg('Please fill out all fields.');
      return;
    }
    setErrorMsg('');
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        setUserLoggedin();
        localStorage.setItem("user", true);
        navigate('/panel/dashboard');
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  const titleStyle = {
    color: '#2c3e50',
    fontWeight: '700',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.8rem',
  };

  return (
    <>
      <nav className="navbar navbar-bg navbar-expand-lg">
        <div className="container-fluid">
          <span style={titleStyle} className="navbar-brand">
            <span className="logo-full"></span>
          </span>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <span className="nav-link disabled" tabIndex="-1" aria-disabled="true">
                  Manage your energy consumption effectively
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className='home homeS'>
        <div className='container my-5 containerStyle'>
          <form>
            <h4 className='my-2'>Welcome Back - Login Again</h4>
            <div className='mb-3'>
              <InputControl
                className='form-control'
                label='Email'
                type='text'
                placeholder='Enter Your Email'
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </div>
            <div className='mb-3'>
              <InputControl
                className='form-control'
                label='Password'
                type='password'
                placeholder='Password'
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, pass: event.target.value }))
                }
              />
            </div>
            {errorMsg && <div className="errorMessage">{errorMsg}</div>}
          </form>
          <button
            disabled={submitButtonDisabled}
            onClick={handleSubmission}
            className="button"
          >
            Login
          </button>
          <p style={{ marginTop: '20px', textAlign: 'center' }}>
            Don't have an account?{' '}
            <span>
              <Link to='/signup' className='formLink'>
                Sign up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;

import { useMutation} from '@apollo/client';
import { Link, Form, useNavigate } from 'react-router-dom';
import { LOGIN } from '../../../graphql/mutations';
import LoadingPage from '../loading/LoadingPage';
import ErrorPage from '../error/ErrorPage';
import GuestLogin from './GuestLogin';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [errorDisplay, setErrorDisplay] = useState(null);
  
  const [login, { data, loading, error }] = useMutation(LOGIN, { onCompleted: () => navigate("/")});

  //if (loading) return <LoadingPage />;
  //if (error) return <ErrorPage />; //`Submission error! ${error.message}`;

  

  let input1;
  let input2;

  return (
    <div className="flex justify-center flex-1">
      <div className="flex flex-col h-screen pt-16 ">
        <div className='pb-10 pl-4'>
          <h1 className="font-semibold text-xl w-fit">
            Website Name
          </h1>
        </div>

        <div className='border rounded-md shadow-lg p-16 h-fit'>
          <Form className='flex flex-col w-96'
            onSubmit={e => {
              e.preventDefault();
              login({ 
                variables: {
                  email: input1.value,
                  password: input2.value
                }
              }).then((result) => {
                setErrorDisplay("");
              }).catch((err) => {
                console.log(Object.values(err));
                setErrorDisplay(err.message);
              });

              input1.value = '';
              input2.value = '';
            }}
          >
            <div className=''>
              <h2
              className="font-semibold text-2xl w-fit">
                Sign in to your account
              </h2>
              {<p className="h-6 mt-3 text-red-500">{errorDisplay}</p>}
            </div>
            <div className='mt-2 pb-1'>
              <label
              className="text-sm font-semibold w-fit"
              htmlFor="email">
                Email
              </label>
            </div>      
            <input 
            id="email" 
            name="email" 
            className='border-2 h-10 rounded-md px-2'
              ref={node => {
                input1 = node;
              }}
            />
            <div className='pt-3 pb-1'>
              <label
              className="text-sm font-semibold w-fit"
              htmlFor="password">
                Password
              </label>
            </div>
            <input 
            type='password'
            id="password" 
            name="password" 
            className='border-2 h-10 rounded-md px-2'
              ref={node => {
                input2 = node;
              }}
            />
            <button 
            className='border bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500
            text-slate-50 font-semibold py-3 rounded-md mt-12'
            type="submit">
              Continue
            </button>
          </Form>
            
          <GuestLogin />

        </div>

        <div className='flex w-full pt-8 pl-6'>
          <span className=' text-sm'>
            Don't have an account? 
          </span>
          <Link to="/signup" className="pl-1 text-sm text-purple-700 hover:underline" >
            <div className="flex w-32">
              <span>Sign up</span>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;

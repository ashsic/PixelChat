import { useMutation } from '@apollo/client';
import { Link, Form, useNavigate } from 'react-router-dom';
import { SIGNUP } from '../../../graphql/mutations';
import LoadingPage from '../loading/LoadingPage';
import ErrorPage from '../error/ErrorPage';
import GuestLogin from './GuestLogin';

export default function SignUpPage() {
  const navigate = useNavigate();
  
  const [signUp, { data, loading, error }] = useMutation(SIGNUP, { onCompleted: () => navigate("/login")}); 
  
  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />; //`Submission error! ${error.message}`; - pass error message as props to error page?

  let input1;
  let input2;
  let input3;
  let input4;

  return (
    <div className="flex justify-center flex-1">
      <div className="flex flex-col h-screen pt-16 ">
        <div className='pb-10 pl-4'>
          <h1 className="font-semibold text-xl w-fit">
            Website Name
          </h1>
        </div>

        <div className='border rounded-md shadow-lg  p-16 h-fit'>
          <Form className='flex flex-col w-96'
            onSubmit={e => {
              e.preventDefault();
              let fullName = input3.value.trim();
              let firstName;
              let lastName;

              let spaceIdx = fullName.indexOf(" ");

              if (spaceIdx === -1) {
                firstName = fullName;
                lastName = null;
              } else {
                firstName = fullName.slice(0, spaceIdx);
                lastName = fullName.slice(spaceIdx + 1);
              }

              signUp({ 
                variables: {
                  username: input1.value,
                  email: input2.value,
                  firstName: firstName,
                  lastName: lastName,
                  password: input4.value
                }
              }).then((result) => {
                console.log(result);
                console.log('logged in === true')
              }).catch((err) => {
                console.error(err);
              });

              input1.value = '';
              input2.value = '';
              input3.value = '';
              input4.value = '';
            }}
          >
            <div className='pb-4'>
              <h2
              className="font-semibold text-2xl w-fit">
                Sign up for an account
              </h2>
            </div>

            <div className='pt-3 pb-1'>
              <label
              className="text-sm font-semibold w-fit"
              htmlFor="username">
                Username
              </label>
            </div>    
            <input 
            required
            minLength={2}
            maxLength={20}
            pattern="^\S{2,20}$"
            title="Input must be 2 to 20 characters and contain no spaces."
            id="username" 
            name="username" 
            className='border-2 h-10 rounded-md px-2'
              ref={node => {
                input1 = node;
              }}
            />

            <div className='pt-3 pb-1'>
              <label
              className="text-sm font-semibold w-fit"
              htmlFor="email">
                Email
              </label>
            </div>    
            <input 
            required
            id="email" 
            name="email" 
            type="email"
            pattern="^[^@]+@[^@]+\.[^@]+$"
            className='border-2 h-10 rounded-md px-2'
              ref={node => {
                input2 = node;
              }}
            />

            <div className='pt-3 pb-1'>
              <label
              className="text-sm font-semibold w-fit"
              htmlFor="fullname">
                Full name
              </label>
            </div>    
            <input 
            required
            minLength={2}
            maxLength={20}
            id="fullname" 
            name="fullname" 
            className='border-2 h-10 rounded-md px-2'
              ref={node => {
                input3 = node;
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
            required
            minLength={8}
            maxLength={32}
            // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*?&]{8,}$"
            id="password" 
            name="password" 
            className='border-2 h-10 rounded-md px-2'
              ref={node => {
                input4 = node;
              }}
            />

            <button 
            className='border bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500
            text-slate-50 font-semibold py-3 rounded-md mt-12'
            type="submit">
              Sign up
            </button>
          </Form>
            
          <GuestLogin />

        </div>

        <div className='flex w-full pt-8 pl-6'>
          <span className=' text-sm'>
            Already have an account? 
          </span>
          <Link to="/login" className="pl-1 text-sm text-purple-700 hover:underline" >
            <div className="flex w-32">
              <span>Log in</span>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}

import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
        password
      }
    }
  }
`;

function Login() {
  let input1;
  let input2;
  const [login, { data, loading, error }] = useMutation(LOGIN);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="flex flex-col h-screen pt-16 ">

      <div className='pb-10 pl-4'>
        <h1 className="font-semibold text-xl w-fit">
          Website Name
        </h1>
      </div>

      <div className='border rounded-md shadow-lg  p-16 h-fit'>
        <form className='flex flex-col w-96'
          onSubmit={e => {
            e.preventDefault();
            login({ 
              variables: {
                email: input1.value,
                password: input2.value
              }
            }).then((result) => {
              console.log(result.data.login.token);
              localStorage.setItem('authToken', result.data.login.token);
            }).catch((err) => {
              console.error(err);
            });

            input1.value = '';
            input2.value = '';
          }}
        >
          <div className='pb-4'>
            <h2
            className="font-semibold text-2xl w-fit">
              Sign in to your account
            </h2>
          </div>
          <div className='pt-3 pb-1'>
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
        </form>
          
        <form action="" className='flex flex-col w-96'>
          <button 
          className='border bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-slate-50 font-semibold py-3 rounded-md mt-4'
          type="submit">
            Sign in with a guest account
          </button>
        </form>

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
  );
}

export default Login;

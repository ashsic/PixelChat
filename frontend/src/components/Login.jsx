import { gql, useMutation } from '@apollo/client';

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

      <div className='py-8 pl-5 '>
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
          <div className='py-4'>
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
          className='border bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-slate-50 font-semibold py-3 rounded-md mt-10'
          type="submit">
            Continue
          </button>

          <button type=''></button>
        </form>
      </div>

      <div>
        test
      </div>

    </div>
  );
}

export default Login;

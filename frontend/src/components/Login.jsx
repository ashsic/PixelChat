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
    <div className='border-2 border-slate-500 px-16'>
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
        <label
        className="text-sm font-semibold pt-3"
        htmlFor="email">
          Email
        </label>        
        <input 
        id="email" 
        name="email" 
        className='border-2 h-10 rounded-md px-2'
          ref={node => {
            input1 = node;
          }}
        />
        <label
        className="text-sm font-semibold pt-3"
        htmlFor="password">
          Password
        </label>
        <input 
        id="password" 
        name="password" 
        className='border-2 h-10 rounded-md px-2'
          ref={node => {
            input2 = node;
          }}
        />
        <button className='border bg-cyan-300 py-2 rounded-md mb-16 mt-10'
         type="submit">log in</button>
      </form>
    </div>
  );
}

export default Login;

import { Form, useNavigate } from "react-router-dom";
import { LOGIN } from "../../../graphql/mutations";
import { useMutation } from "@apollo/client";

export default function GuestLogin() {
  const navigate = useNavigate();
  const [login, { data, loading, error }] = useMutation(LOGIN, { onCompleted: () => navigate("/")});

  return (
    <Form className='flex flex-col w-96'
      onSubmit={e => {
        e.preventDefault();
        login({ 
          variables: {
            email: "use1r@example.com",
            password: "test"
          }
        }).then((result) => {
          console.log(result);
          console.log('logged in === true')
        }).catch((err) => {
          console.error(err);
        });
      }}
    >
      <button 
      className='border bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-slate-50 font-semibold py-3 rounded-md mt-4'
      type="submit">
        Sign in with a guest account
      </button>
    </Form>
  );
}

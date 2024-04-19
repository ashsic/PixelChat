import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // const error = useRouteError();
  // console.error(error);

  return (
    <div className="flex flex-col w-full justify-between h-screen items-center">
      <div></div>
      <div className="">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{"Unknown error."}</i>
      </p>
      </div>
      <div></div>
    </div>
  );
}
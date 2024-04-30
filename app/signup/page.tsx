import React from "react";
import { signUp } from "./actions";

const SignUp = () => {
  return (
    <div className="container mx-auto w-[400px] grid gap-4">
      <form className="grid grid-flow-row">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button
          formAction={signUp}
          className="btn btn-primary bg-[#0aa274] rounded place-self-center p-2 px-4"
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;

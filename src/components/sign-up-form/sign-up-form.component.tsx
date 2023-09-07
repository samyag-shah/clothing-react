import { useState, useContext } from "react";

import Button from "../button/button.component";
import FormInput from "../form-Input/formInput.component";

import "./sign-up-form.styles.scss";
import {
  createNewUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  cpassword: "",
};

const Signup = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, cpassword } = formFields;
  //const { setCurrentUser } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formFields.password !== formFields.cpassword) {
      alert("password does not match");
      return;
    }

    try {
      const response = await createNewUserWithEmailAndPassword(email, password);

      if (response) {
        let user = response.user;
        createUserDocumentFromAuth(user, { displayName });
        //setCurrentUser(user);
        setFormFields(defaultFormFields);
      }
    } catch (err) {
      console.error("user creation error", err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header-container">
        <h2>I do not have a account</h2>
        <p>Sign up with your email and password</p>
      </div>
      <form className="signup-form-container" onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputProps={{
            type: "text",
            required: true,
            name: "displayName",
            value: displayName,
            onChange: handleChange,
          }}
        />
        <FormInput
          label="Email"
          inputProps={{
            type: "email",
            required: true,
            name: "email",
            value: email,
            onChange: handleChange,
          }}
        />
        <FormInput
          label="Password"
          inputProps={{
            type: "password",
            required: true,
            name: "password",
            value: password,
            onChange: handleChange,
          }}
        />
        <FormInput
          label="Confirm Password"
          inputProps={{
            type: "password",
            required: true,
            name: "cpassword",
            value: cpassword,
            onChange: handleChange,
          }}
        />
        <div className="signup-button">
          <Button>Sign up</Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;

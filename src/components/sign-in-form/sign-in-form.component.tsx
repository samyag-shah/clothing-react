import { useState, useContext } from "react";

import Button from "../button/button.component";
import FormInput from "../form-Input/formInput.component";

import "./sign-in-form.styles.scss";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  email: "",
  password: "",
};

const Signin = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;
  //const { setCurrentUser } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    //const user = await signInWithGooglePopup();
    //await createUserDocumentFromAuth(user);
    //setCurrentUser(user);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      if (response) {
        //setCurrentUser(response.user);
        setFormFields(defaultFormFields);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-header-container">
        <h2>I already have an account</h2>
        <p>Sign in with your email and password</p>
      </div>

      <form className="signin-form-container" onSubmit={handleSubmit}>
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

        <div className="signin-button-container">
          <Button>Sign in</Button>
          <Button
            buttonProps={{
              type: "button",
              onClick: signInWithGoogle,
            }}
            buttonType="google"
          >
            google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signin;

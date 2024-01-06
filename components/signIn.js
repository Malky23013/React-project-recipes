import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import '../style/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
const schema = yup.object().shape({
  Username: yup.string().required("This field is required").min(3, "Username must contain at least 3 characters"),
  Name: yup.string().required("This field is required").min(2, "Name must contain at least 2 characters"),
  Phone: yup.string().required("This field is required").matches(/^\d+$/, "יש להזין ספרות בלבד"),
  Email: yup.string().required("This field is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "אימייל אינו תקין"),
  Tz: yup.string().required("This field is required").matches(/^\d+$/, "יש להזין ספרות בלבד"),
  Password: yup.string().required("This field is required").min(3, "Password must contain at least 3 characters"),
});
function SignIn() {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/api/user/sighin", data);
    dispatch({type:"SET_USER",user:response.data});
      console.log("succeed!!!!");
      console.log(data);
      // Redirect to signin page
      navigate("/home_page");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h1>הרשמה</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="Username"
          placeholder="name"
          {...register("Username")}
        />
        {errors.Username && <p>{errors.Username.message}</p>}

        <input
          type="text"
          name="Password"
          placeholder="password"
          {...register("Password")}
        />
        {errors.Password && <p>{errors.Password.message}</p>}

        <input
          type="text"
          name="Name"
          placeholder="שם"
          {...register("Name")}
        />
        {errors.Name && <p>{errors.Name.message}</p>}

        <input
          type="text"
          name="Phone"
          placeholder="phon number"
          {...register("Phone")}
        />
        {errors.Phone && <p>{errors.Phone.message}</p>}

        <input
          type="text"
          name="Email"
          placeholder="gmail"
          {...register("Email")}
        />
        {errors.Email && <p>{errors.Email.message}</p>}

        <input
          type="text"
          name="Tz"
          placeholder=" tz"
          {...register("Tz")}
        />
        {errors.Tz && <p>{errors.Tz.message}</p>}

        <button type="submit">sign in</button>
      </form>
    </div>
  );
}

export default SignIn;
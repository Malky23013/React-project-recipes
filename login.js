
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import './bootstrap.min.css';
import './App.css';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object().shape({
  Username: yup.string().required("This field is required").min(3, "Username must contain at least 3 characters"),
  Password:yup.string().required("This field is required").min(3, "Password must contain at least 3 characters"),
});
function Login() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/api/user/login", data);
      console.log("succeed!!!!");
      navigate("/home_page");
    dispatch({type:"SET_USER",user:response.data});
      const findUser = response?.data;
      console.log(findUser);
    } catch (error) {
      if (error.response?.status === 400) {
        navigate("/signIn");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
  <form id="form" onSubmit={handleSubmit(onSubmit)}>

  <div class="form-group">
  <label class="col-form-label mt-4" for="inputDefault">Username</label>
  
  <input class="form-control"  id="inputDefault"
          type="text"
          name="Username"
          placeholder="Username"
          {...register("Username")}
        />
        {errors.Username && <p className="error">{errors.Username.message}</p>}

</div>

<div class="form-group">
  <label class="col-form-label mt-4" for="inputDefault">Password</label>
  
  <input class="form-control"  id="inputDefault"
   
           type="text"
           name="Password"
           placeholder="Password"
           {...register("Password")}
         />
         {errors.Password && <p className="error">{errors.Password.message}</p>}
         <br></br>
        
         <button  type="submit" class="btn btn-primary">submit</button>
</div>

</form>
    </>

  );
}

export default Login;

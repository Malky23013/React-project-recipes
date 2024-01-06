import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Fragment } from "react";
import Menu from "./Menu";
import * as ActionType from './store/action'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
const ShoppingList = () => {
  const [myShoppingList, setMyShoppingList] = useState([]);
  const user = useSelector(state => state.user);
  const userId = user.Id;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(userId)
        const response = await axios.get(`http://localhost:8080/api/bay/${userId}`);
        console.log(response, userId)
        setMyShoppingList(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);

  const filteredList = myShoppingList.filter((item) => item.UserId == userId);
  const [formData, setFormData] = useState({
    Name: "",
    Count: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const delete_item = (item) => {
    const updatedList = myShoppingList.filter(x => x.Name !== item.Name);
   
    console.log(item.Id);
    // const response5 =  axios.post(`http://localhost:8080/api/bay/delete/:${item.Id}`);
    // console.log("succeed");
     setMyShoppingList(updatedList);
  };

  const onSubmit = async (e) => {

    console.log(e)
    const data = {
      Name: e.Name,
      Count: e.Count,
      UserId: userId,
      Id: 0,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/bay", data);

      if (response?.status === 400) {
        console.log("error 400")
      }
      else {
        const existingItem = myShoppingList.find(x => x.Name === data.Name);
        if (existingItem) {
          const updateList = [...myShoppingList];
          const findIndex = myShoppingList.findIndex(x => x.Name === data.Name);
          updateList[findIndex] = { ...existingItem, Count: data.Count };
          setMyShoppingList(updateList);
          axios.post("http://localhost:8080/api/bay/edit", data);
        }
        else {
          axios.post("http://localhost:8080/api/bay", data);
          const newList = [...myShoppingList, data];
          setMyShoppingList(newList);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Menu />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="Name"
          placeholder="Name"
          onChange={handleChange}
          {...register("Name", {
            required: "שדה זה הינו חובה",
            minLength: { value: 3, message: "שם משתמש צריך להכיל לפחות 3 תווים" },
          })}
        />
        {errors.Name && <p>{errors.Name.message}</p>}
        <input
          type="text"
          name="Count"
          placeholder="Count"
          onChange={handleChange}
          {...register("Count", {
            required: "שדה זה הינו חובה",
            pattern: {
              value: /^\d+$/,
              message: "יש להזין ספרות בלבד",
            },
          })}

        />
        {errors.Count && <p>{errors.Count.message}</p>}
        <button type="submit">Add or Edit</button>
      </form>
      <h2>My Shopping List</h2>
      <ul>
        {myShoppingList?.map((item) => (
          <Fragment key={item.Name}>
            <li>{item.Count} {item.Name}</li>
            <button onClick={() => delete_item(item)}>delete</button>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;

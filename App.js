import Home from './components/home_page'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyRecipes from './components/myRecipes';
import Login from './components/login';
import SignIn from './components/signIn';
import Hello from './components/hello_page';
import AddCategory from './components/addCategory';
import AddRecipe from './components/addRecipe';
import ShoppingList from './components/shoppingList';
import DetailsRecipe from './components/detailsRecipe'
import NewRecipe from './newRecipe';
import { useSelector } from 'react-redux';
const App = () => {
  const user=useSelector(state=>state?.user);
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/shoppingList" element={<ShoppingList />} />
        <Route path="/addRecipe" element={<AddRecipe/>} />
        <Route path="/newRecipe" element={<NewRecipe/>} />
        <Route path="/detailsRecipe" element={<DetailsRecipe/>} />
        <Route path="/addCategory" element={<AddCategory/>} />
        <Route path="/" element={<Hello />} />
        <Route path="/myRecipes" element={<MyRecipes  />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home_page" element={<Home />} />
      </Routes>

    </BrowserRouter>
  );
};

export default App;

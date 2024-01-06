import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import './RecipyDetails.css'
import Header from "./Header";

const RecipyDetails=()=>{
const user=useSelector(state=>state?.user);
  const location=useLocation();

  const AddProduct=(check, item)=>{
    if(check){
      axios.post("http://localhost:8080/api/bay", item)
      .then((x)=>{console.log(x.data);alert("נוסף");})
      .catch(err=>console.log(err))       
    }
  
  else
  DeleteProduct(item)
  }

  const DeleteProduct=(item)=>{
    console.log(user.Id)
    console.log(item.Id)
    axios.post(`http://localhost:8080/api/bay/delete/${user.Id}/${4}`)
      .then((x)=>{console.log(x.data);alert("נמחק");})
      .catch(err=>console.log(err))  
  }

  const props = location.state;

return(
    <>
    <div className="all">
    <Header/>
    <br/>
    <br/>
    <br/>
<div className="wrapp">
     <Card border="warning" style={{ width: '30rem', direction:"rtl",backgroundColor:'rgb(49, 45, 45)', color:'white' }}>
      <Card.Img variant="top" src={props.Img} style={{width:'25rem', height:'20rem', margin:'auto'}}/>
      <Card.Body>
        <Card.Title style={{fontSize:"4rem"}}>{props.Name}</Card.Title>
        <Card.Text style={{color:'white'}}>
         רמת קושי: {props.Difficulty}
        </Card.Text>
        <Card.Text style={{color:'white'}}>זמן הכנה: {props.Duration}</Card.Text>
        <Card.Text style={{color:'white'}}>
        {props.Description}
        </Card.Text >
        {props.UserId===user?.Id&&<Button variant="warning">מחיקה</Button>}
        {props.UserId===user?.Id&&<Button variant="warning">עריכה</Button>}
        <Card.Title style={{color:'white'}}>רכיבים:</Card.Title>
        <Card.Text style={{color:'white'}}>
        {props.Ingrident?.map((ingredient, index) => (
        <ul key={index}>         
       <input type="checkbox" onChange={(e)=>AddProduct(e.target.checked,{Id:ingredient.Id,Name:ingredient.Name,UserId:user.Id,Count:ingredient.Count})} />
          <li>{ingredient.Name}  {ingredient.Count}  {ingredient.Type}</li>
        </ul>
      ))}
        </Card.Text>
        <Card.Title style={{color:'white'}}>הוראות הכנה:</Card.Title>
      <Card.Text style={{color:'white'}}>
      <ol>
        {props.Instructions?.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
      </Card.Text>
      </Card.Body>
    </Card>
    </div>
    </div>
</>
)
}
export default RecipyDetails;
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Category = () => {
    const [nameCategory, setNameCategory] = useState("")

    const [IsAdd, setIsAdd] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([])
    useEffect(function () {
        axios.get("http://localhost:8080/api/category")
            .then(
                (x) => {
                    console.log(x.data)
                    setCategories(x.data)
                }
            ).catch(err => console.log(err)
            )
    }, [])
    const changeCategory = (cName) => {
        dispatch({ type: 'SET_CATEGORY', payload: cName });
        navigate('/recipies')
    }
    const AddCategory = () => {
        console.log(nameCategory)
        axios.post("http://localhost:8080/api/category", { Name: nameCategory })
            .then
            ((x) => {
                setCategories(cate => {
                    console.log([...cate, x.data])
                    return [...cate, x.data]
                })
                // navigate('/recipies')
                setIsAdd(false)
            }).catch(err => console.log(err))


    }
    return (
        <>
            <DropdownButton id="dropdown-item-button" title="קטגוריות">
                <Dropdown.Item as="button" onClick={() => setIsAdd(true)}>הוספה+</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => changeCategory(null)}>הכל</Dropdown.Item>
                {
                    categories.map((category) => (
                        <>
                            <Dropdown.Item as="button" onClick={() => changeCategory(category)}>{category.Name}</Dropdown.Item>
                        </>
                    ))
                }
            </DropdownButton>
            {IsAdd &&
                <div>
                    <input placeholder="name of category" onChange={(e) => setNameCategory(e.target.value)} />
                    <button onClick={() => AddCategory()}>הוסף</button>
                </div>
            }
        </>
    )
}
export default Category;
import axios from "axios";
import { useEffect, useState } from "react";

const MyComment = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(x => {
                setComments(x.data)
            })
            .catch(err => console.error(err))
            .finally()
        return () => {
        }
    }, [postId])


    return <ul>{comments.map(x => <li>{x.name}</li>)}</ul>
}

export default MyComment;
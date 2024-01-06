import axios from "axios";
import { useEffect, useState } from "react";
import Add from "./addPost";
import MyComment from "./comments";

const MyPost = ({ userId }) => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedpost] = useState();
    const [selectedEdit, setSelectedEdit] = useState();

    const [showAdd, setShowAdd] = useState(false)

    useEffect(() => {
        setSelectedpost(null)
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(x => {
                console.log(x.data)
                setPosts(x.data)
            })
            .catch(err => console.error(err))
            .finally()
        return () => {
        }
    }, [userId])

    const addPost = (post) => {
        const newPost = [...posts];
        newPost.push(post);
        setPosts(newPost);
        showAdd(false)
    }

    const EditPost = (post) => {
        const newPost = [...posts];
        const findIndex = newPost.findIndex(x => x.id === post.id)
        newPost[findIndex] = post;
        setPosts(newPost);
        setSelectedEdit(null)
    }

    return <>
        <ul>{posts.map(x => <li>
            <h6>{x.title}</h6>
            <p>{x.body}</p>
            {x.id === selectedEdit ? <Add post={x} addPost={EditPost} /> : null}
            <button onClick={() => setSelectedEdit(x.id)}>עריכה</button>
            <button onClick={() => setSelectedpost(x.id)}>הערות</button></li>)}
        </ul>

        {showAdd ? <Add userId={userId} addPost={addPost} /> :
            <button onClick={() => setShowAdd(true)}>הוספת חדש</button>}

        {setSelectedpost ? <MyComment postId={selectedPost} /> : null}
    </>
}

export default MyPost;
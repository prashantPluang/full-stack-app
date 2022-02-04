import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../App';
import {Link} from 'react-router-dom';
const Home = () => {
    const [data, setData] = useState([]);
    const {state, dispatch} = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:8000/allpost', {
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        })
        .then((res) => res.json())
        .then((result) => {
            //console.log(result);
            setData(result.posts);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    const likePost = (id) => {
        fetch('http://localhost:8000/like',{
            method: "put",
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postId: id
            })
        })
        .then((res) => res.json())
        .then((result) => {
            //console.log(result);
            const newData = data.map((item) => {
                if(item._id == result._id){
                    return result;
                }
                else{
                    return item;
                }
            })
            setData(newData);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    const unlikePost = (id) => {
        fetch('http://localhost:8000/unlike',{
            method: "put",
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postId: id
            })
        })
        .then((res) => res.json())
        .then((result) => {
            const newData = data.map((item) => {
                if(item._id == result._id){
                    return result;
                }
                else{
                    return item;
                }
            })
            setData(newData);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    const comment = (text, id) => {
        fetch('http://localhost:8000/comment',{
            method: "put",
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text,
                postId: id
            })
        })
        .then((res) => res.json())
        .then((result) => {
            const newData = data.map((item) => {
                if(item._id == result._id){
                    return result;
                }
                else{
                    return item;
                }
            })
            setData(newData);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    const deletePost = (id) => {
        console.log("bvhj");
        fetch(`http://localhost:8000/deletepost/${id}`, {
            method: "delete",
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            const newData = data.filter(item=>{
                return item._id !== result._id;
            })
            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className='home'>
            {
                data.map((item) => {
                    return (
                        <div className='card home-card' >
                            <p style={{padding:"5px"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link> {item.postedBy._id == state._id 
                            && <i className="material-icons" style={{
                                float:"right"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>

                            }</p>
                            <div className='card-image'>
                                <img style={{height: "400px"}}src={item.photo} alt='homepic'/>
                            </div>
                            <div className='card-content'>
                                <i className="material-icons" style={{color: 'red'}}>favorite</i>
                                {item.likes.includes(state._id)
                                ?
                                <i className="material-icons"
                                onClick={() => {unlikePost(item._id)}}
                                >thumb_down</i>
                                :
                                <i className="material-icons" 
                                onClick={() => {likePost(item._id)}}
                                >thumb_up</i>
                                }
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map((record) => {
                                        return (
                                            <h6><span style={{fontWeight:"500"}}>{record.postedBy.name}</span>{ record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    comment(e.target[0].value,item._id);
                                    }}>
                                    <input type='text' placeholder='add comment'/>
                                </form>
                                
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home;
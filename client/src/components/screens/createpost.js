import React, {useState, useEffect} from 'react';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    useEffect(() => {
        if(url){
            fetch("http://localhost:8000/createpost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title,
                body,
                pic: url
            })
            })
            .then((res) => res.json())
            .then((data) => {
                if(data.error){
                    M.toast({html: data.error, classes: "#c62828 red darken-3"});
                }
                else{
                    M.toast({html: "Post Created", classes: "#43a047 green darken-1"});
                    navigate('/');
                }
            })
        }
    }, [url]);

    const postDetails = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "my-insta-cloud");
        data.append("cloud_name", "pc-cloud");
        fetch('https://api.cloudinary.com/v1_1/pc-cloud/image/upload', {
            method: "post",
            body: data
        })
        .then((res) => res.json())
        .then((data) => {
            setUrl(data.url);
        })
        .catch((err) => {
            console.log(err);
        })
        
    }
    return (
        <div className='card input-filed' style={{margin: "10px auto", maxWidth:"500px", padding: "20px", textAlign: "center"}}>
            <input type='text' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type='text' placeholder='body' value={body} onChange={(e) => setBody(e.target.value)}/>
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effecr waves-light" onClick={()=> postDetails()}>Submit Post</button>
        </div>
    )
}

export default CreatePost;
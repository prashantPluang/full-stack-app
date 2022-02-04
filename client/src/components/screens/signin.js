import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from '../../App';
import M from 'materialize-css';

const SignIn = () => {
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const postdata = () => {
        fetch("http://localhost:8000/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email,
            })
        })
        .then((res => res.json()))
        .then((data) => {
            if(data.error){
                M.toast({html: data.error,classes: "#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                dispatch({type: "USER", payload: data.user});
                M.toast({html: "LoggedIn Successfully",classes: "#43a047 green darken-1"})
                navigate('/');
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='mycard'>
            <div className="card auth-card">
            <img style={{height: "100px" , width: "100px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRESAKTzdu3m_6FvuNXGGoWkdPKiHLp7tPznA&usqp=CAU" alt="instagram-logo"/>
                <h2>Instagram</h2>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="btn waves-effecr waves-light #1e88e5 blue darken-1" onClick={() => postdata()}>Login</button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default SignIn;
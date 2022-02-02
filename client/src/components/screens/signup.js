import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const postdata = () => {
        fetch("http://localhost:8000/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
            })
        })
        .then((res => res.json()))
        .then((data) => {
            console.log(data);
        })
    }

    return (
        <div className='mycard'>
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="btn waves-effecr waves-light" onClick={() => postdata()}>SignUp</button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default SignUp;
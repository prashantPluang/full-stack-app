import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from '../../App';

const Profile = () => {
    const [mypics, setPics] = useState([]);
    const {state, dispatch} = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:8000/mypost',{
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        })
        .then((res) => res.json())
        .then((result) => {
            setPics(result.mypost);
        })
    },[])

    return (
        <div style={{maxWidth:"550Px", margin:"0px auto"}}>
            <div style={{display: "flex", justifyContent: "space-around", margin: "18px 0px", borderBottom: "1px solid grey"}}>
                <div>
                    <img style={{width: "160px", height:"160px", borderRadius:"80px"}}
                    src="https://imageio.forbes.com/specials-images/imageserve/6170e01f8d7639b95a7f2eeb/Sotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs/0x0.png?fit=bounds&format=png&width=960" 
                    alt="profilepic"
                    />
                </div>
                <div>
                    <h4>{state?state.name:"..."}</h4>
                    <div style = {{display: "flex", justifyContent:"space-between", width:"108%"}}>
                        <h6>6 posts</h6>
                        <h6>400 followers</h6>
                        <h6>368 following</h6>
                    </div>
                </div>
            </div>
            <div className='gallery'>
                {
                    mypics.map((item) => {
                        return(
                            <img className='item' src={item.photo} alt={item.title}/>
                        )
                    })
                }
                 
            </div>
        </div>
    )
}

export default Profile;
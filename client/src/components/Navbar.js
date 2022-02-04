import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const {state,dispatch} = useContext(UserContext);
  const navigate = useNavigate();
  const renderList = () => {
    if(state){
      return [
        <li><Link to='/profile'>Profile</Link></li>,
        <li><Link to='/createpost'>CreatePost</Link></li>,
        <li><button className="btn #c62828 red darken-3" 
            onClick={() => {
              localStorage.clear(); 
              dispatch({type:"CLEAR"});
              navigate('/signin');
            }}>
            Logout
            </button>
        </li>
      ]
    }
    else{
      return [
        <li><Link to='/signin'>Login</Link></li>,
        <li><Link to='/signup'>Signup</Link></li>
      ]
    }
  }

  return(
    <nav>
      <div className='nav-wrapper white'>
        <img style={{margin: "10px",height: "40px" , width: "40px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRESAKTzdu3m_6FvuNXGGoWkdPKiHLp7tPznA&usqp=CAU" alt="instagram-logo"/>
        <Link to={state?'/':'/signin'} className='brand-logo left'>Instagram</Link>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          {renderList()}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;
import React, {useEffect, createContext, useReducer, useContext} from 'react';
import NavBar from './components/Navbar';
import './App.css';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import Home from './components/screens/home';
import SignIn from './components/screens/signin';
import SignUp from './components/screens/signup';
import Profile from './components/screens/profile';
import CreatePost from './components/screens/createpost';
import {reducer, initialState} from './reducers/userReducer'

export const UserContext = createContext();


const Routing = () => {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER", payload: user});
      //navigate('/');
    }
    else{
      navigate('/signin');
    }
  },[])
  return(
    <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createpost" element={<CreatePost />} />
        
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
          <NavBar />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>  
    );
}

export default App;

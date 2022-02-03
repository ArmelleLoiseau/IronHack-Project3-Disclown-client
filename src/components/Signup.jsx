import axios from 'axios';
import React, {useState} from 'react';
import APIHandler from '../api/APIHandler';

const Signup = () => {
const [user, setUser]=useState({
    username : "test",
    email : "test@test.fr",
    password : "1234"
});
const navigate = useNavigate();

const handleSubmit = async () => {
    e.preventDefault();
    try {
    await APIHandler.post('/signup', user)
    console.log("OK")
    navigate("/login")
    }
    catch(e){
        console.error(e)
    }
}



  return <div>
      <form onSubmit={handleSubmit} onChange={setUser}>
      <label htmlFor="username">username</label>
      <input type="text"  name='username' value={user.username}/>
      <label htmlFor="email">email</label>
      <input type="text" name='email' value={user.email} />
      <label htmlFor="password">password</label>
      <input type="text" name='password' value={user.password}/>
      <button>Sign up</button>
      </form>
  </div>;
};

export default Signup;

import React from 'react';

const Login = () => {
    const [user, setUser]=useState({
        username : "test",
        password : "1234"
    });

    const handleSubmit = async () => {
        e.preventDefault();
        try {
        await APIHandler.post('/signup', user)
        console.log("OK")
        }
        catch(e){
            console.error(e)
        }
    }

  return <div>
       <form onSubmit={handleSubmit} onChange={setUser}>
      <label htmlFor="email">email</label>
      <input type="text" name='email' value={user.email} />
      <label htmlFor="password">password</label>
      <input type="text" name='password' value={user.password}/>
      <button>Sign up</button>
      </form>
  </div>;
};

export default Login;


import {useState} from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")


  async function  userLogin(event){
    event.preventDefault(); //prevent default form redirect behavior
    const response = await fetch("http://localhost:1337/login", {
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    

    })

    const data = await response.json()

    console.log(data)

    if (data.user) {
			localStorage.setItem('token', data.user)
      localStorage.setItem('isAuthenticated', true)
			alert('Login successful')
			window.location.href = '/dashboard'
		} else {
			alert('Please check your username and password')
		}
	}

  

  return (
    <div>
      <h1>Login</h1>
    
    <form onSubmit={userLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

        <input type="submit" value="Login"/>
    </form>

    </div>
  );
}

export default Login;

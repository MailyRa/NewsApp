import React, {useState} from "react";
import Router from "react-dom";
import './App.css';
import { 
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  

} from 'react-router-dom'; 
import {
  Button,
  Form,
} from 'react-bootstrap'


//Homepage
function Homepage() {

  let history = useHistory()

  const newUser = (e:any) =>{
    history.push("/create_user")
  }
  return (
    <div>
      <h1>News Feed </h1>
      <Button className="homepage-button" variant= "primary" type= "submit" size= "lg" onClick={newUser}>Sign up</Button>
    </div>
  )
}


//Sign up Page 
function CreateUser(){
  let history = useHistory();

  const[fname, setFname] = useState('');
  const[lname, setLname] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const createUser = () => {

    const user = {'firstName': fname, 'lastName': lname, 'email': email, 'password': password}
    if (fname === "" || lname === "" || email === "" || password === "") {
      alert('Must Complete Form');
      return
    }
    fetch ('/sign_up', {
      method:'POST',
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then((data) => {
      if ("error" in data){
        alert(data["error"])
      } else {
        history.push('/')
      }
    })

  }

  return (
    <div>
     <h1> Sign up </h1>
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" placeholder="First Name" onChange={(e) => setFname(e.target.value)} value={fname} />
    <Form.Control type="text" placeholder="Last Name" onChange={(e) => setLname(e.target.value)} value={lname}/>
    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
    <Button variant="primary" onClick={createUser} type="submit"> Submit </Button>
    </div>

  )

}


function Login() {

  let history = useHistory();

  const [email, setEmail] = useState<any | null>(null);
  const [password, setPassword] = useState<any | null>(null);

  const handleLogIn = () => {
    const user = {"email": email, "password": password}

    fetch("/handle_login", {
      method: "POST",
      body:JSON.stringify(user),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },


    })
    .then(response => response.json())
    .then((data) => {
      if("error" in data) {
        alert(data["error"])
      } else {
        window.location.href = "/";
      }
    })
  }


  return (
    <form>
      <title> Log in </title>
      <label>
        Email:
        <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email}/>
      </label>
      <label>
        Password:
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
      </label>
      <input type="submit" onClick={handleLogIn} value="Submit" />
    </form>

  )
 
}



function App() {
  
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/create_user">
            <CreateUser/>
          </Route>
          <Route path="/">
            <Homepage/>
          </Route>

        </Switch>
    </BrowserRouter>
  );
}



export default App;

import React, {useState, useEffect} from "react";
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
  CardDeck,
  Form,
  Nav,
  Navbar,
} from 'react-bootstrap';

import Card from 'react-bootstrap/Card';
// import 'bootstrap/dist/css/bootstrap.min.css';



//Homepage
function Homepage() {

  let history = useHistory()

  const [articles, setArticles] = useState<any[]>([]);
    useEffect(() => {
      fetch("/news_feed")
      .then ((response ) => response.json())
      .then((articlesJson) => {
        console.log(articlesJson);
        const articleComponents = []
        for(const article of articlesJson["articles"]) {
          articleComponents.push(
            <Articles
              name={article["name"]}
              author={article["author"]}
              title={article["title"]}
              description={article["description"]}
              url={article["url"]}
              urlToImage={article["urlToImage"]}
              content={article["content"]}
              showSaveButton={true}
              />
          )
        }

        setArticles(articleComponents);


      });
  
  }, []);

  


  return (
    <div className="main-title">
       <CardDeck>{articles}</CardDeck>
    </div>
  )
}


//Create User Page 
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


//Login User
function Login() {

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
        localStorage.setItem('is_logged_in', 'true');
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


// Articles
function Articles(props: any) {
    const saveArticle = () => {
      fetch("/save_article", {
        method: 'POST',
        body:JSON.stringify({
          "articleName": props.name,
          "articleAuthor": props.author,
          "articleTitle": props.title,
          "articleImg": props.urlToImage,
          "articleDescription": props.description,
          "articleUrl": props.url,
          "articleContent": props.content,
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then(data => {
        if("success" in data) {
          alert("Article Saved!")
        } else {
          alert("Article is already saved")
        }
      })
  }

  var saveButton = <div></div>
  if (props.showSaveButton) {
    saveButton = <Button variant="primary" onClick={saveArticle}>Save</Button>
  }

  return (
        <Card className="card card-news">
          <Card.Img id="card-img" variant= "top"  src={props.urlToImage}/>
          <Card.Body>
            <Card.Title>{props.title} <i className="fas fa-university left fa-sm "> </i></Card.Title>
            <Card.Subtitle className="mb-2 text-muted"><a href={props.url}>Visit website</a></Card.Subtitle>
            <Card.Text>
            Summary: {props.description}
            </Card.Text>
            {saveButton}

            <form action="mailto:" method="GET" encType="text/plain">
              <input type="submit" value="Share Article" />
              <input name="subject" type="hidden" value="Read"/>
              <input name="body" type="hidden" value={props.url}/>
            </form>
          </Card.Body>
        </Card>
  )
}




//Display Saved articles by user
function SavedArticles(){
  const [articles, setArticles] = useState<any[]>([]);
    useEffect(() => {
      fetch("/user_saved_articles")
      .then ((response ) => response.json())
      .then((articlesJson) => {
        console.log(articlesJson);
        const articleComponents = []
        for(const article of articlesJson["articles"]) {
          articleComponents.push(
            <Articles
              name={article["name"]}
              author={article["author"]}
              title={article["title"]}
              description={article["description"]}
              url={article["url"]}
              urlToImage={article["urlToImage"]}
              content={article["content"]}
              showSaveButton={false}
              />
          )
        }
        setArticles(articleComponents);
      });
  }, []);

  return (
    <div><CardDeck>{articles}</CardDeck></div>
  )

}




function App() { 
  const isLoggedIn = localStorage.getItem('is_logged_in');

  let nav = undefined;
  if(isLoggedIn === 'true') {
    nav = 
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/saved_articles">Saved Articles</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/logout">Log out</Nav.Link>
        </Nav.Item>
      </Nav>
    } else {
      nav =
          <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link href="/login">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/create_user">Create User</Nav.Link>
            </Nav.Item>
          </Nav>
      }

    return (
        <BrowserRouter>
          <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="/">FastNews</Navbar.Brand>
            {nav}
          </Navbar>
          <div>
              <Switch>
                <Route path="/saved_articles">
                  <SavedArticles/>
                </Route>
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
          </div>
        </BrowserRouter>
    );



}
export default App;

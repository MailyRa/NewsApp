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
  CardDeck,
  Form,
} from 'react-bootstrap';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Card from 'react-bootstrap/Card';
import userEvent from "@testing-library/user-event";




//Homepage
function Homepage() {
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
        window.location.href = "/";
        localStorage.setItem('is_logged_in', 'true');

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
    <Button variant="contained" color="primary" onClick={createUser} type="submit"> Submit </Button>
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
        window.location.href = "/";
        localStorage.setItem('is_logged_in', 'true');
        
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
      const isLoggedIn = localStorage.getItem('is_logged_in');
      if ( isLoggedIn !== 'true') {
        alert('Must log in to save')
        return 
      }
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
    saveButton = <Button variant="contained" color="primary" onClick={saveArticle}>Save</Button>
  }

  return (
        <Card className="card card-news">
          <Card.Img id="card-img" variant= "top"  src={props.urlToImage}/>
          <Card.Body>
            <Card.Title>{props.title} <i className="fas fa-university left fa-sm "> </i></Card.Title>
            <Card.Subtitle className="mb-2 text-muted"><Link href={props.url}>Visit website</Link></Card.Subtitle>
            <Card.Text>
            Summary: {props.description}
            </Card.Text>
            {saveButton}

            <form action="mailto:" method="GET" encType="text/plain">
              <Button variant="contained" type="submit"> Share Article</Button> 
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



//Logout Function
function Logout(props:any){
  fetch("handle_logout", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
  })
  .then(response => response.json())
  .then(data => {
    if("success" in data) {
      localStorage.setItem('is_logged_in', 'false');
      window.location.href = "/";
    } else {
      alert("Error")
    }
  })
} 

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);



function App() { 
  const isLoggedIn = localStorage.getItem('is_logged_in');

  let navButtons = undefined;
  if(isLoggedIn === 'true') {
    navButtons = 
        <div>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/saved_articles">Saved Articles</Button>
          <Button color="inherit" onClick={Logout}>Log out</Button>
        </div>
    } else {
      navButtons = 
        <div>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/login">Login</Button>
          <Button color="inherit" href="/create_user">Sign up</Button>
        </div>
    }

    
    const classes = useStyles();
    return (
        <BrowserRouter>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                MyNews
              </Typography>
              {navButtons}
            </Toolbar>
          </AppBar>
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

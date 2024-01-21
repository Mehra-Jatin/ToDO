import { useState,useEffect } from 'react';
import './App.css';
import Todos from './Todos';

function App() {

  const [titlu, settitlu] = useState(" ");
  const [descriptionu, setdescriptionu] = useState(" ");
  const [todos, settodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/todos")   /* when the page renders fetch is ececuted and 5000/todos is logged  */
      .then(async function (res) {        /* .then function is used for async calls */
        const json = await res.json();  /* json stores the respond from url , which is {respond} , object of array of object*/
        const value =Object.values(json)[0]; /* accessing the first element of the returned object , accesing array of object , as the returned value is object of array of object {[{}]}  */
     
        settodos(value); /* setting the value of todos as array of object */
      })
  }, []);

  function handleevent(event) {
    settitlu(event.target.value);
  }

  function handleevent2(event) {
    setdescriptionu(event.target.value);
  }

  function handleclick() {
    fetch("http://localhost:5000/todo", {  /* on handleclick the 5000/tood url is called with post method */
      method: "POST",
      headers: {
        'Content-Type': 'application/json', /* it is neccesary to show that the data is in json format */
      },
      body: JSON.stringify({
        title: titlu,                   /* passing the title and description value in body after stringfying the object */
        description: descriptionu      /* the body will first pass through zod verification and then added to datbase */
      })
    }).then(async function (res){

      const json = await res.json(); /* json stores the respond from url , which is {respond} , object of array of object*/
      const value =Object.values(json)[0];  /* accessing the first element of the returned object , accesing array of object , as the returned value is object of array of object {[{}]}  */
     
           settodos(value);  /* setting the value of todos as array of object */
           window.location.reload(); /* reloading the page after the todos is added */
    })
      
            settitlu(" ");
            setdescriptionu(" ");
          
  }

  return (
    <div className='appmain'> 
    <div className='content'>My Todos</div>
    <div className="App">
      <div className='inputtodos'>
      <div className='inputs'>
        <div className='titleinput'>Name<input type="text" placeholder="title" value={titlu} onChange={handleevent}></input></div>
       
        <div className='descriptioninput'>Description<input type="text" placeholder="description"  value={descriptionu} onChange={handleevent2}></input></div>
        </div>
        <div className='Add'><button onClick={handleclick}>Add</button></div>
      </div>
     <div className='returnedtodo'>
      {todos.length > 0 ? (
        todos.map((value, index) => (
          <Todos title={value.title} description={value.description} id={value._id} display="block" />
        ))
      ) : (
        todos.map((value, index) => (
          <Todos title={value.title} description={value.description} id={value._id} display="none" />
        ))
      )}
      </div>
    </div>
    </div>
  );
}

export default App;

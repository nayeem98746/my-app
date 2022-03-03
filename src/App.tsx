import React, { useCallback, useReducer, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Cart from './components/cards/Cart';

interface Todo {
  id: number,
  text: string
}
type ActionType = { type: "ADD" ; text: string } | {type: "REMOVE" ; id: number}
function App() {

  
// 

    const userName = ['sabbir', 'nayeem', 'rahim']

    const setLocal = () =>{ 
       localStorage.setItem("username",JSON.stringify(userName) );
      }
    const getlocal = localStorage.getItem("lastname");

      // get Item
    //  const getName = JSON.parse(localStorage.getItem('username'));
     console.log(userName)



  function reducer(state:Todo[], action: ActionType) {
    switch(action.type){
         case "ADD":
         return[
           ...state,
           {
             id: state.length,
             text: action.text,
           },
         ];
         case "REMOVE":
         return state.filter(({id}) => id === action.id);
    }

  }
  const [todos, dispatch]  = useReducer(reducer, [])


const newTodoRef = useRef <HTMLInputElement> (null)
const onAddTodo = useCallback ( () => {
  if(newTodoRef.current){
    dispatch({
      type: "ADD",
      text: newTodoRef.current.value
      
    })
    setLocal()
    newTodoRef.current.value = ""
  }
}, [] )

  return (
    <div className="App">
      <label htmlFor="">User Name : </label>
      <input style={{padding:"20px", marginTop:"35px"}} type="text "  ref={newTodoRef} />
      <button style={{color:'salmon', backgroundColor:'cyan', padding:'10px', marginLeft:'10px', borderRadius:'10px' }} onClick={onAddTodo}  >Add</button>

      {
        todos.map((todo) => (
          
          <div  key={todo.id} >  {todo.text}
          <button onClick={() => dispatch({type: "REMOVE" , id:todo.id})}>Remove</button>
          </div>
        ) )
      }
     
    </div>
  );
}

export default App;

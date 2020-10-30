//import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import {ToDoBanner} from './ToDoBanner';
import {ToDoRow} from './ToDoRow';
import {ToDoCreater} from './ToDoCreater';
import 'bootstrap/dist/css/bootstrap.css';
import {VisibilityControl} from './VisibilityControl';

export default class App extends Component {
  //  Above we have created a class called App the extends the functionality of the Component class

  //  The export keyword above makes the class available for use outside of the JS file where it is created

  constructor() {

    super();

    //  React components have a special property called "state".  The "state" is used to define the state of data (props)

    this.state = {
      userName: "Shawn Nelson",
      todoItems: [
        {action: "Move burn pile", done: false},
        {action: "Sweep Garage", done: true},
        {action: "Mow", done: false},
        {action: "Get Corolla from shop", done: false},
        {action: "Ask daughter for more Chai", done: false}
      ]
    }

  } // END CONSTRUCTOR

  // ----------------- Function to display table rows ---------
  todoTableRows = (doneProperty) => this.state.todoItems.filter(
    x => x.done == doneProperty).map(
      y => <ToDoRow 
        key = {y.action}
        myTodoItem = {y}
        callback = {this.toggleToDo} //The callback will be invoked (executed, run) when everything in <ToDoRow> is finished
        //AND the user clicks the input box
        // The data passed into the callback from the TodoRow component is passed automaically into the function defined in the
        // callback
      />
    );

    // Feature 4
    // ------------Function to toggle "done" property to true/false (opposite of what it was)
    //  .setState allows the in memory data to be updated
    //  When setState is invoked, React will make a new object with the changes.  Under the hood React will compare the new object with the DOM version of the object.  If there is a difference between those 2 objects then the DOM will get re-drawn (NOT a reload) and then we see the changes.
 
  toggleToDo = (checkedTodoItem) => this.setState(
    {
      todoItems: this.state.todoItems.map(
        x => x.action == checkedTodoItem.action ? { ...x, done: !x.done} : x
      )
    },
    () => localStorage.setItem("storedTodos", JSON.stringify(this.state)) 
  );

  //  Feature 5d
  //  The createNewTodoCallback method below is the callback for the ToDoCreator component
  //  The "newToDoAction" parameter passed into the createNewTodoCallback method below comes from where 
  //the callback it initiated from- which is in the createNewTodo method of the ToDoCreator Component

  createNewToDoCallBack = (newToDoAction) => {
    //  The if block below checks if the newly created todo item is NOT already in the list of todos.  
    //If it is NOT already in the list then it adds it as below.  
    //If it is in the list already there is no else block so nothing happens - this is not to user friendly but.... :)
    if (!this.state.todoItems.find(x => x.action == newToDoAction)){
      this.setState({
        todoItems: [
          ...this.state.todoItems,
          { action: newToDoAction, done: false}
        ]
        // By default every new todo should not be done- in other words it's done property should have a value of false.
      },
      () => localStorage.setItem("storedTodos", JSON.stringify(this.state))
      ) // END of setState
    } // END of IF Block

  }

  // Feature 5e
  //  The componentDidMount method below is a built in react method to handle logic for when the APP Components "mounts" or "loads"
  //  The localStorage object is a React built in object that allows persistent local storage much like how cookies work
  //  localStorage reference: https://programmingwithmosh.com/react/localstorage-react/

  componentDidMount = () => {
    // steredData contains the value of the sata in the storedToDos local storage
    let storedData = localStorage.getItem("storedTodos");

    this.setState(
      storedData != null ? JSON.parse(storedData) : 
      {
        userName : "Default UserName",
        todoItems: [
          {action: "Default todo", done: false}
        ],
        showCompleted: true // Feature 8
      }
    );
  }

  render = () =>
    <div id="startingPoint">
      {/* Features 1 & 2 */}
      <ToDoBanner   
        userName = {this.state.userName}
        todoItems = {this.state.todoItems}

      />
      {/* Feature 5a */}
      <ToDoCreater   
        callback = {this.createNewToDoCallBack}
      />

      {/* Features 3 & 4 */}
      <table className="table table-striped table-bordered">
        <thead>
          <th>Description</th>
          <th>Mark Complete</th>
        </thead>
        <tbody>
          {this.todoTableRows(false)}
        </tbody>
      </table>
      <div className="bg-secondary text-white text-center p-2">
        {/* Feature 8 */}
      <VisibilityControl
        description = "Completed ToDoItems"
        isChecked = {this.state.showCompleted}
        callback = {checked => this.setState({showCompleted: checked})}
      />
      </div>
            
      {this.state.showCompleted &&
    <table className="table table-striped table-bordered">
    <thead>
      <th>Description</th>
      <th>Mark incomplete</th>
    </thead>
    <tbody>
      {this.todoTableRows(true)}
    </tbody>
  </table>
      }
    </div>

   
}



/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

//export default App;

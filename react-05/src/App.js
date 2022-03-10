import React, { Component } from 'react';
import shortid from 'shortid';
// import Counter from './components/Counter';
// import Dropdown from './components/Dropdown';
// import ColorPicker from './components/ColorPicker';
import Container from './components/Container';
import TodoList from './components/TodoList';
import TodoEditor from './components/TodoEditor';
import Filter from './components/Filter';
import initialTodos from './todos.json';
// import Form from './components/Form';
import Modal from './components/Modal';
// import Clock from './components/Clock';
// import Tabs from './components/Tabs';
// import tabs from './tabs.json';
import IconButton from './components/IconButton/IconButton';
import { ReactComponent as AddIcon } from './icons/add.svg';
import './index.css';

/*
// Рендер компонента 
*/

// const colorPickerOptions = [
//   { label: 'red', color: '#F44336' },
//   { label: 'green', color: '#4CAF50' },
//   { label: 'blue', color: '#2196F3' },
//   { label: 'grey', color: '#607D8B' },
//   { label: 'pink', color: '#E91E63' },
//   { label: 'indigo', color: '#3F51B5' },
// ];

// const App = () => {
//   return (
//     <>
//       <h1>Component State</h1>

//       {/* <Dropdown /> */}
//       {/* <Counter initialValue={12} /> */}
//       {/* <ColorPicker options={colorPickerOptions} /> */}
//       <TodoList />
//     </>
//   );
// };

class App extends Component {
  state = {
    // todos: initialTodos,
    todos: [],
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    // console.log('App componentDidMount');

    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);

    if (parsedTodos) this.setState({ todos: parsedTodos });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');
    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    if (nextTodos !== prevTodos)
      // console.log('Обновилось поле todos, записываю todos в localStorage');

      localStorage.setItem('todos', JSON.stringify(nextTodos));

    if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
      this.toggleModal(); // закрытие модалки после добавления todo
    }
  }

  addTodo = text => {
    // console.log(text);

    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({ todos: [todo, ...todos] }));

    // this.toggleModal(); закрытие модалки после добавления todo
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }

    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };

  changeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  getVisibleTodos = () => {
    const { todos, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter),
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };

  // handleNameChange = event => {
  //   console.log(event.currentTarget.value);

  //   this.setState({ name: event.currentTarget.value });
  // };

  // handleTagChange = event => {
  //   console.log(event.currentTarget.value);

  //   this.setState({ tag: event.currentTarget.value });
  // };

  // formSubmitHandler = data => {
  //   console.log(data);
  // };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { todos, filter, showModal } = this.state;

    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        {/* <Tabs items={tabs} /> */}
        {/* <Clock /> */}
        <IconButton onClick={this.toggleModal} aria-label="Add todo">
          <AddIcon width="40" height="40" fill="#fff" />
        </IconButton>
        {/* <button type="button" onClick={this.toggleModal}>
          Open modal
        </button> */}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
            {/* <button type="button" onClick={this.toggleModal}>
              Close modal
            </button> */}
          </Modal>
        )}

        <div className="TodoBox">
          <p>Общее кол-во: {totalTodoCount}</p>
          <p>Кол-во выполненных: {completedTodoCount}</p>
        </div>
        <Filter value={filter} onChange={this.changeFilter} />
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
        {/* <Form onSubmit={this.formSubmitHandler} /> */}
        {/* <Dropdown /> */}
        {/* <Counter initialValue={12} /> */}
        {/* <ColorPicker options={colorPickerOptions} /> */}
      </Container>
    );
  }
}

export default App;

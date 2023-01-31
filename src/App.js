import './App.css';
// jsx를 사용시에 react를 import 해야한다.
// 17버전부터는 생략가능하다.
import React, { useEffect, useState } from 'react';

function App() {
  const wrap = {
    width: '500px',
    border: '1px solid black',
    margin: '10px auto',
  };

  let boardList = [
    { id: 1, todoname: '운동하기', completed: 0 },
    { id: 2, todoname: 'SNS꾸미기', completed: 0 },
    { id: 3, todoname: '사진정리하기', completed: 0 },
  ];

  const [todos, setTodos] = useState([...boardList]);
  const [input, setInput] = useState('');

  const insertTodo = (e) => {
    e.preventDefault();
    setTodos([
      { id: todos.length + 1, todoname: input, completed: 0 },
      ...todos,
    ]);
    // 추가 후 검색창 초기화
    setInput('');
  };

  const handleChangeText = (e) => {
    //입력을 위해선 아래와 같이 작성해주어야한다.
    setInput(e.target.value);
  };

  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
          : todo
      )
    );
  };

  useEffect(() => {
    console.log('input:' + input);
  }, [input]);
  return (
    <div className='App' style={wrap}>
      <h1>TODO LIST</h1>
      <form onSubmit={insertTodo}>
        <input
          type='text'
          required={true}
          value={input}
          onChange={handleChangeText}
        />
        <input type='submit' value='Create' />
      </form>
      {todos
        ? todos.map((todo) => {
            return (
              <div className='todo' key={todo.id}>
                <h3>
                  <label
                    className={todo.completed ? 'completed' : null}
                    onClick={() => updateTodo(todo.id)}
                  >
                    {todo.todoname}
                  </label>
                </h3>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default App;

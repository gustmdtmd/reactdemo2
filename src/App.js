import './App.css';
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

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    // setTodos(todos.filter((todo) => {return todo.id !== id}));
    // return 이 처리해주는 문장이 하나면 return을 생략 가능하다.
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
        {/* 입력 */}
        <input type='submit' value='Create' />
      </form>
      {/* 리스트 */}
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

                  <label
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;삭제
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

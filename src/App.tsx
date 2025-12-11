import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Clean my computer", completed: false },
    { id: 2, text: "Buy a keyboard", completed: false },
    { id: 3, text: "Write an article about @xstate/test", completed: false },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, completed: false },
      ]);
      setInputValue("");
      setShowForm(false);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const refreshTodos = () => {
    setTodos([
      { id: 1, text: "Clean my computer", completed: false },
      { id: 2, text: "Buy a keyboard", completed: false },
      { id: 3, text: "Write an article about @xstate/test", completed: false },
    ]);
    setShowForm(false);
    setInputValue("");
  };

  const thingsToDo = todos.filter((todo) => !todo.completed);
  const thingsDone = todos.filter((todo) => todo.completed);

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      <header className="px-6 sm:px-10 py-4 border-gray-200 border-b">
        <h1 className="font-semibold text-xl">XTodo</h1>
      </header>

      <main className="mx-auto px-6 sm:px-10 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-3xl">Things to get done</h2>
          <button
            onClick={refreshTodos}
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded font-medium text-white transition-colors"
          >
            Refresh
          </button>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 font-medium text-lg">Things to do</h3>
          {thingsToDo.length > 0 ? (
            <ul className="space-y-3">
              {thingsToDo.map((todo) => (
                <li key={todo.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="border-gray-300 rounded focus:ring-yellow-400 w-5 h-5 text-yellow-400 cursor-pointer"
                  />
                  <span className="text-gray-700">{todo.text}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No todos here!</p>
          )}
        </div>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 mb-8 px-6 py-2 rounded-full font-medium text-white transition-colors"
          >
            <span className="font-bold text-xl">+</span> Add a todo
          </button>
        ) : (
          <div className="shadow-sm mb-8 p-6 border border-gray-200 rounded-lg">
            <h3 className="mb-4 font-bold text-lg">Create a todo</h3>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Write an article about XState"
              className="mb-4 px-4 py-2 border border-gray-200 focus:border-yellow-400 rounded focus:outline-none w-full"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
            />
            <div className="flex gap-3">
              <button
                onClick={handleAddTodo}
                className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-medium text-white transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="hover:bg-gray-50 px-6 py-2 border border-gray-300 rounded font-medium text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div>
          <h3 className="mb-4 font-medium text-lg">Things done</h3>
          {thingsDone.length > 0 ? (
            <ul className="space-y-3">
              {thingsDone.map((todo) => (
                <li key={todo.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="border-gray-300 rounded focus:ring-yellow-400 w-5 h-5 text-yellow-400 cursor-pointer"
                  />
                  <span className="text-gray-700">{todo.text}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No completed todos yet!</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
import './App.scss';
import TextEditor from './TextEditor/TextEditor';
import { Route, Routes, Navigate } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Navigate to={`/doc/${uuidV4()}`} />} />
        <Route path='/doc/:id' element={<TextEditor />} />
      </Routes>
    </div>
  );
}

export default App;

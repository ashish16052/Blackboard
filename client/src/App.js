import './App.scss';
import TextEditor from './TextEditor/TextEditor';
import { Route, Routes, Navigate } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'
import Navbar from "./Dashboard/Navbar"
import Content from "./Dashboard/Content"
// import RecentDoc from "./Dashboard/RecentDoc"
// import SavedDOC from "./Dashboard/SavedDOC"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Content />} />
        <Route exact path='/newdoc' element={<Navigate to={`/doc/${uuidV4()}`} />} />
        <Route path='/doc/:id' element={<TextEditor />} />
      </Routes>
    </div>
  );
}

export default App;

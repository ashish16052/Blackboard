import './App.scss';
import TextEditor from './TextEditor/TextEditor';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Navbar from "./Dashboard/Navbar"
import Content from "./Dashboard/Content"
import { useEffect, useState } from 'react';
import axios from 'axios'
const url = 'http://localhost:3002'

function App() {

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))

  const getUser = async () => {
    const { data } = await axios.get(`${url}/auth/user`, { withCredentials: true })
    setUser(data);
    sessionStorage.setItem('user', JSON.stringify(data));
    console.log(data);
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="App">
      <Navbar url={url} user={user} setUser={setUser} />
      <Routes>
        <Route path='/' exact element={<Content url={url} user={user} />} />
        <Route path='/doc/:id' element={<TextEditor user={user} url={url} />} />
      </Routes>
    </div>
  );
}

export default App;

//To commit:-
//git add .
//git commit -m "added content page"
//git push origin main

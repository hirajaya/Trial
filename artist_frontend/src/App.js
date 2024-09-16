import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User_Login from './Pages/Login/User_Login';
import Artist_Login from './Pages/Login/Artist_Login';
import Dashboard from './Components/DashBoard/DashBoard';
import Add from './Pages/Add/Add';
import ArtistRegister from './Pages/ArtistRegister/ArtistRegister';
import UserRegister from './Pages/UserRegister/UserRegister';
import UserProfile from './Pages/UserProfile/UserProfile';
import ArtistProfile from './Pages/ArtistProfile/ArtistProfile';
import Post from './Pages/Post/Post';
import UserView from './Pages/UserView/userView';
import UpdatePost from './Pages/UpdatePost/updatePost';
import Start from './Pages/Start/Start';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Start />} />
        <Route path="/user-login" element={<User_Login />} />
        <Route path="/artist-login" element={<Artist_Login />} />
        <Route path="/add" element={<Add />} />
        <Route path="/art-register" element={<ArtistRegister />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="user-view" element={<UserView />} />    
          <Route path="artist-profile" element={<ArtistProfile />} />
          <Route path="artist-post" element={<Post />} />
          <Route path="post-update/:id" element={<UpdatePost />} />           
        </Route>
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;

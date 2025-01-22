import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/HomePage.css'; 

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Navbar />
      <div className="home-content">
        <h1>Вітаємо на головній сторінці Tinder!</h1>
      </div>
    </div>
  );
};

export default HomePage;

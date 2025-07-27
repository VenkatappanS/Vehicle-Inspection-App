import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import catlogo from '../assets/catlogo.png';
import catimg1 from '../assets/catimg1.jpg';
import catimg2 from '../assets/catimg2.jpg';
import catimg3 from '../assets/catimg3.jpg';

function Login() {
  const [inspectorId, setInspectorId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // 👇 IMPORTANT: include credentials (cookies)
      credentials: 'include',
      body: JSON.stringify({ inspectorId, password }),
    });

    if (response.ok) {
      window.location.href = '/report';
    } else {
      const data = await response.json();
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error(error);
    alert('Error connecting to server');
  }
};



  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={catlogo} alt="Logo" style={{ height: '35px' }} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  Products
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Product 1</a></li>
                  <li><a className="dropdown-item" href="#">Product 2</a></li>
                  <li><a className="dropdown-item" href="#">Product 3</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  Services
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Service 1</a></li>
                  <li><a className="dropdown-item" href="#">Service 2</a></li>
                  <li><a className="dropdown-item" href="#">Service 3</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://www.caterpillar.com/">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <hr style={{ margin: 0, border: 'none', height: '5px', backgroundColor: '#ff9411' }} />

      {/* Carousel */}
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img style={{ height: '92vh' }} src={catimg1} className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img style={{ height: '92vh' }} src={catimg2} className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img style={{ height: '93vh' }} src={catimg3} className="d-block w-100" alt="Slide 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>

        {/* Login Form */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '20px',
            borderRadius: '10px',
            width: '400px',
            height: '350px',
            color: '#fff'
          }}
        >
          <h4 className="text-center">Login</h4>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Inspector ID</label>
              <input
                type="text"
                className="form-control"
                value={inspectorId}
                onChange={(e) => setInspectorId(e.target.value)}
                placeholder="Enter ID"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn w-100" style={{ backgroundColor: '#FFCD11', color: '#000', fontWeight: 'bold' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

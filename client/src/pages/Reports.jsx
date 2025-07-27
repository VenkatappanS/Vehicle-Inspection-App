import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reports.css';
import catlogo from '../assets/catlogo2.png';

function Reports() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.reportId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (task) => {
  if (task.status === 'Pending' || task.status === 'In Progress') {
    navigate(`/inspection/${task.reportId}`);
  } else {
    alert('Report already Submitted.');
  }
};

  return (
    <div className="report-background">
      <div className="container report-container">
        <img height="70px" width="100px" src={catlogo} alt="Logo" />
        <h2 className="mb-4">Inspection Reports</h2>

        {/* Search Bar */}
        <div className="row search-bar">
          <div className="col-md-6">
            <input
              type="text"
              id="searchInput"
              className="form-control border border-dark"
              placeholder="Search by Report Identifier"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Reports List */}
        <div className="list-group border border-dark mt-3">
          {filteredTasks.map(task => (
            <a
              href="#"
              key={task._id}
              className="list-group-item list-group-item-action flex-column align-items-start"
              onClick={(e) => {
                e.preventDefault();
                handleClick(task);
              }}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{task.reportId}</h5>
                <div className="d-flex align-items-center">
                  <small className="me-4">Vehicle ID: {task.vehicleId}</small>
                  <small className="report-status">
                    <span className={`badge ${
                      task.status === 'Completed' ? 'badge-completed' :
                      task.status === 'In Progress' ? 'badge-in-progress' :
                      'badge-pending'
                    }`}>
                      {task.status}
                    </span>
                  </small>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reports;
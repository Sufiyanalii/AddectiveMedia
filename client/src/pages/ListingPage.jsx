import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListingPage() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = () => {
    axios
      .get('http://localhost:3030/submissions')
      .then((response) => {
        setSubmissions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching submissions:', error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3030/submissions/${id}`)
      .then((response) => {
        console.log('Submission deleted successfully');
        fetchSubmissions();
      })
      .catch((error) => {
        console.error('Error deleting submission:', error);
      });
  };

  return (
    <div>
      <h1>Addictive Media - Listing Page</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Country</th>
            <th>Resume</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td>{submission.name}</td>
              <td>{submission.dob}</td>
              <td>{submission.country}</td>
              <td>
                <a href={`http://localhost:3030/resumes/${submission.resumePath}`} target="_blank" rel="noreferrer">
                  View
                </a>{' '}
                |
                <a href={`http://localhost:3030/resumes/${submission.resumePath}`} download>
                  Download
                </a>
              </td>
              <td>
                <button onClick={() => handleDelete(submission.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListingPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InputPage() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    axios
      .get('/api/countries')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('dob', dob);
    formData.append('country', country);
    formData.append('resume', e.target.resume.files[0]);

    axios
      .post('http://localhost:3030/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log('Submission created successfully');
        // Reset form fields
        setName('');
        setDob('');
        setCountry('');
        e.target.resume.value = '';
      })
      .catch((error) => {
        console.error('Error creating submission:', error);
      });
  };

  return (
    <div>
      <h1>Addictive Media - Input Page</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br /><br />

        <label>Date of Birth:</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required /><br /><br />

        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          list="countries"
          required
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country.code} value={country.name} />
          ))}
        </datalist><br /><br />

        <label>Resume:</label>
        <input type="file" name="resume"  /><br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default InputPage;

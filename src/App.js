import React from 'react';
import MultiStepForm from './components/MultiStepForm';
import formData from './assets/json/formData.json';
import Navbar from './components/NavBar';

const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <MultiStepForm formData={formData.form} />
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import './MultiStepForm.css';

const MultiStepForm = ({ formData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({}); // State to store validation errors

  const handleChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
    // Remove error message if field is now filled
    if (value && errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Function to validate fields
  const validateFields = () => {
    let validationErrors = {};
    const currentGroupFields = formData.groups[currentStep].fields;

    currentGroupFields.forEach((field) => {
      if (field.required && !formValues[field.name]) {
        validationErrors[field.name] = `${field.label} is required.`;
      }
    });

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      alert('Submitted data');
    }
  };

  const renderField = (field) => {
    const isError = errors[field.name];
    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formValues[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              className={isError ? 'error' : ''}
            />
            {isError && <span className="error-message">{errors[field.name]}</span>}
          </>
        );
      case 'textarea':
        return (
          <>
            <textarea
              name={field.name}
              placeholder={field.placeholder}
              value={formValues[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              className={isError ? 'error' : ''}
            />
            {isError && <span className="error-message">{errors[field.name]}</span>}
          </>
        );
      case 'dropdown':
        return (
          <>
            <select
              name={field.name}
              value={formValues[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              className={isError ? 'error' : ''}
            >
              <option value="">Select an option</option>
              {field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {isError && <span className="error-message">{errors[field.name]}</span>}
          </>
        );
      case 'radio':
        return (
          <>
            <div className={`radio-group ${isError ? 'error' : ''}`}>
              {field.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={formValues[field.name] === option.value}
                    onChange={() => handleChange(field.name, option.value)}
                    required={field.required}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            {isError && <span className="error-message d-block">{errors[field.name]}</span>}
          </>
        );
      case 'checkbox':
        return (
          <div>
            {field.options.map((option, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  name={field.name}
                  value={option.value}
                  checked={formValues[field.name]?.includes(option.value) || false}
                  onChange={(e) => {
                    const newValues = formValues[field.name] || [];
                    if (e.target.checked) {
                      newValues.push(option.value);
                    } else {
                      const idx = newValues.indexOf(option.value);
                      newValues.splice(idx, 1);
                    }
                    handleChange(field.name, newValues);
                  }}
                />
                {option.label}
              </label>
            ))}
            {isError && <span className="error-message">{errors[field.name]}</span>}
          </div>
        );
      case 'slider':
        return (
          <>
            <input
              type="range"
              name={field.name}
              min={field.min}
              max={field.max}
              step={field.step}
              value={formValues[field.name] || field.min}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
            {isError && <span className="error-message">{errors[field.name]}</span>}
          </>
        );
      default:
        return null;
    }
  };

  const currentGroup = formData.groups[currentStep];

  return (
    <div className="multi-step-form">
      <div className="sidebar">
        <ul>
          {formData.groups.map((group, index) => (
            <li
              key={index}
              className={index === currentStep ? 'active' : ''}
              onClick={() => setCurrentStep(index)}
            >
              {group.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="form-content">
        <form onSubmit={handleSubmit}>
          <h2>{formData.title}</h2>
          <p>{formData.description}</p>
          <h3>{currentGroup.title}</h3>
          {currentGroup.fields.map((field, index) => (
            <div key={index} className="form-field">
              <label>{field.label}</label>
              {renderField(field)}
            </div>
          ))}
          <div className="form-navigation">
            {currentStep > 0 && (
              <button type="button" onClick={() => setCurrentStep(currentStep - 1)}>
                Previous
              </button>
            )}
            {currentStep < formData.groups.length - 1 ? (
              <button
                type="button"
                onClick={() => {
                  if (validateFields()) setCurrentStep(currentStep + 1);
                }}
              >
                Next
              </button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;

import React, { useState } from 'react';

// DynamicForm component to render a form based on a schema
const DynamicForm = ({ schema }) => {
  const [formData, setFormData] = useState(() => generateInitialValues(schema));
  const [errors, setErrors] = useState({});
  function generateInitialValues(schema) {
    const result = {};
    schema.forEach(field => {
      result[field.name] = field.value || (field.type === 'multiselect' ? [] : '');
    });
    return result;
  }
// Function to generate value on the basis of schema
  const validateField = (field, value) => {
    if (field.required && (value === '' || value === null || value === undefined)) {
      return field.error || 'This field is required.';
    }
    if (field.validator) {
      const regex = new RegExp(field.validator);
      if (!regex.test(value)) {
        return field.error || 'Invalid input.';
      }
    }
    if (field.min && value < field.min) {
      return field.error || `Minimum value is ${field.min}`;
    }
    if (field.max && value > field.max) {
      return field.error || `Maximum value is ${field.max}`;
    }
    return '';
  };
// Function to validate individual fields based on schema rules
  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    const field = schema.find(f => f.name === name);
    const errorMsg = validateField(field, value);
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };
// Function to handle changes in form fields and validate them
  const handleFileUpload = async (field, file) => {
    try {
      const form = new FormData();
      form.append(field.name, file);
      const res = await fetch(field.data.url, {
        method: field.data.method,
        headers: field.data.headers || {},
        body: form,
      });
      const result = await res.json();
      handleChange(field.name, result.url || file.name);
    } catch (err) {
      alert('File upload failed');
    }
  };
// Function to handle file uploads and update form data with the file URL
  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
      case 'date':
      case 'datetime':
        return (
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={e => handleChange(field.name, e.target.value)}
          />
        );
        <br/>
      case 'textarea':
        return (
          <textarea
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={e => handleChange(field.name, e.target.value)}
          />
        );
        <br/>
      case 'select':
        return (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={e => handleChange(field.name, e.target.value)}
          >
            <option value="">Select</option>
            {field.data.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.title}</option>
            ))}
          </select>
        );
        <br/>
      case 'multiselect':
        return (
          <div>
            {field.data.map(opt => (
              <label key={opt.id}>
                <input
                  type="checkbox"
                  checked={formData[field.name].includes(opt.id)}
                  onChange={() => {
                    const newVal = formData[field.name].includes(opt.id)
                      ? formData[field.name].filter(val => val !== opt.id)
                      : [...formData[field.name], opt.id];
                    handleChange(field.name, newVal);
                  }}
                /> {opt.title}
              </label>
            ))}
          </div>
        );
        <br/>
      case 'file':
        return (
          <input
            type="file"
            name={field.name}
            onChange={e => handleFileUpload(field, e.target.files[0])}
          />
        );
        <br/>
      case 'card':
        return (
          <div className="card">
            <h4>{field.title}</h4>
            <DynamicForm
              schema={field.data.map(f => ({ ...f, name: `${field.name}.${f.name}` }))}
            />
          </div>
        );
      default:
        return <div>Unsupported field: {field.type}</div>;
    }
  };
// Function to render form fields based on their type
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    schema.forEach(field => {
      const errorMsg = validateField(field, formData[field.name]);
      if (errorMsg) {
        newErrors[field.name] = errorMsg;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Form Submitted:', formData);
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.map(field => (
        <div key={field.name} className="form-group">
            <br/>
          <label>{field.title}</label>
          <br/>
          {renderField(field)}
          {errors[field.name] && <span className="error">{errors[field.name]}</span>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;

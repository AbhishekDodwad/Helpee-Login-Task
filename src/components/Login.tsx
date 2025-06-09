import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
  company: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  company?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
    company: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.company) {
      newErrors.company = 'Company name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateForm()) return;
 
    if (
      formData.email === 'abhishek@gamil.com' && 
      formData.password === 'abhi123' && 
      formData.company === 'Helpee'
    ) {
      navigate('/users');
    } else {
      setLoginError('Invalid user name or password or company name');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {loginError && <div className="error-message">{loginError}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        
        <div className="form-group">
          <label>Company Name:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
          {errors.company && <span className="error">{errors.company}</span>}
        </div>
        
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
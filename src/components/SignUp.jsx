import { useState } from "react";
import "./Sign.css";
import { useId } from "react";

export function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formId = useId();
  const [formData, setFormData] = useState({
    username: "",
    mail: "",
    password: "",
    confpassword: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    mail: "",
    password: "",
    confpassword: ""
  });

  const validateForm = (data) => {
    const newErrors = {
      username: "",
      mail: "",
      password: "",
      confpassword: ""
    };

    // Username validation
    if (!data.username) {
      newErrors.username = "Username is required";
    } else if (data.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (data.username.length > 20) {
      newErrors.username = "Username must be less than 20 characters";
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!data.mail) {
      newErrors.mail = "Email is required";
    } else if (!emailRegex.test(data.mail)) {
      newErrors.mail = "Please enter a valid email";
    }

    // Password validation
    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (data.password.length > 20) {
      newErrors.password = "Password must be less than 20 characters";
    }

    // Confirm password validation
    if (data.password !== data.confpassword) {
      newErrors.confpassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleChange = (e, field) => {
    const value = e.target.value.trim()
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Only validate the changed field
    const fieldError = validateForm({ ...formData, [field]: value })[field]
    setErrors(prev => ({
      ...prev,
      [field]: fieldError
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm(formData)
    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some(error => error !== "")
    if (!hasErrors) {
      setIsSubmitting(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsSubmitted(true)
        console.log("Form submitted successfully:", formData)
        // Here you would typically send the form data to your backend
        // const response = await api.register(formData);
      } catch (error) {
        console.error("Registration failed:", error);
        setErrors(prev => ({
          ...prev,
          submit: "Registration failed. Please try again."
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  }


  const formFields = [
    {
      labelName: "Username",
      forHtml: "username",
      type: "text",
      id: `${formId}-username`,
      field: "username",
      autocomplete: "username"
    },
    {
      labelName: "Email",
      forHtml: "email",
      type: "email",
      id: `${formId}-email`,
      field: "mail",
      autocomplete: "email"
    },
    {
      labelName: "Password",
      forHtml: "password",
      type: "password",
      id: `${formId}-password`,
      field: "password",
      autocomplete: "new-password"
    },
    {
      labelName: "Confirm Password",
      forHtml: "conf-password",
      type: "password",
      id: `${formId}-confpassword`,
      field: "confpassword",
      autocomplete: "new-password"
    },
  ]

  return (
    <div className="sign-container">
      <div className="sign-box">
        <h1>Sign up</h1>
        {isSubmitted ? (
          <div className="success-message">
            Registration successful! Please check your email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {formFields.map((item) => (
              <div className="form-group" key={item.id}>
                <label htmlFor={item.forHtml}>{item.labelName}</label>
                <input
                  type={item.type}
                  id={item.forHtml}
                  value={formData[item.field]}
                  onChange={(e) => handleChange(e, item.field)}
                  className={errors[item.field] ? "error" : ""}
                  placeholder="Complete..."
                  autoComplete={item.autocomplete}
                  aria-invalid={!!errors[item.field]}
                  aria-describedby={errors[item.field] ? `${item.forHtml}-error` : undefined}
                />
                {errors[item.field] && (
                  <span className="error-message">{errors[item.field]}</span>
                )}
              </div>
            ))}
            <button type="submit" className="btn-primary">
              Sign up
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

/* <div className="divider">
<span>or</span>
</div>

<button type="button" className="btn-google">
    <img src="https://www.google.com/favicon.ico" alt="Google" />
    Continue with Google
</button>
 <p className="signup-link">
                    Don't have an account? <a href="#" className="signup-cta">Sign up</a>
                </p>
*/

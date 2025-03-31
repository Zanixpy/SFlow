import { useState } from "react";
import "./Sign.css";
import { useId } from "react";

export function Sign() {

  const formId=useId()
  const [formData, setFormData] = useState({
    username:"",
    mail:"",
    password:"",
    confpassword:""
  })

  const [errors,seterrors]=useState({
    username:"",
    mail:"",
    password:"",
    confpassword:""
  })

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    if (!email) {
        return "Email is required";
    }
    if (!emailRegex.test(email)) {
        return "Please enter a valid email";
    }
    return "";
}
 
  const HandleOnChange= (e,field)=>{
    setFormData(prev=>({
        ...prev,
        [field]:e.target.value
    }))

    switch (field) {
        case "username": 
            return seterrors(prev=> ({
                ...prev,
                username: formData.username.length < 3 ? "Username must be at least 3 characters" : 
                          formData.username.length > 20 ? "Username must be less than 20 characters" : 
                          formData.username.length === 0 ? "Username is required" : ""
            }))
                

        case "mail":

            break
        case "password":
            break
        case "confpassword":
            break

        default:
            break;
    }



  }

  const formFields = [
    {
        labelName: "Username",
        forHtml: "username",
        type: "text",
        id: `${formId}-username`,
        field: "username"
    },
    {
        labelName: "Mail",
        forHtml: "email",
        type: "email",
        id: `${formId}-email`,
        field: "mail"
    },
    {
        labelName: "Password",
        forHtml: "password",
        type: "password",
        id: `${formId}-password`,
        field: "password"
    },
    {
        labelName: "Confirmation password",
        forHtml: "conf-password",
        type: "password",
        id: `${formId}-confpassword`,
        field: "confpassword"   
    },
  ]

  return (
    <div className="sign-container">
      <div className="sign-box">
        <h1>Sign up</h1>
        <form action="">
          {formFields.map((item) => (
            <div className="form-group" key={item.id}>
              <label htmlFor={item.forHtml}>{item.labelName}</label>
              <input
                type={item.type}
                id={item.forHtml}
                value={formData[item.field]}
                onChange={e=>HandleOnChange(e,item.field)}
                placeholder="Complete..."
              />
            </div>
          ))}
          <button type="submit" className="btn-primary">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
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

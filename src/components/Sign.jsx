import "./Sign.css"

export function Sign(params) {
    return (
        <div className="sign-container">
            <div className="sign-box">
                <h1>Sign in</h1>
                <form action="">
                    <div className="form-group">
                        <label htmlFor="email">Mail</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <button type="submit" className="btn-primary">Continue</button>
                    
                    <div className="divider">
                        <span>or</span>
                    </div>
                    
                    <button type="button" className="btn-google">
                        <img src="https://www.google.com/favicon.ico" alt="Google" />
                        Continue with Google
                    </button>
                </form>
                
                <p className="signup-link">
                    Don't have an account? <a href="#" className="signup-cta">Sign up</a>
                </p>
            </div>
        </div>
    )
}
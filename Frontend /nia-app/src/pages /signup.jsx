
import {useState} from 'react'
import {Link} from 'react-router'


export default function Signup() {
    const [signupForm, setSignUpForm] = useState({
        name : '',
        email : '',
        password : ''
    })

    const [showPassword, setShowPassword] = useState(false)

    const [error, setError] = useState('')

    function validateForm() {
        if (!signupForm.name.trim()) return 'Name is required'
        if (!signupForm.email.include('@')) return 'Enter a valid email'
        if (!signupForm.password.length > 6) return 'Password should be 6 or more characters'
        return ''
    }

    function handleSubmit (event) {
        event.preventDefault()

        const validate = validateForm()

        if (validate) {
            setError(validate)
            return
        }

        fetch('',        // signup endpoint
            {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(signupForm)
            }
        )
        .then((response) => {
            if(!response.ok){
                throw new Error('Error occurred')
            }else {
                return response.json()
            }
        })
        .then((data) => {
            console.log(data)
            setSignUpForm({
                name : '',
                email : '',
                password : ''
            })
            alert('Signup successful')
        })
        .catch((error) => setError(error.message))
    }

    function handleOnChange(e) {
        setSignUpForm({...signupForm, [e.target.name] : e.target.value})
    }



    return (
        <>
        <div className='signup-page'>
            <div className='signup-card'>
                <h1 className='signup-title'>
                    Sign up
                </h1>
                
                <form onSubmit={handleSubmit} className='signup-form'> 
                    <input 
                    type="text" 
                    name = 'name'
                    value = {signupForm.name}
                    placeholder='Enter name'
                    onChange={(e) => handleOnChange(e)}
                    />
                    <input 
                    type="email" 
                    name = 'email'
                    value = {signupForm.email}
                    placeholder='Enter email'
                    onChange={(e) => handleOnChange(e)}
                    />
                    <div className='password-field'>
                        <input 
                        type={showPassword ? 'text' : 'password'} 
                        name = 'password'
                        value = {signupForm.password}
                        placeholder='Enter password'
                        onChange={(e) => handleOnChange(e)}
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword((prev) => !prev)}
                            className='toggle-password'
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <button type='submit' className='submit-btn'>
                        Submit
                    </button>
                </form>

                <p className='login-link'>
                    Already have an account?
                    <a href="/login">Login</a>
                </p>
                
            </div>
        </div>


        </>
    )

}
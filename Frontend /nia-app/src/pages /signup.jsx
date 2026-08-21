import {useState} from 'react'


export default function Signup() {
    const {signupForm, setSignUpForm} = useState({
        name : '',
        email : '',
        password : ''
    })

    const {showPassword, setShowPassword} = useState(false)

    function validateForm() {
        if (!signupForm.name.trim()) return 'Name is required'
        if (!signupForm.email.include('@')) return 'Enter a valid email'
        if (signupForm.password.length > 6) return 'Password should be 6 or more characters'
        return ''
    }

    function handleSubmit (event) {
        event.preventDefault()


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
        .catch((error) => alert(error))
    }

    function handleOnChange(e) {
        setSignUpForm({...signupForm, [e.target.name] : e.target.value})
    }



    return (
        <>
        <h2>
            Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
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
            >
                {showPassword ? 'Hide' : 'Show'}
            </button>

            <button type='submit'>
                Submit
            </button>
        </form>
        <p>
            Already have an account?
        </p>
        <a href="/login">Login</a>
        </>
    )

}
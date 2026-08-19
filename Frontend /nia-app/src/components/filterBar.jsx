import {useState} from 'react'


export default function Signup() {
    const {signupForm, setSignUpForm} = useState({
        name : '',
        email : '',
        password : ''
    })

    function handleSubmit (event) {
        event.preventDefault()

        fetch('',
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
        })
        .catch((error) => alert(error))
    }

}
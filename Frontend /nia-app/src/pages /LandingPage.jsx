import {Link} from 'react-router'
import './Landing.css'

export default function LandingPage() {

    return (
        <>
        <div className='landing-page'>
            <header className='landing-nav'>
                <span className='landing-logo'>Nia</span>
                <Link to='/signup'>Sign Up</Link>
            </header>
        </div>
        </>
    )
}
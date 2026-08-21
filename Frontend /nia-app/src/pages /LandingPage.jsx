import {Link} from 'react-router'
import './Landing.css'

export default function LandingPage() {

    return (
        <>
        <div className='landing-page'>
            <header className='landing-nav'>
                <span className='landing-logo'>Nia</span>
                <Link to='/signup' className='nav-signup-btn'>Sign Up</Link>
            </header>
        </div>

        <main className="landing-hero">
        <h1 className="landing-title">Find your next thing.</h1>
        <p className="landing-subtitle">
          Nia is a personalized local discovery app that helps you find
          interesting places and experiences you might otherwise overlook —
          hidden cafés, nature spots, galleries, photography locations,
          family activities, and cultural sites.
        </p>
        <p className="landing-description">
          Tell Nia your location, interests, budget, available time, weather,
          and who you're with, and it recommends places that actually fit —
          explaining <em>why</em> each one matches you with a Nia Match
          score, showing it on a map, and letting you save it or open
          Uber/Maps to get there.
        </p>

        <Link to='/signup' className='main-signup-btn'>Get Started</Link>
        </main>


        </>
    )
}
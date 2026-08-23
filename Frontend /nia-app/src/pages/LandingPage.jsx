import {Link} from 'react-router'
import Footer from '../components/footer'


export default function LandingPage() {

    return (
        <>
        <div className='landing-page'>
            <header className='landing-nav'>
                <span className='landing-logo'>Nia</span>
                {/* <Link to='/signup' className='nav-signup-btn'>Sign Up</Link> */}
                <a href="/signup" className='nav-signup-btn'>Sign Up</a>
            </header>

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

                {/* <Link to='/signup' className='main-signup-btn'>Get Started</Link> */}
                <a href="/signup" className="main-signup-btn">Get Started</a>
            </main>

            <section className="landing-features">
                <div className="feature-card">
                    <h3>Personalized Matches</h3>
                    <p>Every recommendation comes with a Nia Match score and a reason it fits you.</p>
                </div>
                <div className="feature-card">
                    <h3>See It On The Map</h3>
                    <p>Every place is pinned so you know exactly where to go next.</p>
                </div>
                <div className="feature-card">
                    <h3>Get There Instantly</h3>
                    <p>Save a spot or open Uber/Maps directly to head over right away.</p>
                </div>
            </section>

            <Footer/>
        </div>

        </>
    )
}
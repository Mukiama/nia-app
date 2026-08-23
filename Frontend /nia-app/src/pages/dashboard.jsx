import {Link} from 'react-router-dom'
import Footer from '../components/footer'

export default function Dashboard({user}) {


    return (
        <>
        <div className='dashboard-page'>
            <div className='dashboard-card'>

                <h2 className='dashboard-title'><span className='app-name'>Nia</span> Dashboard</h2>
                <div className='dashboard-header'>
                    <div className='greeting-box'>
                        <p className='greeting-text'>
                            Hey {user?.name || 'there'}, ready to discover with <span className='app-name'>Nia</span>
                        </p>
                    </div>
                    <div className='profile-avatar'>
                        <Link to='/profilepage' className='profile-avatar-link'>{user?.name ? user.name.charAt(0).toUpperCase() : '?'}</Link>
                    </div>
                </div>

                <Link to='/' className='homepage-link'>Discover with Nia</Link>

                <Link to='/feeling-lucky' className='lucky-link'>Feeling Lucky</Link>

                <div className='dashboard-shortcuts'>
                    <Link to='/history' className='shortcut-link'>History</Link>
                    <Link to='/favourites' className='shortcut-link'>Favourites</Link>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}
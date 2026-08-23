import './Dashboard.css'
import {Link} from 'react-router'

export default function Dashboard({user}) {


    return (
        <>
        <div className='dashboard-page'>
            <div className='dashboard-card'>

                <div className='dashboard-header'>
                    <div className='greeting-box'>
                        <p className='greeting-text'>
                            Hey {user?.name || 'there'}, ready to discovver with <span className='app-name'>Nia</span>
                        </p>
                    </div>
                    <div className='profile-avatar'>
                        {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                    </div>
                </div>

                <Link to='/' className='homepage-link'>Discover with Nia</Link>

                <Link to='/feeling-lucky' className='lucky-btn'>Feeling Lucky</Link>

                <div className='dashboard-shortcuts'>
                    <Link className='shortcut-btn'>History</Link>
                    <Link className='shortcut-btn'>Favourites</Link>
                </div>
            </div>
        </div>
        </>
    )
}
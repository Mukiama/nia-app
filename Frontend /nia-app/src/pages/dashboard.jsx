import {Link} from 'react-router-dom'
// import Footer from '../components/footer'
// import FilterBar from '../components/filterBar'
import { useState, useEffect } from 'react';
import Filter from './filter';
import { authFetch, getUser } from '../api/client';

export default function Dashboard( ) {
    const [ user, setUser] = useState(getUser());
     const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!user) {
            setIsLoading(false)
            return;
        }

        // Was: fetch(`.../users/${id}`) — that route doesn't exist anywhere
        // in the backend. /verification returns the current logged-in user
        // based on the JWT, which is what this page actually needs.
        authFetch('/verification')
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error("Error fetching user data:", error))
            .finally(() => setIsLoading(false));
    }, []); 

    if (isLoading) {
        return <p className="dashboard-loading"> Loading ... </p>;
    }

    return (
        <>
        {/* <div className='dashboard-page'>
            <div className='dashboard-card'>

                <h2 className='dashboard-title'><span className='app-name'>Nia</span> Dashboard</h2>
                <div className='dashboard-header'>
                    <div className='greeting-box'>
                        <p className='greeting-text'>
                            Hey {user?.name || 'there'}, ready to discover with <span className='app-name'>Nia</span>
                        </p>
                    </div>
                    <div className='profile-avatar'>
                        <Link to='/profile' className='profile-avatar-link'>{user?.name ? user.name.charAt(0).toUpperCase() : '?'}</Link>
                    </div>
                </div>

                <Link to='/filter' className='homepage-link'>
                    Discover with Nia</Link>

                

                <Link to='/feeling-lucky' className='lucky-link'>Feeling Lucky</Link>

                <div className='dashboard-shortcuts'>
                    <Link to='/history' className='shortcut-link'>History</Link>
                    <Link to='/favorites' className='shortcut-link'>Favourites</Link>
                </div>
            </div>
        </div>  */}
        {/* <Footer/> */}
        <Filter />
        </>
    )
}
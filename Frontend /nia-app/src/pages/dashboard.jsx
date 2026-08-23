import './Dashboard.css'

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
                
            </div>
        </div>
        </>
    )
}
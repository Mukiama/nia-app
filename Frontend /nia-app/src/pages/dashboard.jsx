import {Link} from 'react-router-dom'
// import Footer from '../components/footer'
// import FilterBar from '../components/filterBar'
import { useState, useEffect } from 'react';
import Filter from './filter';

export default function Dashboard( ) {
    const [ user, setUser] = useState(null);
     const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem('niaUser')
       

        if (!storedUser) {
            setIsLoading(false)
            return;
        }
            

        fetch(`http://localhost:3001/users/${JSON.parse(storedUser).id}`)
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error("Error fetching user data:", error));
    }, []); 

    if (isLoading) {
        return <p className="dashboard-loading"> Loading ... </p>;
    }

    return (
        <>
        <Filter />
        </>
    )
}
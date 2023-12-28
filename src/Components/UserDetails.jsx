import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './style.css'
const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [clock, setClock] = useState({ time: '', isPaused: false });
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('UTC'); // Default value for the dropdown
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isClockPaused, setIsClockPaused] = useState(false);
    // const history = useHistory();

    useEffect(() => {
        // console.log( axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((response) => {
        //     setUser(response.data);
        //   }))
        // Fetch user details from API
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((response) => {
            setUser(response.data);
        });

        // Fetch user posts from API
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then((response) => {
            setPosts(response.data);
        });
        axios.get('http://worldtimeapi.org/api/timezone').then((response) => {
            setCountries(response.data);
        });
    }, [id]);

    useEffect(() => {
        const fetchCurrentTime = async () => {
            try {
                const response = await axios.get(`http://worldtimeapi.org/api/timezone/${selectedCountry}`);
                setCurrentTime(new Date(response.data.utc_datetime));
            } catch (error) {
                console.error('Error fetching current time:', error);
            }
        };

        if (!isClockPaused) {
            fetchCurrentTime();
            const intervalId = setInterval(fetchCurrentTime, 1000); // Update time every second
            return () => clearInterval(intervalId); // Cleanup interval on component unmount or dependencies change
        }
    }, [selectedCountry, isClockPaused]);

    const toggleClock = () => {
        setClock((prevClock) => ({ ...prevClock, isPaused: !prevClock.isPaused }));
    };
    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handlePauseStartClick = () => {
        setIsClockPaused((prevIsPaused) => !prevIsPaused);
    };

    return (
        <div className='app'>
            <section>
                <section>
                    <div className="box clock-section">
                        <Link to="/">Back</Link>

                        <div>
                            <label>Country:</label>
                            <select value={selectedCountry} onChange={handleCountryChange}>
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="digital-clock">
                            <div className='time'>{currentTime.toLocaleTimeString()}</div>
                            <button onClick={handlePauseStartClick}>{'Start/Pause'}</button>
                        </div>

                    </div>
                </section>
                <div className='label1'>{'Profile Page'}</div>
                <div className="profileCard">
                    <section>
                        <form className="">
                            <div className="">
                                <div>{user.name}</div>
                                <div>UserName | {user.username}</div>
                            </div>
                            <div className="">
                                <div>{user.email}</div>
                                <div>{user.phone}</div>
                            </div>
                        </form>
                    </section>

                </div>
                <div className=''>
                    {posts.map((post) => (
                        <div className='boxCard' key={post.id}>
                            <div className="title">{post.title}</div>
                            <div className="content">{post.body}</div>
                            {/* <h4>{post.title}</h4>
                            <p>{post.body}</p> */}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default UserDetails;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import styles from './Home.module.css';

const Home = () => {
    const [query, setQuery] = useState('');
    const [posts] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <div className={styles.home}>
            <h1>Check our latest posts</h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input type="text" placeholder="or search by tags..." onChange={e => setQuery(e.target.value)} />
                <button className="btn btn-dark">Search</button>
            </form>
            <div>
                <h1>Posts...</h1>
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>No publications were found</p>
                        <Link to="/post/create" className="btn">
                            Publish now
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

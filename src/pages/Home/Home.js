import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

import PostDetail from '../../components/PostDetail';
import styles from './Home.module.css';

const Home = () => {
    const [query, setQuery] = useState('');
    const { documents: posts, loading } = useFetchDocuments('posts');

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <div className={styles.home}>
            <h1>Check out our latest publications</h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input type="text" placeholder="or search by tags..." onChange={e => setQuery(e.target.value)} />
                <button className="btn btn-dark">Search</button>
            </form>
            <div>
                {loading && <p>Loading...</p>}
                {posts && posts.map(post => <PostDetail key={post.id} post={post} />)}
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

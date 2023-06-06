import { Link } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

import styles from './Dashboard.module.css';

const Dashboard = () => {
    const { user } = useAuthValue();
    const uid = user.uid;

    // user post
    const posts = [];

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Manage your posts</p>
            {posts && posts.length === 0 ? (
                <div className={styles.noposts}>
                    <p>No posts found</p>
                    <Link to="/posts/create" className="btn btn-search">
                        create first post
                    </Link>
                </div>
            ) : (
                <div>
                    <p>Has a post</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import { Link } from 'react-router-dom';

import PostDetail from '../../components/PostDetail';
import styles from './Search.module.css';

const Search = () => {
    const query = useQuery();
    const search = query.get('q');

    // Load the docs according to the search term
    const { documents: posts } = useFetchDocuments('posts', search);

    // post is passed as props
    return (
        <div className={styles.search_container}>
            <h2>Search</h2>
            <div>
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>No posts were found</p>
                        <Link to="/" className="btn btn-dark btn-search">
                            Return
                        </Link>
                    </div>
                )}
                {posts && posts.map(post => <PostDetail key={post.id} post={post} />)}
            </div>
        </div>
    );
};

export default Search;

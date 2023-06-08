import { Link } from 'react-router-dom';

import styles from './About.module.css';

const About = () => {
    return (
        <div className={styles.about}>
            <h1>About the Change Adventures</h1>
            <p>This project was built by Yuri Sokolovicz using React on the Front-end and Firebase on the back-end.</p>
            <Link to="/post/create" className="btn">
                Create Post
            </Link>
        </div>
    );
};

export default About;

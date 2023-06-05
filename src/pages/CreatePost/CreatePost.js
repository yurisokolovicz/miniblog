import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { UseInsertDocument } from '../../hooks/useInsertDocument';

import styles from './CreatePost.module.css';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('');

    const { user } = useAuthValue();

    // posts is the name of the collection (docCollection)
    const { insertDocument, response } = UseInsertDocument('posts');

    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        setFormError('');

        // validate image url
        try {
            new URL(image);
        } catch (error) {
            setFormError('The image URL is not valid');
            return;
        }

        // create the tags array
        const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase());

        // check if all the values are not empty
        if (!title || !image || !body || !tags) {
            setFormError('All the fields are required');
        }

        if (formError) return;

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        });

        // redirect to home page
        navigate('/');
    };

    return (
        <div className={styles.create_post}>
            <h2>Create a Post</h2>
            <p>Share your adventures in nature.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Title:</span>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Write your title"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    ></input>
                </label>
                <label>
                    <span>image URL:</span>
                    <input
                        type="text"
                        name="image"
                        required
                        placeholder="Insert an image"
                        onChange={e => setImage(e.target.value)}
                        value={image}
                    ></input>
                </label>
                <label>
                    <span>Content:</span>
                    <textarea
                        name="body"
                        required
                        placeholder="Write the post content"
                        onChange={e => setBody(e.target.value)}
                        value={body}
                    ></textarea>
                </label>
                <label>
                    <span>Tags:</span>
                    <input
                        type="text"
                        name="tags"
                        required
                        placeholder="Enter the tags separated by a comma"
                        onChange={e => setTags(e.target.value)}
                        value={tags}
                    ></input>
                </label>
                {!response.loading && <button className="btn">Register</button>}
                {response.loading && (
                    <button className="btn" disabled>
                        Wait...
                    </button>
                )}
                {response.error && <p className="error">{response.error}</p>}
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
};

export default CreatePost;

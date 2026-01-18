// src/webpages/post.jsx

import '../styles/post-style.css';

const Post = ({post}) => {
    const {title, description, picture, tags} = post;


  return (
    <div className='post-card'
    style={{ backgroundImage: `url(${picture})` }} // <--- THIS LINE IS KEY
    >
        <div className='post-content'>
            <h2 className="post-title">{title}</h2>
            <p className="post-description">{description}</p>
        
             <div className="post-tags">
            {tags && tags.map((tag, index) => (
                <span key={index} className="tag">
                #{tag}
                </span>
          ))}
        </div>
        </div>
    </div>

  );

}
export default Post;
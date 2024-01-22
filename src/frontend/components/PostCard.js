import styles from "./components.module.css";

const PostCard = ({ post }) => {
  return (
    <div className={styles.PostCard}>
      <img className={styles.albumCover} src={post.imageURL} alt="Album Cover" />
      <div className={styles.reviewContent}>
        <h3>{post.albumTitle}</h3>
        <p>Artist: {post.artist}</p>
        <p>{post.review}</p>
      </div>
    </div>
  );
};

export default PostCard;
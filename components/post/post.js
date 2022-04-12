import styles from "../../styles/Blog.module.sass";
import {useEffect, useState} from "react";

export const Post = (props) => {
  const post = props.post

  const [image, setImage] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    fetch(post._links['wp:featuredmedia'][0]['href'])
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setLoading(false)
        setImage(data)
      })
  }, [post._links])

  return (
    !isLoading && (<article className={styles.post}>
      <img className={styles.image} src={image.source_url} alt={image.alt_text} />
      <div className={styles.body}>
        <p className={styles.info}>Bien choisir | Publié le {new Date(post.date).toLocaleDateString("fr-BE")} | Mis à jour le {new Date(post.modified).toLocaleDateString("fr-BE")}</p>
        <p className={styles.title}>{post.title.rendered}</p>
        <p className={styles.content} dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        <a className={styles.link} href={post.link}>Lire plus</a>
      </div>
    </article>)
  )
}
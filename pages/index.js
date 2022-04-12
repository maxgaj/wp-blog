import Head from 'next/head'
import styles from '../styles/Blog.module.sass'
import {useEffect, useState} from "react";
import {Post} from "../components/post/post";

export default function Blog() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    fetch('https://www.comparateur-telecom.be/wp-json/wp/v2/posts')
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0])
        setLoading(false)
        setPosts(data)
      })
  }, [])

  return (
    <div>
      <Head>
        <title>Blog</title>
      </Head>

      <main>
        <section className={styles.section}>
          <h2 className={styles.h2}>Articles les plus récents</h2>
          <div className={styles.post_wrapper}>
            {!isLoading && posts.slice(0, 6).map((post) => {
              return (
                <Post key={post.id} post={post} />
              )
            })}
          </div>

        </section>
      </main>

      <footer>

      </footer>
    </div>
  )
}

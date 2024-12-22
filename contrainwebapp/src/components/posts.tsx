interface Post {
  id: number;
  title: string;
  content: string;
}

export default async function Posts() {

  const response = await fetch('http://localhost:1337/api/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    const posts = data.data.map((post: any) => ({
      id: post.id,
      title: post.title || post.attributes.title, 
      content: post.content || post.attributes.content,
    }));

      return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post: Post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
      )
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import './App.css'


const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  return res.json()
}

const addPost = async (post) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
}



function App() {
  const queryClient = useQueryClient()

  const { data, isPending } = useQuery<any>({
    queryKey: ['posts'],
    queryFn: fetchPosts
  })


  const { mutate } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts']
      })
    }
  })



  if (isPending) return (
    <div>
      ...Loding
    </div>
  )
  return (
    <>
      <div style={{ padding: '20px' }}>
        <h2>Posts Table</h2>
        <button onClick={() => mutate({
          userId: 101,
          id: 101,
          title: "this is my post",
          body: "hello my name is shreyas"
        })}>Add Post</button>
        <br /><br />

        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>

          <tbody>
            {data?.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App

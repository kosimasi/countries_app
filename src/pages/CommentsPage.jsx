import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Navbar from '../components/navbar/Navbar';
const fetchComments = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
  return response.data;
};

function CommentsPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: fetchComments,
  });

  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div>Error loading comments</div>;

  return (
    <div>
        <Navbar />
      <h1>Comments</h1>
      <ul>
        {data.map(comment => (
          <li key={comment.id}>
            <p><strong>{comment.name}</strong> ({comment.email})</p>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentsPage;

import React from 'react'
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/navbar/Navbar';
// import axios from 'axios';


const fetchUserData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.json();
}
const  Users = () =>{
    const{data, error, isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: fetchUserData,
    });
    if(isLoading) return <div>Loading users...</div>;
    if(error) return <div>Error loading users</div>;
    console.log(data);
  return (
    <div >
      <Navbar />
      <h1>Users</h1>
      <ul>
        {data.map(user => (
          <li key={user.id}>
            <p><strong>{user.name}</strong> ({user.email})</p>
            <p>{user.address.city}</p>
          </li>
         
        ))}
         </ul>
    </div>
  )
}

export default Users;

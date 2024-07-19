import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import { FiCheck } from "react-icons/fi";

export default function AllUsers() {
    const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  console.log("users=>",users);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "/api/user/getusers"
        );
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.data.isAdmin) {
      fetchPosts();
    }
  }, []);

  


  return (
    <div className="p-2 w-screen h-screen rouded-lg overflow-x-scroll ">
      {users.length === 0 ? (
        <p className="text-center mt-4">no users</p>
      ) : (
        <table className="min-w-full bg-slate-700 shadow-md ">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-slate-600 text-purple-600 text-start font-semibold text-sm uppercase tracking-wider">
               DATE CREATED
              </th>
              <th className="py-4 px-7 bg-slate-600 text-purple-600 text-start font-semibold text-sm uppercase tracking-wider">
                USER IMAGE
              </th>
              <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-start text-sm uppercase tracking-wider">
                USERNAME
              </th>
              <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-start text-sm uppercase tracking-wider">
                EMAIL
              </th>
              <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-start text-sm uppercase tracking-wider">
                ADMIN
              </th>
              <th className="py-4 px-6 bg-slate-600 text-purple-600 font-semibold text-start text-sm uppercase tracking-wider">
                DELETE
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className=" transition-colors duration-200">
                <td className="py-4 px-6 border-b font-medium  text-sm">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="py-4 px-6 border-b  text-sm">
                  
                    <img
                      src={user.profilePic}
                      alt=""
                      className="h-14 w-14 object-cover rounded-full"
                    />
                 
                </td>
                <td className="py-4 px-6 border-b font-medium  text-sm text-start whitespace-normal">
                  {user.username}
                </td>
                <td className="py-4 px-6 border-b font-medium  text-sm">
                  {user.email}
                </td>
                <td className="py-4 px-6 border-b font-medium  text-sm">
                  <button type='button'
                    
                    className="text-red-600 hover:text-red-700 hover:scale-105 cursor-default   transition-colors duration-200"
                  >
                    {user.isAdmin?(<FiCheck className=' text-green-400  text-center ml-3' />):(<RxCross2 className='text-center ml-3' />)}
                  </button>
                </td>
                <td className="py-4 px-6 border-b font-medium  text-sm">
                  
                    {" "}
                    <button
                      
                      className="text-sky-600 hover:text-blue-700 hover:scale-110 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

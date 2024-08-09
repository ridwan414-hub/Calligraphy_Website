import React, { useEffect, useState } from 'react';
// import Layout from '../../components/Layouts/Layout';
// import AdminMenu from '../../components/Layouts/AdminMenu';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const getAllUsers = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/all-users");
            if (data?.success) {
                setUsers(data);
                console.log(users)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllUsers();
    }, []);
    const toggleBan = (index) => {
        setUsers(
            users.map((user, i) =>
                i === index ? { ...user, isBanned: !user.isBanned } : user
            )
        );
    };

    const deleteUser = (index) => {
        setUsers(users.filter((user, i) => i !== index));
    };
    return (


        <div className='flex'>
            <div className='w-full'>
                <div className='w-3/4 p-3'>
                    <div className="border shadow">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Ban/Unban</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((u, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>

                                            <td>{u?.name}</td>

                                            <td>{u?.email}</td>
                                            <td>{u?.phone}</td>
                                            <td>
                                                <button
                                                    className={`px-2 text-xs font-bold rounded ${u.isBanned
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-red-500 text-white'
                                                        }`}
                                                    onClick={() => toggleBan(i)}
                                                >
                                                    {u.isBanned ? 'Unban' : 'Ban'}
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="px-2 text-xs font-bold rounded bg-red-500 text-white"
                                                    onClick={() => deleteUser(i)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Users;
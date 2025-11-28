import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaUserShield } from 'react-icons/fa6';
import { FiShieldOff } from "react-icons/fi";
import { FaSearch } from 'react-icons/fa';


const UsersManagement = () => {
    const [search, setSearch] = useState('')
    const axiosSecure = useAxiosSecure()

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`)
            return res.data
        }
    })

    const handleMakeAdmin = user => {
        const roleInfo = { role: 'admin' }

        Swal.fire({
            title: `Do you really want to make ${user?.displayName} an Admin?`,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount !== 0) {
                            refetch();
                            Swal.fire({
                                icon: "success",
                                title: `${user?.displayName} marked as an Admin`,
                                position: "top-right"
                            })
                        } (err) => {
                            console.log(`couldn't make ${user.displayName} an Admin`, err)
                        }
                    })
            };
        })
    }

    const removeAdmin = user => {
        const roleInfo = { role: 'user' };

        Swal.fire({
            title: `Do you want to make ${user?.displayName} an User?`,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount !== 0) {
                            refetch();
                            Swal.fire({
                                icon: "success",
                                title: `${user?.displayName} has been removed from Admin`,
                                position: "top-right"
                            })
                        } (err) => {
                            console.log(`couldn't remove ${user.displayName} from Admin`, err)
                        }
                    })
            };
        })
    }

    return (
        <div>
            <h2 className='text-2xl font-bold'>Manage Users ({users.length})</h2>

            <label className="input">
                <FaSearch />

                <input
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    className="grow"
                    placeholder="Search users"
                />
            </label>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {users.map((user, i) => <tr key={i}>
                            <th>{i + 1}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user?.photoURL}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user?.displayName}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="badge badge-ghost badge-sm">{user?.email}</span>
                            </td>
                            <td>{user?.role}</td>
                            <th>
                                {user.role === 'admin' ?
                                    <button onClick={() => removeAdmin(user)} className="btn btn-ghost btn-xs bg-red-500 text-white font-semibold"><FiShieldOff /> </button>
                                    :
                                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-xs bg-green-400 text-white font-semibold"><FaUserShield /> </button>
                                }
                            </th>
                            <th></th>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;
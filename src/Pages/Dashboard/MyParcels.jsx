import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaEdit } from 'react-icons/fa';
import { FaMagnifyingGlass, FaMoneyBill } from 'react-icons/fa6';
import { BsTrash } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`)
            return res.data
        }
    })

    const handleParcelDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcel/${id}`)
                    .then((res) => {
                        // refresh the ui
                        refetch()
                        if (res.data.result.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Parcel has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.log("deletion failed", error)
                    })

            }
        });
    }

    return (
        <div>
            <h2>All of my parcels: {parcels.result?.length}</h2>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Parcel Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Delivery status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels?.result?.map((parcel, i) => <tr key={parcel?._id}>
                                <th>{i + 1}</th>
                                <td>{parcel?.parcelName}</td>
                                <td>{parcel?.cost}</td>
                                <td>
                                    {
                                        parcel.paymentStatus === 'pending' ?
                                            <Link to={`/dashboard/payment/${parcel?._id}`}>
                                                <button className='btn font-semibold btn-primary text-black btn-sm px-4'> Pay</button>
                                            </Link>
                                            :
                                            <span className='badge bg-green-500 font-semibold text-white'>Paid</span>
                                    }
                                </td>
                                <td>Pending</td>
                                <td className='flex gap-1'>
                                    <div className="badge badge-primary text-black">
                                        <FaEdit /> Edit
                                    </div>
                                    <div className="badge badge-outline">
                                        <FaMagnifyingGlass /> Details
                                    </div>
                                    <div onClick={() => handleParcelDelete(parcel?._id)} className="badge bg-red-500 text-black cursor-pointer">
                                        <BsTrash /> Delete
                                    </div>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;
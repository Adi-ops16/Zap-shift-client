import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaUserCheck, FaUserMinus } from 'react-icons/fa6';
import Swal from 'sweetalert2';


const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure()
    const { data: riders = [], refetch } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders')
            return res.data
        }
    })


    const handleRiderApproval = (rider, status) => {
        const updateInfo = { status: status, email: rider.riderEmail }
        Swal.fire({
            title: "Do you want to confirm this person as a rider?",
            text: "You won't be able to revert this!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
                    .then(res => {
                        if (res.data.modifiedCount !== 0) {
                            Swal.fire({
                                position: 'top-end',
                                icon: "success",
                                title: `Rider has been ${status}`,
                                showConfirmButton: false,
                                timer: 2500,
                                timerProgressBar: true
                            })
                            refetch()
                        }
                    })
                    .catch(err => {
                        console.log("error on accepting rider", err)
                    })
            }
        });
    }


    return (
        <div>
            <h2 className='text-4xl font-bold'>Approve Riders</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className=''>Sl</th>
                            <th className=''>Name</th>
                            <th className=''>Age</th>
                            <th className=''>Driving license no.</th>
                            <th className=''>Approval</th>
                            <th className=''>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{rider.riderName}</td>
                                <td>{rider.riderAge}</td>
                                <td>{rider.drivingLicense}</td>

                                <td
                                    className={`badge font-semibold mt-2.5 ${rider.status === 'pending' ? 'badge-warning' : rider.status === 'approved' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                                >
                                    {rider.status}</td>

                                <td>
                                    {
                                        rider.status === 'pending' &&
                                        <div className='flex gap-2'>
                                            <button
                                                onClick={() => handleRiderApproval(rider, 'approved')} className='btn bg-green-500'>
                                                <FaUserCheck color='white' />
                                            </button>
                                            <button
                                                onClick={() => handleRiderApproval(rider, 'rejected')}
                                                className='btn bg-red-500'>
                                                <FaUserMinus color='white' />
                                            </button>
                                        </div>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;
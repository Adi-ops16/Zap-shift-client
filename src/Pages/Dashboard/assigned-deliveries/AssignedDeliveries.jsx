import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignedDeliveries = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&delivery_status=driver_assigned`)
            return res.data
        }
    })


    const handleDeliveryStatus = (parcel, status) => {
        const updateStatus = {
            delivery_status: status,
            riderEmail: parcel.riderEmail,
            trackingId: parcel.trackingId
        }

        let message = `Status updated with ${status.split('_').join(' ')}`

        axiosSecure.patch(`/parcels/status/${parcel._id}`, updateStatus)
            .then(res => {
                if (res.data.modifiedCount !== 0) {
                    refetch()
                    Swal.fire({
                        icon: "success",
                        title: message,
                        text: "Go to your designated location",
                    })
                }
            })
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Parcel name</th>
                            <th>Location</th>
                            <th>status</th>
                            <th>Instructions</th>
                            <th>Actions</th>
                            <th>Other actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.receiverAddress}</td>
                                <td>{parcel.delivery_status}</td>
                                <td>
                                    {parcel["delivery-instructions"]}
                                </td>
                                <td>
                                    <div className=' flex gap-2 items-center'>
                                        {
                                            parcel.delivery_status === 'driver_assigned' ?
                                                <>
                                                    <button
                                                        onClick={() => handleDeliveryStatus(parcel, 'rider_arriving')}
                                                        className='btn btn-primary text-black font-semibold'
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        className='btn bg-red-600 text-white font-semibold'
                                                    >
                                                        Reject
                                                    </button>
                                                </> : <span>Delivery accepted</span>
                                        }
                                    </div>
                                </td>
                                <td>
                                    {
                                        parcel.delivery_status !== 'driver_assigned' &&
                                        <>
                                            <button
                                                disabled={parcel.delivery_status === 'parcel_picked_up' ? true : false}
                                                onClick={() => handleDeliveryStatus(parcel, 'parcel_picked_up')}
                                                className='btn btn-primary text-black font-semibold'
                                            >
                                                Marked as pickup
                                            </button>
                                            <button
                                                disabled={parcel.delivery_status === 'rider_arriving' ? true : false}
                                                onClick={() => handleDeliveryStatus(parcel, 'parcel_delivered')}
                                                className='btn btn-secondary text-white ms-2 font-semibold'
                                            >
                                                Mark as delivered
                                            </button>
                                        </>
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

export default AssignedDeliveries;
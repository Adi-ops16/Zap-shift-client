import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const CompletedDeliveries = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&delivery_status=parcel_delivered`)
            return res.data
        }
    })

    const calculatePayout = parcel => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.cost * 0.8
        } else {
            return parcel.cost * 0.6
        }
    }

    return (
        <div>
            <h2 className="text-4xl font-semibold">Completed deliveries:{parcels.length}</h2>
            <div className="overflow-x-auto">

                <table className="table table-zebra">

                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payout</th>
                            <th>Created At</th>
                            <th>Pickup Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            parcels.map((parcel, i) => <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{parcel?.parcelName}</td>
                                <td>{parcel?.cost}</td>
                                <td>{calculatePayout(parcel)}</td>
                                <td>{parcel?.created_at}</td>
                                <td>{parcel?.senderDistrict}</td>
                                <td>
                                    <button

                                        className='btn btn-primary text-black font-semibold'
                                    >
                                        Cash-out
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>

            </div>
        </div>
    );
};

export default CompletedDeliveries;
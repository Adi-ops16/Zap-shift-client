import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignRiders = () => {
    const axiosSecure = useAxiosSecure()
    const riderModalRef = useRef()
    const [selectedParcel, setSelectedParcel] = useState(null)

    const { refetch: parcelRefetch, data: parcels = [] } = useQuery({
        queryKey: ['parcels', 'parcel_paid'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=parcel_paid')
            return res.data.result
        }
    })

    const { data: riders = [] } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`)
            return res.data
        }
    })

    const openAssignRiderModal = parcel => {
        setSelectedParcel(parcel)
        riderModalRef.current.showModal()
    }

    const handleAssigning = (rider) => {

        const riderAssignInfo = {
            riderId: rider._id,
            riderEmail: rider?.riderEmail,
            riderName: rider?.riderName,
            trackingId: selectedParcel.trackingId
        }

        riderModalRef.current.close()

        Swal.fire({
            title: "Are you sure?",
            text: `You want to assign ${rider.riderName} as a rider for this parcel?`,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#CAEB66",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, assign"

        }).then((result) => {

            if (result.isConfirmed) {

                axiosSecure.patch(`/parcels/assign_rider/${selectedParcel._id}`, riderAssignInfo)
                    .then(res => {

                        if (res.data.modifiedCount !== 0) {

                            parcelRefetch()

                            Swal.fire({
                                title: "Rider assigned!",
                                text: `${rider.riderName} is assigned to deliver this parcel`,
                                icon: "success"
                            });

                        }

                    })
            }

        });
    }

    return (
        <div>
            <h2 className="text-5xl font-bold">Assign riders: {parcels.length}</h2>

            <div className="overflow-x-auto">

                <table className="table table-zebra">

                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Name</th>
                            <th>Cost</th>
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
                                <td>{parcel?.created_at}</td>
                                <td>{parcel?.senderDistrict}</td>
                                <td>
                                    <button
                                        onClick={() => openAssignRiderModal(parcel)}
                                        className='btn btn-primary text-black font-semibold'
                                    >
                                        Find Riders
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>

            </div>

            {/* modal of assigning rider  */}
            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Available riders: {riders.length}</h3>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">

                            <thead>

                                <tr>
                                    <th>Sl</th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Action</th>
                                </tr>

                            </thead>

                            <tbody>

                                {
                                    riders.map((rider, i) => <tr key={rider?._id}>
                                        <th>{i + 1}</th>
                                        <td>{rider?.riderName}</td>
                                        <td>{rider?.riderEmail}</td>
                                        <td>
                                            <button onClick={() => handleAssigning(rider)} className='btn btn-primary text-black font-semibold'>Assign</button>
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>


                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default AssignRiders;
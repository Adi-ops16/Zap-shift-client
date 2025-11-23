import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const SendParcel = () => {

    const {
        register,
        handleSubmit,
        control,
        // formState: { errors },
    } = useForm()

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const warehouses = useLoaderData()
    const regionsDuplicate = warehouses.map(w => w.region)
    const regions = [...new Set(regionsDuplicate)]

    const senderRegion = useWatch({ control, name: 'senderRegion' })
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })

    const districtsByRegion = region => {
        const regionDistricts = warehouses.filter(w => w.region === region)
        const districts = regionDistricts.map(d => d.district)
        return districts
    }


    const handleSendParcel = (data) => {
        const { parcel_type, parcelWeight, senderDistrict, receiverDistrict } = data
        const weight = parseFloat(parcelWeight)
        const isDocument = parcel_type === 'document'
        const sameDistrict = senderDistrict === receiverDistrict

        let cost = 0;
        if (isDocument) {
            cost = sameDistrict ? 60 : 80
        } else {
            if (weight <= 3) {
                cost = sameDistrict ? 110 : 150
            } else {
                const minimumCharge = sameDistrict ? 110 : 150
                const extraWeight = weight - 3
                const extraCharge = sameDistrict ? extraWeight * 40 : extraWeight * 40 + 40
                cost = minimumCharge + extraCharge
            }
        }

        data.cost = cost

        Swal.fire({
            title: "Agree with the cost?",
            text: `You will be charged ${cost}Taka for this`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,i Agree!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.post('/parcel', data)
                    .then((res) => {
                        Swal.fire({
                            title: "Your parcel has been placed for delivery",
                            icon: "success"
                        });

                        if (res.data.result.insertedId) {
                            navigate('/dashboard/my-parcels')
                            Swal.fire({
                                title: "Your parcel has been created please pay for the delivery",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })
            }
        });

    }

    return (
        <div className='max-w-7xl mx-auto bg-white p-4 rounded-2xl'>
            <h2 className='text-3xl font-bold text-secondary'>Send a parcel</h2>
            <form onSubmit={handleSubmit(handleSendParcel)} className='my-12 p-4 text-black'>
                {/* document */}
                <div>
                    <label className='label mr-4'>
                        <input type="radio" {...register('parcel_type')}
                            value="document" className="radio" defaultChecked />
                        Document
                    </label>
                    <label className='label'>
                        <input type="radio" {...register('parcel_type')}
                            value="non-document" className="radio" />
                        Non-Document
                    </label>

                </div>

                {/* parcel info:name,weight  */}
                <div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <fieldset className="fieldset">
                            <label className="label">Parcel Name</label>
                            <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label">Parcel wight (kg)</label>
                            <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight" />
                        </fieldset>
                    </div>
                </div>
                {/* two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3'>
                    {/* sender info */}
                    <div>
                        <h4 className='text-2xl font-bold'>Sender Details</h4>
                        <fieldset className="fieldset">
                            {/* sender name */}
                            <label className="label">Sender Name</label>
                            <input type="text" defaultValue={user?.displayName}
                                {...register('senderName')} className="input w-full" placeholder="Your Name" />
                            {/* sender email */}
                            <label className="label">Sender Email</label>
                            <input type="text" defaultValue={user?.email}
                                {...register('senderEmail')} className="input w-full" placeholder="Your Email" />

                            {/* sender region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Sender Region</legend>
                                <select {...register('senderRegion')} defaultValue="Pick a region" className="select w-full">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            {/* sender districts */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Sender Districts</legend>
                                <select {...register('senderDistrict')} defaultValue="Pick a District" className="select w-full">
                                    <option disabled={true}>Pick a District</option>
                                    {
                                        districtsByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>



                            {/* sender address */}
                            <label className="label mt-4">Your Address</label>
                            <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Address" />
                            {/* sender phone number */}
                            <label className="label mt-4">Phone number</label>
                            <input type="number" {...register('senderNumber')} className="input w-full" placeholder="Number" />
                            {/* pickup instructions */}
                            <label className='label mt-4'>Pickup instructions</label>
                            <textarea {...register('pickup-instructions')} className='textarea w-full resize-none' placeholder='Pickup instructions'></textarea>
                        </fieldset>
                    </div>
                    {/* receiver info */}
                    <div>
                        <div>
                            <h4 className='text-2xl font-bold'>Receiver Details</h4>
                            <fieldset className="fieldset">
                                {/* receiver name */}
                                <label className="label">Receiver Name</label>
                                <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />
                                {/* receiver name */}
                                <label className="label">Receiver Email</label>
                                <input type="text" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />

                                {/* receiver region */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Receiver Region</legend>
                                    <select {...register('receiverRegion')} defaultValue="Pick a region" className="select w-full">
                                        <option disabled={true}>Pick a region</option>
                                        {
                                            regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                        }
                                    </select>
                                </fieldset>

                                {/* receiver district */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Receiver District</legend>
                                    <select {...register('receiverDistrict')} defaultValue="Pick a district" className="select w-full">
                                        <option disabled={true}>Pick a district</option>
                                        {
                                            districtsByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                        }
                                    </select>
                                </fieldset>


                                {/* receiver address */}
                                <label className="label mt-4">Address</label>
                                <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />
                                {/* receiver phone number */}
                                <label className="label mt-4">Phone number</label>
                                <input type="number" {...register('receiverNumber')} className="input w-full" placeholder="Receiver Number" />
                                {/* pickup instructions */}
                                <label className='label mt-4'>Delivery instructions</label>
                                <textarea {...register('delivery-instructions')} className='textarea w-full resize-none' placeholder='Delivery instructions'></textarea>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <button type="submit" className='btn btn-primary mt-3 text-black'>Send Parcel</button>
            </form>
        </div>
    );
};

export default SendParcel;
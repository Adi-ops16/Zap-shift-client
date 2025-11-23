import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import rider from '../../assets/agent-pending.png'
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const Rider = () => {
    const { user } = useAuth()

    const { register, handleSubmit, control } = useForm()
    const axiosSecure = useAxiosSecure()
    const warehouses = useLoaderData()
    const regionsDuplicate = warehouses.map(w => w.region)
    const regions = [...new Set(regionsDuplicate)]

    const districtsByRegion = region => {
        const regionDistricts = warehouses.filter(w => w.region === region)
        const districts = regionDistricts.map(d => d.district)
        return districts
    }
    const riderRegion = useWatch({ control, name: 'riderRegion' })

    const handleRider = (data) => {

        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Your application has been submitted.",
                        text: "Zap-Shift will notify you within three days.",
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 2500
                    })
                }
            })
    }



    return (
        <div className='max-w-7xl mx-auto bg-white rounded-2xl py-5 px-2 md:px-20'>
            <div className='space-y-2 pb-10 mt-10'>
                <h2 className="text-4xl font-bold text-secondary">Be a Rider</h2>
                <p>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. <br /> From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='border-b border-gray-300'></div>

            <form onSubmit={handleSubmit(handleRider)} className='my-2 p-4 text-black'>

                {/* two column */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3'>
                    {/* Rider info */}
                    <div>
                        <div>
                            <h4 className='text-2xl font-bold'>Your Details</h4>
                            <fieldset className="fieldset">
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mb-2'>
                                    <div>
                                        {/* rider name */}
                                        <label className="label">Your Name</label>
                                        <input type="text" {...register('riderName')} className="input w-full" placeholder="Your Name" />
                                    </div>
                                    <div>
                                        {/* rider age */}
                                        <label className="label">Your Age</label>
                                        <input type="number" {...register('riderAge')} className="input w-full" placeholder="Age" />
                                    </div>
                                </div>

                                {/* Driving license name */}
                                <label className="label">Driving license</label>
                                <input type="text" {...register('drivingLicense')} className="input w-full" placeholder="License no." />

                                {/* NID No. */}
                                <label className="label mt-2">Your NID no</label>
                                <input type="text" {...register('nidNumber')} className="input w-full" placeholder="NID no." />

                                {/* rider region */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Your Region</legend>
                                    <select {...register('riderRegion')} defaultValue="Pick a region" className="select w-full">
                                        <option disabled={true}>Pick a region</option>
                                        {
                                            regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                        }
                                    </select>
                                </fieldset>


                                {/* rider district */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Your District</legend>
                                    <select {...register('riderDistrict')} defaultValue="Pick a district" className="select w-full">
                                        <option disabled={true}>Pick a district</option>
                                        {
                                            districtsByRegion(riderRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                        }
                                    </select>
                                </fieldset>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                    <div>
                                        {/* rider email */}
                                        <label className="label">Your Email</label>
                                        <input defaultValue={user.email} readOnly type="text" {...register('riderEmail')} className="input w-full" placeholder="Your email" />
                                    </div>

                                    <div>
                                        {/* Rider phone number */}
                                        <label className="label">Contact</label>
                                        <input type="number" {...register('riderNumber')} className="input w-full" placeholder="Contact" />
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    {/* right side image */}
                    <div>
                        <img src={rider} alt="rider-photo" />
                    </div>
                </div>
                <button type="submit" className='btn btn-primary mt-3 text-black'>Apply</button>
            </form>
        </div>
    );
};

export default Rider;
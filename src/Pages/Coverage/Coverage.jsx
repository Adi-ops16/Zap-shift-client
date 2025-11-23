import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import { useLoaderData } from 'react-router';
import { FaSearch } from 'react-icons/fa';

const Coverage = () => {
    const warehouses = useLoaderData()
    const position = [23.6805, 90.3563]
    const mapRef = useRef(null)

    const handleSearch = (e) => {
        e.preventDefault()
        const location = e.target.location.value

        const district = warehouses.find(c => c.district.toLowerCase().includes(location.toLowerCase()))

        if (district) {
            const coord = [district.latitude, district.longitude]
            console.log(district, coord);
            mapRef.current.flyTo(coord,14)
        }
    }

    return (
        <div className='max-w-7xl mx-auto my-10 bg-white rounded-2xl p-20'>
            {/* any options i want to add */}
            <div className='flex flex-col justify-center items-center space-y-5 mb-10'>
                <h2 className='text-3xl font-bold text-secondary'>We are available in 64 districts</h2>
                <form onSubmit={handleSearch}>
                    <label className="flex">
                        <input
                            name='location'
                            className="input join-item rounded-l-4xl focus-within:outline-none" placeholder="location" />
                        <button className="btn join-item bg-primary rounded-r-full"><FaSearch /></button>
                    </label>
                </form>
            </div>
            {/* map container */}
            <div className='min-h-[calc(100vh/2)] border'>
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='h-[600px]'
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        warehouses.map((center, i) =>
                            <Marker key={i} position={[center.latitude, center.longitude]}>
                                <Popup>
                                    <strong>{center?.district}</strong> <br />
                                    Service Area: {center.covered_area.join(", ")}
                                </Popup>
                            </Marker>
                        )
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;
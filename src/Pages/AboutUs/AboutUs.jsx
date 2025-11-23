import React from 'react';

const AboutUs = () => {
    return (
        <div className='max-w-7xl mx-auto bg-white px-32 py-20 rounded-2xl'>
            <h2 className='text-4xl font-extrabold text-secondary mb-2'>About us</h2>
            <p className='text-base-content mb-6 pb-6 border-b border-gray-300'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            <div className="tabs tabs-border">
                <input type="radio" name="my_tabs" className="tab text-lg" aria-label="Story" defaultChecked />
                <div className="tab-content bg-base-100 p-6">
                    <p>
                        ZapShift began with a simple goal — to make parcel delivery faster,
                        safer, and easier for everyone in Bangladesh. What started as a small
                        local delivery initiative has grown into a nationwide logistics network
                        trusted by individuals, e-commerce sellers, and businesses.
                        <br /><br />
                        Over the years, we’ve adopted smarter tools, real-time tracking, and
                        a customer-first approach to ensure every parcel reaches its destination
                        on time. Our story continues with the mission to modernize last-mile
                        delivery—one shipment at a time.
                    </p>
                </div>

                <input type="radio" name="my_tabs" className="tab text-lg" aria-label="Mission" />
                <div className="tab-content bg-base-100 p-6">
                    <p>
                        Our mission is to simplify parcel delivery by combining technology,
                        transparency, and dedicated service. We aim to:
                    </p>

                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li>Deliver every package quickly and securely.</li>
                        <li>Provide real-time tracking for complete peace of mind.</li>
                        <li>Support businesses with affordable logistics solutions.</li>
                        <li>Create a seamless user experience from pickup to delivery.</li>
                        <li>Build a delivery ecosystem driven by trust and reliability.</li>
                    </ul>
                </div>

                <input type="radio" name="my_tabs" className="tab text-lg" aria-label="Success" />
                <div className="tab-content bg-base-100 p-6">
                    <p>
                        Over the years, ZapShift has achieved major milestones that reflect
                        our dedication and growth:
                    </p>

                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li>Successfully delivered 500,000+ parcels nationwide.</li>
                        <li>Partnered with 2,000+ e-commerce sellers and small businesses.</li>
                        <li>Achieved a 96% on-time delivery rate across all regions.</li>
                        <li>Introduced smart features like live location tracking and instant notifications.</li>
                        <li>Expanded our delivery team and coverage to reach even remote locations.</li>
                    </ul>

                    <p className="mt-4">
                        These achievements continue to motivate us to push boundaries and
                        provide even better delivery experiences.
                    </p>
                </div>

                <input type="radio" name="my_tabs" className="tab text-lg" aria-label="Team & Others" />
                <div className="tab-content bg-base-100 p-6">
                    <p>
                        Behind every successful delivery is a hardworking team committed to
                        excellence. ZapShift is powered by:
                    </p>

                    <ul className="list-disc pl-6 mt-3 space-y-2">
                        <li><strong>Delivery Experts:</strong> Trained professionals ensuring safe and timely deliveries.</li>
                        <li><strong>Customer Support Team:</strong> Always ready to assist with questions or issues.</li>
                        <li><strong>Tech & Operations Team:</strong> Managing systems, tracking, and workflow optimization.</li>
                        <li><strong>Partner Network:</strong> Businesses and merchants that trust us with their logistics.</li>
                    </ul>

                    <p className="mt-4">
                        Together, we aim to build a smarter, more efficient delivery ecosystem
                        that empowers customers and businesses alike.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
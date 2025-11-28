import React from 'react';

const FAQ = () => {
    return (
        <div className='max-w-7xl mx-auto flex flex-col gap-3'>
            <div className='my-10 space-y-5 text-center'>
                <h1 className='text-4xl font-extrabold text-secondary'>Frequently Asked Questions (FAQ)</h1>
                <p className='text-base-content'>
                    Find quick answers about booking, delivery, tracking, payment, and more.
                    We're here to make your parcel delivery experience simple and worry-free!
                </p>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title font-semibold">
                    How do I book a parcel for pickup and delivery?
                </div>
                <div className="collapse-content text-sm">
                    You can book your parcel through our online platform by providing sender
                    information, receiver details, parcel weight, and pickup address.
                    A rider will be assigned instantly to collect your parcel at your preferred time.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    Can I track my parcel in real time?
                </div>
                <div className="collapse-content text-sm">
                    Yes! After booking, you'll receive a tracking ID.
                    You can use it to monitor your parcel's live status, pickup, transit progress, and delivery time.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    Do you offer Cash on Delivery (COD)?
                </div>
                <div className="collapse-content text-sm">
                    Absolutely. We support COD for both small businesses and personal deliveries.
                    The collected amount will be transferred to your preferred payment method on the next settlement cycle.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    What items are restricted for delivery?
                </div>
                <div className="collapse-content text-sm">
                    Items such as liquids, perishable foods, chemicals, flammable products,
                    weapons, and illegal goods are not allowed.
                    Please review our prohibited-items list before booking.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    What is the delivery time for parcels?
                </div>
                <div className="collapse-content text-sm">
                    Standard delivery typically takes **24–48 hours** depending on the destination.
                    Same-day and express delivery options are also available based on location.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    What happens if the recipient is unavailable?
                </div>
                <div className="collapse-content text-sm">
                    If the recipient is unavailable, our rider will attempt delivery again.
                    If both attempts fail, the parcel will be returned to the nearest delivery hub
                    and you will be notified immediately.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    How can I contact customer support?
                </div>
                <div className="collapse-content text-sm">
                    You may contact us through our hotline, live chat, or support email.
                    Our team is available **7 days a week** to assist with booking issues, complaints, and general inquiries.
                </div>
            </div>
        </div>
    );
};

export default FAQ;

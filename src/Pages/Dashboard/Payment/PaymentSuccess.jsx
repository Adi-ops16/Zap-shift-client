import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const [paymentInfo, setPaymentInfo] = useState({})
    const sessionId = searchParams.get('session_id')
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then((res) => {
                    if (res.data.message === 'Payment already exist') {
                        return (setPaymentInfo({
                            transactionId: res.data.transaction_id,
                            trackingId: res.data.trackingId
                        }))
                    }
                    Swal.fire({
                        icon: "success",
                        title: "Congratulations,your payment has been successful",
                        showConfirmButton: false,
                        timer: 2000
                    })
                    setPaymentInfo({
                        transactionId: res.data.transaction_id,
                        trackingId: res.data.trackingId
                    })
                })
        }
    }, [axiosSecure, sessionId])

    return (
        <div>
            <h2 className="text-4xl font-bold ">Payment Successful</h2>
            <p>Your Transaction-ID: {paymentInfo?.transactionId}</p>
            <p>Your tracking-ID: {paymentInfo?.trackingId}</p>
            <Link to={`/parcel-track/${paymentInfo.trackingId}`}
                className='btn btn-primary btn-wide text-black font-semibold'
            >
                Track Your parcel
            </Link>
        </div>
    );
};

export default PaymentSuccess;
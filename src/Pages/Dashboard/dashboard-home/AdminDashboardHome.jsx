import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { TbTruckDelivery } from "react-icons/tb";
import { Legend, Pie, PieChart, Tooltip } from 'recharts';


const AdminDashboardHome = () => {
    const axiosSecure = useAxiosSecure()

    const { data: deliverStats = [] } = useQuery({
        queryKey: ['delivery-status-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/delivery-status/stats')
            return res.data
        }
    })

    const getPieChartData = data => {
        return data.map(i => {
            return { name: i.status, value: i.count }
        })
    }

    return (
        <div>
            <h2>Admin dashing</h2>
            <div className="stats shadow">
                {
                    deliverStats.map(stat => <div className="stat" key={stat._id}>
                        <div className="flex flex-col justify-center items-center text-secondary mt-3">
                            <TbTruckDelivery size={40} />
                        </div>
                        <div className="">
                            <h1 className='text-2xl font-bold text-secondary'>
                                {
                                    stat['_id']
                                        .split('_')
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(' ')
                                }
                            </h1>
                        </div>
                        <div className="stat-value text-center">{stat.count}</div>
                    </div>)
                }
            </div>
            <div className='w-full h-[400px]'>
                <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={getPieChartData(deliverStats)}
                        cx="50%"
                        cy="100%"
                        outerRadius="120%"
                        fill="#8884d8"
                        label
                        isAnimationActive={true}
                    />
                    <Legend></Legend>
                    <Tooltip></Tooltip>
                </PieChart>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
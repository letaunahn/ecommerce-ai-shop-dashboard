import React from 'react'
import { useSelector } from 'react-redux';
import { getLastNMonths } from '../../lib/Helper';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const MonthlySalesChart = () => {
    const {monthlySales} = useSelector((state => state.admin))
    const months = getLastNMonths(4).map(m => m.month)
    const filled = months.map((m) => {
        const found = monthlySales?.find((item) => item.month === m)
        return {
            month: m,
            totalSales: found?.totalSales || 0
        }
    })
  return (
    <>
    <div className='bg-white p-4 rounded-xl shadow-md'>
        <h3 className='font-semibold mb-2'>Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={filled}>
                <XAxis dataKey="month"/>
                <YAxis/>
                <Tooltip/>
                <Line type="monotone" dataKey="totalSales" stroke='#10b981'/>
            </LineChart>
        </ResponsiveContainer>
        </div></>
  )
}

export default MonthlySalesChart
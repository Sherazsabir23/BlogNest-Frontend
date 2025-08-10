import React from 'react'
/* import CountUp from "react-countup" */


function StatsCard({title,counts}) {

  return (

      <div className='bg-gray-800 text-white px-10 font-poppins w-full  py-16 rounded-lg'>
        <h2 className='text-white text-xl capitalize'>{title}</h2>
        <div>
            <p className='text-3xl'>{counts}</p>
        </div>
    </div>
  )
}

export default StatsCard
import React from 'react'
import Animationcounter from "./AnimationCounter"
import DoughnutChart from './DoughnutChart'
const Totalbalancebox = ({totalBanks,totalCurrentBalance,accounts}:TotlaBalanceBoxProps) => {
  return (
        <section className='flex flex-row justify-start items-center rounded-3xl shadow m-4 mr-3'>
        <div className='flex flex-col justify-center items-center ml-2 m-2'>
       <DoughnutChart accounts={accounts}/>
        </div>
        <div>
            <h1 className='flex justify-start text-xl items-center'>Bank Accounts:{totalBanks}</h1>
            <div className='flex flex-col items-center text-gray-600'>
            <p>total Current Balance</p>
            <p className='font-bold text-2xl mt-1'><Animationcounter amount={totalCurrentBalance}/></p> 
            </div>
        </div>
        </section>
  )
}

export default Totalbalancebox
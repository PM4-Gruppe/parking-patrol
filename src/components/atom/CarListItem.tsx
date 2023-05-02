import React from 'react'

interface CarListItem {
  plateNumber: string
  date: string
  carType: string
}

export const CarListItem: React.FC<CarListItem> = ({ plateNumber, date, carType }) => {
  return (
    <div className='m-2 border-b'>
      <div className='my-2 flex rounded-lg flex-row items-center hover:bg-neutral-500'>
        <div className='text-white ml-3 text-xl w-2/3'>
          {plateNumber}
        </div>
        <div className='my-2 pr-3 text-white text-right text-xs w-1/3'>
          <p>{date}</p>
          <p>{carType}</p>
        </div>
      </div>
    </div>
  );
};

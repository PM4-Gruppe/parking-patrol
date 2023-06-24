import React from 'react'
import Link from "next/link";

interface CarListItem {
  plateNumber: string
  date: string
  carType: string
  carPath: string
}

export const CarListItem: React.FC<CarListItem> = ({ plateNumber, date, carType, carPath }) => {
  return (
    <div className="m-2 border-b">
      <Link href={{
        pathname: '/cardetails',
        query: { carpath: carPath}
      }} className="my-2 flex rounded-lg flex-row items-center hover:bg-neutral-500">
        <div className="text-white ml-3 text-xl w-2/3">
          {plateNumber}
        </div>
        <div className="my-2 pr-3 text-white text-right text-xs w-1/3">
          <p>{date}</p>
          <p>{carType}</p>
        </div>
      </Link>
    </div>
  );
};

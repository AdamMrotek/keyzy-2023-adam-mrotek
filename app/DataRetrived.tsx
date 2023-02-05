"use client";

import { useEffect, useState } from "react";

useState;
interface MorgageValues {
  price: number;
  postCode: string;
  discount: number;
  desiredYield: number;
  convertedRentRate: number;
  duration: number;
}
type DataRetrivedProps = {
  morgageValues?: MorgageValues;
};
export default function DataRetrived(props?: DataRetrivedProps) {
  const price = props?.morgageValues?.price;
  const postCode = props?.morgageValues?.postCode;
  //placeHolderDash
  const pHD = (numberOfDashes: number) => {
    return Array(numberOfDashes).fill("_").join(" ");
  };
  const [targetPrice, setTargetPrice] = useState<Number | null>(null);
  const [convertedRate, setConvertedRate] = useState<Number | null>(null);
  const [totalRent, setTotalRent] = useState<Number | null>(null);
  const [rent, setRent] = useState<Number | null>(null);
  const [futurePrice, setFuturePrice] = useState<Number | null>(null);
  const [displayValues, setDisplayValues] = useState(false);
  useEffect(() => {
    if (props?.morgageValues) {
      const { price, discount, desiredYield, convertedRentRate, duration } =
        props.morgageValues;

      // values calculations
      const target_price = price * (1 - discount);
      const rent = (price / 12) * desiredYield;
      const converted_rent =
        (target_price / 12) * desiredYield * convertedRentRate;
      const total_monthly_rent = rent + converted_rent;
      const future_buy_back_price =
        target_price - converted_rent * duration * 12;
      setTargetPrice(target_price);
      setTotalRent(total_monthly_rent);
      setRent(rent);
      setConvertedRate(converted_rent);
      setFuturePrice(future_buy_back_price);
    }
  }, [props?.morgageValues]);
  useEffect(() => {
    if (
      price &&
      targetPrice &&
      totalRent &&
      rent &&
      convertedRate &&
      futurePrice
    ) {
      setDisplayValues(true);
    } else {
      setDisplayValues(false);
    }
  }, [price, targetPrice, totalRent, rent, convertedRate, futurePrice]);

  return (
    <div className="grid grid-col-2-1 my-4 h-full items-center gap-4 ">
      {displayValues && (
        <>
          <h2 className="col-span-2 text-3xl font-bold">Data retrived :</h2>
          <p>Listing price</p>
          <div>{price?.toFixed(2)}</div>
          <p>Post code</p>
          <div>{postCode}</div>
          <h2 className="text-3xl col-span-2 font-bold">Outputs</h2>
          <p>Target price</p>
          <div>
            <>{targetPrice?.toFixed(2)} £</>
          </div>
          <p>Total monthly rental</p>
          <div>
            {" "}
            <>{totalRent?.toFixed(2)} £</>
          </div>
          <p>Rent</p>
          <div>
            {" "}
            <>{rent?.toFixed(2)} £</>
          </div>
          <p>Converted rent</p>
          <div>
            {" "}
            <>{convertedRate?.toFixed(2)} £</>
          </div>
          <p>Future buy-back price</p>
          <div>
            <>{futurePrice?.toFixed(2)}£</>
          </div>
        </>
      )}
      {!targetPrice && (
        <>
          <h2 className="col-span-2 text-3xl font-bold">Data retrived :</h2>
          <p>Listing price</p>
          <div>{pHD(3) + "," + pHD(3)}£</div>
          <p>Post code</p>
          <div>
            {pHD(3)} &nbsp;{pHD(3)}
          </div>
          <h2 className="text-3xl col-span-2 font-bold">Outputs</h2>
          <p>Target price</p>
          <div>{pHD(3) + "," + pHD(3)}£</div>
          <p>Total monthly rental</p>
          <div>{pHD(3)} £</div>
          <p>Rent</p>
          <div>{pHD(3)} £</div>
          <p>Converted rent</p>
          <div>{pHD(3)}£</div>
          <p>Future buy-back price</p>
          <div>{pHD(3) + "," + pHD(3)} £</div>
        </>
      )}
    </div>
  );
}

"use client"
import React from 'react'
import { CountUp } from './count-up';
import { formatCurrency } from '@/lib/utils';

type Props = {
    data:number;
    className?:string;
}

const CountUpComponent = ({data, className}: Props) => {
    return (
        <CountUp
            preserveValue
            start={0}
            end={data}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formatCurrency}
            className={`${className}`}
        />
    )
}

export default CountUpComponent
'use client'
import React from "react";
import CountUp from "react-countup";
const AnimationCounter = ({ amount }:{amount:number}) => {
  return (
    <CountUp
      start={0}
      end={amount}
      duration={4}
      separator=","
      decimals={2}
      decimal=","
      prefix="$"
    ></CountUp>
  );
};

export default AnimationCounter;

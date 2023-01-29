"use client";
import { useState } from "react";
type DataRetrivedProps = { morgageValue?: number };
export default function DataRetrived(props: DataRetrivedProps) {
  const value = props.morgageValue;

  return <div className="flex flex-col my-4">Data retrived :</div>;
}

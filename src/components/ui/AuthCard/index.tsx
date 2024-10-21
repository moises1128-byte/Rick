"use client";
import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";

type AuthProps = {
  title: string;
  description: string;
  type: string;
  path: string;
};

const AuthCard = ({ title, description, type, path }: AuthProps) => {
  const getClassNames = () => {
    return {
      container:
        type === "dark"
          ? "flex flex-row bg-gray-700 gap-2 rounded-md border border-gray-800 items-center w-full text-decoration-none justify-between p-4 transition-all duration-500 ease-in-out hover:opacity-50 hover:scale-105 sm:w-4/5"
          : "flex flex-row bg-white gap-2 rounded-md border border-gray-800 items-center w-full text-decoration-none justify-between p-4 transition-all duration-500 ease-in-out hover:opacity-50 hover:scale-105 sm:w-4/5",
      title:
        type === "dark"
          ? "text-start text-white text-2xl font-bold font-[family-name:var(--font-geist-mono)]"
          : "text-start text-gray-700 text-2xl font-bold font-[family-name:var(--font-geist-mono)]",
      description:
        type === "dark"
          ? "text-gray-200 text-lg leading-8 opacity-80 font-[family-name:var(--font-geist-mono)]"
          : "text-gray-700 text-lg leading-8 font-[family-name:var(--font-geist-mono)]",
      arrowContainer:
        type === "dark"
          ? "flex flex-col justify-center rounded-md border border-gray-200 opacity-20 p-2"
          : "flex flex-col justify-center rounded-md border border-gray-800 p-2",
    };
  };

  const classNames = getClassNames();

  return (
    <Link href={path} className={classNames.container}>
      <div className="flex flex-col">
        <h2 className={classNames.title}>{title}</h2>
        <p className={classNames.description}>{description}</p>
      </div>
      <div className={classNames.arrowContainer}>
        <MdArrowForwardIos color={type === "dark" ? "white" : "#262626"} />
      </div>
    </Link>
  );
};
export default AuthCard;

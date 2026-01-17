import React, { useEffect, useState, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';

import { MenuIcon } from '../ProjectIcon';
import { ColorThema } from '../ProjectThema';

export const Menu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const controls = useAnimation()
    const controlText = useAnimation()
    const controlTitleText = useAnimation()

    const showMore = useCallback(() => {
        controls.start({
            width: '250px',
            transition: { duration: 0.1 }
        })
        controlTitleText.start({
            opacity: 1,
            display: 'block',
            transition: { delay: 0.15 }
        })
        controlText.start({
            opacity: 1,
            display: 'block',
            transition: { delay: 0.15 }
        })
        setIsOpen(true)
    }, [controlText, controlTitleText, controls])

    const showLess = useCallback(() => {
        controls.start({
            width: '80px',
            transition: { duration: 0.1 }
        })
        controlTitleText.start({
            opacity: 0,
            display: 'none',
        })
        controlText.start({
            opacity: 0,
            display: 'none',
        })
        setIsOpen(false)
    }, [controlText, controlTitleText, controls])

    useEffect(() => {
        showLess()
    }, [showLess]);

    return (
        <>
            <motion.div animate={controls} className={`flex flex-col justify-between rounded-r-3xl shadow-xl shadow-black ${ColorThema.Secondary4}`}>
                <div className="flex flex-col mt-5 ml-5">
                    <button onClick={isOpen ? showLess : showMore}
                            className={`flex items-center w-[48px] h-[40px] rounded-md mt-5 text-white bg-[#333353] hover:${ColorThema.Primary1}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            className="w-6 h-6 mx-auto"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <motion.div animate={controlTitleText} className='mt-3 mr-3 overflow-hidden'>
                        {isOpen
                            ? <span className="ml-3 font-bold text-3xl text-white">한전KPS(주)</span>
                            : null}
                    </motion.div>
                    <motion.ul>
                        {MenuIcon.mainMenu.map((item, index) => (
                            <li className={`flex items-center mr-3 h-[40px] rounded-md mt-7 text-white bg-[#333353] hover:${ColorThema.Primary1}`} key={index}>
                                <a href={item.link} className="mx-3">{item.icon}</a>
                                <motion.a animate={controlText} href={item.link} className="text-sm">
                                    {isOpen
                                        ? <span className="text-sm"> {item.name}</span>
                                        : null}
                                </motion.a>
                            </li>
                        ))}
                    </motion.ul>
                </div>

                <div className="p-5"><hr/></div>

                <div className="flex flex-col mt-5 ml-5 mb-40">
                    <ul>
                        <li className={`flex items-center mr-3 h-[40px] rounded-md mt-7 text-white bg-[#333353] hover:${ColorThema.Primary1}`}>
                            <button className="mx-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 mx-auto"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                                    />
                                </svg>
                            </button>
                            <motion.h1 animate={controlText} className="text-sm">
                                {isOpen
                                    ? <button className="text-sm">Language</button>
                                    : null}
                            </motion.h1>
                        </li>

                        {MenuIcon.menuFooter.map((item, index) => (
                            <li className={`flex items-center mr-3 h-[40px] rounded-md mt-7 text-white bg-[#333353] hover:${ColorThema.Primary1}`} key={index}>
                                <a href={item.link} className="mx-3">{item.icon}</a>
                                <motion.a animate={controlText} href={item.link} className="text-sm">
                                    {isOpen
                                        ? <span className="text-sm"> {item.name} </span>
                                        : null}
                                </motion.a>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </>
    );
};

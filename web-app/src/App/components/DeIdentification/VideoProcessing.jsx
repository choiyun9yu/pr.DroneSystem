import React, { useContext, useState } from "react";
import { DroneContext } from "../GCS/SignalRContainer";
import {ColorThema} from "../ProjectThema";
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom'


export const VideoProcessing = () => {
    const {handleAlertToChatbotAsync} = useContext(DroneContext);
    const [open, setOpen] = useState(false);
    const [showWarning2, setShowWarning2] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    let [pageNum, setPageNum] = useState(1)
    let [limitsNum1, setLimitsNum1] = useState(0)
    let [limitsNum2, setLimitsNum2] = useState(0)
    let [limitsNum3, setLimitsNum3] = useState(0)

    const {handleMoveBtn, handleDroneFlightCommand, handleMissionStart} = useContext(DroneContext)
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));
    const handleDroneStart = async () => {
        handleDroneFlightCommand(0)
        await sleep(2000)
        handleDroneFlightCommand(2)
        // setTimeout(() => {
        //     handleDroneFlightCommand(2);
        // }, 3000);
        await sleep(2000)
        handleMoveBtn(35.40957095066379, 126.42122874162915);
        // setTimeout(() => {
        //     handleMoveBtn(35.408985034095515, 126.42478025658983);
        // }, 5000);
    }
        // const styles = {
        //     wrapper: {
        //         width: '500px',
        //         height: '1000px',
        //         border: '1px solid #ddd',
        //         borderRadius: '16px',
        //         overflow: 'hidden',
        //         boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        //         marginTop: '70px',
        //         marginLeft: 'auto',
        //         marginRight: '20px',
        //     },
        //     iframe: {
        //         width: '100%',
        //         height: '100%',
        //         border: 'none',
        //     },
        // };

        const styles = {
            wrapper: {
                position: 'fixed',
                top: 210,
                right: '-500px',   // ← 기본적으로 숨김
                width: '500px',
                height: '80vh',
                transition: 'right 0.3s ease-in-out',
                zIndex: 1000,
            },
            wrapperHover: {
                right: '0',
            },
            iframe: {
                width: '100%',
                height: '100%',
                border: 'none',
            },
            hoverZone: {
                position: 'fixed',
                top: 0,
                right: 0,
                width: '20px',     // ← 마우스 감지용 얇은 영역
                height: '100vh',
                zIndex: 999,
            }
        };

        // return (
        //     <>
        //         <div>
        //             {/*<button onClick={handleClick}>*/}
        //             {/*    Event Act*/}
        //             {/*</button>*/}
        //
        //
        //         </div>
        //
        //         <div style={styles.wrapper}>
        //             <iframe
        //                 src="https://udify.app/chatbot/tgK6tP07v90lZi8j"
        //                 style={styles.iframe}
        //                 allow="microphone"
        //                 title="Dify Chatbot"
        //             />
        //         </div>
        //     </>
        // );

        const handleClick = async () => {
            console.log("HandleAlertToChatbotAsync");
            await handleAlertToChatbotAsync();
        };

        const handlePageUp = () => {
            setPageNum(prev => prev + 1);
        }

        const handleLimitsNum1 = () => {
            setLimitsNum1(prev => prev + 1)
        }

        const handleLimitsNum2 = () => {
            setLimitsNum2(prev => prev + 1)
        }

        const handleLimitsNum3 = () => {
            setLimitsNum3(prev => prev + 1)
        }

        const handleDroneAlet = () => {
            setLimitsNum3(prev => prev + 1);

            setTimeout(() => {
                setShowWarning(true);
            }, 3000);
        };

        const handleFirstClose = () => {
            setShowWarning(false)

            setTimeout(() => {
                setShowWarning2(true);
            }, 2000);
        }

        const handleSecondClose = () => {
            setShowWarning2(false)
            // 드론 작동 함수
        }


        return (
            <>
                <div>
                    {pageNum === 1 &&
                        <div>
                            <div className='mt-20 ml-24 text-white text-9xl font-bold'>생성형 AI를 메신저와 연계</div>
                            <div className='mt-10 ml-32'>
                                <div className='flex flex-col'>
                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1}`}>
                                        <div
                                            onClick={handleLimitsNum1}
                                            className='flex text-white font-bold text-4xl m-3 pl-2'>
                                            [문제점] 챗봇이 존재하지만 낮은 활용도
                                        </div>
                                    </div>
                                    {
                                        limitsNum1 === 1 &&
                                        <div className={'ml-12 text-3xl text-white'}>
                                            <div className={`my-3 text-white text-3xl`}>
                                                - 사내 규정, 업무 절차, 전산 시스템 사용법 문의 등 특정 담당자 또는 선배에게 의존
                                            </div>
                                            <div className={`mb-3 text-white text-3xl`}>
                                                - 반복적인 질문으로 업무 집중도 저하, 근무 시간·연차·퇴근 여부에 따라 응답 지연
                                            </div>
                                            <div className={`mb-3 text-white text-3xl`}>
                                                - 신입 직원 입장에선 질문 자체가 부담, 간부 입장에선 부하 직원 부재 시 업무 추진 곤란
                                            </div>
                                        </div>
                                    }

                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} mt-3`}>
                                        <div
                                            onClick={handleLimitsNum2}
                                            className='flex text-white font-bold text-4xl m-3 pl-2'>
                                            [제안사항] 메신저 연계형 생성형 AI로 사용자 접근성과 친밀도 향상
                                        </div>
                                    </div>
                                    {
                                        limitsNum2 === 1 &&
                                        <div className={'ml-12 text-3xl text-white'}>
                                            <div className={`my-3 text-white text-3xl`}>
                                                - 부하 직원에게 지시하거나 친한 선배 또는 동기에게 물어보듯 질문 가능
                                            </div>
                                            <div className={`mb-3 text-white text-3xl`}>
                                                - RAG 기법을 사용하여 할루시네이션을 없애고 근거가 되는 문서 하이퍼링크 가능
                                            </div>
                                            <div className={`mb-3 text-white text-3xl`}>
                                                - 사내 규정뿐만 아니라 SAP 메뉴얼도 학습시켜 활용 가능
                                            </div>
                                            <div className={`mb-6 text-white text-3xl`}>
                                                - 업무망 데이터베이스와 연동하여 잔여 연차일 수 조회 같은 비서 역할 수행 가능
                                            </div>
                                        </div>
                                    }

                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} mt-3`}>
                                        <div
                                            onClick={handleLimitsNum3}
                                            className='flex text-white font-bold text-4xl m-3 pl-2'>
                                            [시나리오]
                                        </div>
                                    </div>
                                    {
                                        limitsNum3 === 1 &&
                                        <div className={'ml-12 text-3xl text-white'}>
                                            <div className='my-3'>1. 사내 규정 중 법인카드 사용 제한에 대한 문의</div>
                                            <div className='mb-3'>2. SAP 사용 방법 중 T-Code에 대한 문의</div>
                                            <div className='mb-3'>3. 연차 활용 방법과 잔여 연차일 수 문의</div>
                                            <button
                                                onClick={handlePageUp}
                                                className={`flex items-center justify-center mt-7 mr-20 mx-auto h-[50px] w-[120px] rounded-md text-white ${ColorThema.Secondary3} hover:${ColorThema.Primary1}`}>
                                                <div className='m-2 text-3xl font-bold'>Next</div>
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    }

                    {pageNum === 2 &&
                        <div>
                            <div className='mt-20 ml-24 text-white text-9xl font-bold'>AI 드론 에이전트</div>
                            <div className='mt-10 ml-32'>
                                <div className='flex flex-col'>
                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1}`}>
                                        <div
                                            onClick={handleLimitsNum1}
                                            className='flex text-white font-bold text-4xl m-3 pl-2'>
                                            [문제점] 기존 드론활용 설비 점검의 한계
                                        </div>
                                    </div>
                                    {
                                        limitsNum1 === 2 &&
                                        <div className={'ml-12 text-3xl text-white'}>
                                            <div className={`my-3 text-white text-3xl`}>
                                                - 송전설비-발전설비 점검 시 작업자가 직접 현장 근처에 접근해야 함
                                            </div>
                                            <div className={`mb-3 text-white text-3xl`}>
                                                - 긴급 상황 발생 시 이상을 인지하고 보고서 작성까지 많은 시간 소요
                                            </div>
                                        </div>
                                    }

                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} mt-3`}>
                                        <div
                                            onClick={handleLimitsNum2}
                                            className='flex text-white font-bold text-4xl m-3 pl-2'>
                                            [제안사항] AI 드론 에이전트가 송전 설비 이상탐지 및 점검 자동화
                                        </div>
                                    </div>
                                    {
                                        limitsNum2 === 2 &&
                                        <div className={'ml-12 text-3xl text-white'}>
                                            <div className={`my-3 text-white text-3xl`}>
                                                - AI가 설비를 모니터링하며 이상 징후 먼저 탐지하고 알림
                                            </div>
                                            <div className={`mb-3 text-white text-3xl`}>
                                                - AI 에이전트가 자동으로 드론비행승인을 신청하고 정찰
                                            </div>
                                            <div className={`mb-3 text-white text-3xl`}>
                                                - 드론이 정찰 데이터를 기반으로 자동으로 보고서 초안 작성
                                            </div>
                                            <div className={`mb-6 text-white text-3xl`}>
                                                - 점검 > 보고 > 의사결정까지 하나의 흐름으로 자동화
                                            </div>
                                        </div>
                                    }

                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} mt-3`}>
                                        <div
                                            onClick={handleDroneAlet}
                                            className='flex text-white font-bold text-4xl m-3 pl-2'>
                                            [시나리오]
                                        </div>
                                    </div>
                                    {
                                        limitsNum3 === 2 &&
                                        <div className={'ml-12 text-3xl text-white'}>
                                            <div className='my-3'>1. 한빛 송전탑(2)에 이상 상황 발생</div>
                                            <div className='mb-3'>2. AI 에이전트가 이상탐지하고 자동으로 정찰 수행</div>
                                            <div className='mb-3'>3. 정찰 내용을 바탕으로 보고서 초안 작성 및 보고</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    }

                </div>


                <div>
                    {/* 마우스 감지 영역 */}
                    <div
                        style={styles.hoverZone}
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                    />

                    {/* 챗봇 영역 */}
                    <div
                        style={{
                            ...styles.wrapper,
                            ...(open ? styles.wrapperHover : {}),
                        }}
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                    >
                        <iframe
                            src=""
                            style={styles.iframe}
                            allow="microphone"
                            title="KEPCO KPS CHATBOT"
                        />
                    </div>

                    {showWarning && <WarningModal open={showWarning} onClose={() => handleFirstClose(false)}/>}
                    {showWarning2 && <WarningModal2 open={showWarning2} onClose={() => handleSecondClose(false)}
                                                    droneStart={handleDroneStart}/>}

                </div>

            </>
        );
    }

    const WarningModal = ({open, onClose}) => {
        if (!open) return null;

        return createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
                <div className="rounded-lg bg-[#CDCFE9] shadow-2xl">

                    {/* Header */}
                    <div
                        className="flex flex-col w-[400px] h-[220px] items-center justify-center
                               rounded-t-lg font-bold text-2xl text-white bg-[#6359e9]">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-16 h-16 mb-2"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                clipRule="evenodd"
                            />
                        </svg>

                        <div className="flex flex-col items-center text-center">
                            <span className="font-bold text-red-600">WARNING</span>
                            <span className="mt-2 text-sm font-medium">
                            한빛 송전탑(2)에서 이상 징후가 탐지되었습니다.
                        </span>
                            <span className="mt-2 text-sm font-medium opacity-90">
                            AI 에이전트가 드론 비행 승인을 자동 신청했습니다.
                        </span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex h-[70px] items-center justify-center">
                        <button
                            className="py-2 px-6 rounded-md text-white bg-[#1D1D41]
                                   hover:bg-[#6359E9] transition"
                            onClick={onClose}
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        );
    };

    const WarningModal2 = ({open, onClose, droneStart}) => {
        if (!open) return null;

        const handleSimulation = () => {
            onClose()
            droneStart()
        }

        return createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
                <div className="rounded-lg bg-[#CDCFE9] shadow-2xl">

                    <div
                        className="flex flex-col w-[400px] h-[220px] items-center justify-center
                               rounded-t-lg font-bold text-2xl text-white bg-[#6359e9]">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-16 h-16 mb-2"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                clipRule="evenodd"
                            />
                        </svg>

                        <div className="flex flex-col items-center text-center">
                            <span className="font-bold text-yellow-400">Notification</span>
                            <span className="mt-2 text-sm font-medium">
                            드론 비행을 승인 받았습니다.
                        </span>
                            <span className="mt-2 text-sm font-medium opacity-90">
                            한빛 송전탑(2)으로 자동 정찰을 시작합니다.
                        </span>
                        </div>
                    </div>

                    <div className="flex h-[70px] items-center justify-center">
                        <button
                            className="py-2 px-6 rounded-md text-white bg-[#1D1D41]
                                   hover:bg-[#6359E9] transition"
                            onClick={handleSimulation}
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        );
};
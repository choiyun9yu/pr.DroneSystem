import React, {useState} from "react";
import {ColorThema} from "../ProjectThema";

export const ProjectDocuments = () => {
    let [pageNum, setPageNum] = useState(1)

    let [politicalNum1, setPoliticalNum1] = useState(0)
    let [politicalNum2, setPoliticalNum2] = useState(0)
    let [politicalNum3, setPoliticalNum3] = useState(0)

    let [computerNum1, setComputerNum1] = useState(0)
    let [computerNum2, setComputerNum2] = useState(0)
    let [computerNum3, setComputerNum3] = useState(0)

    let [limitsNum1, setLimitsNum1] = useState(0)
    let [limitsNum2, setLimitsNum2] = useState(0)
    let [limitsNum3, setLimitsNum3] = useState(0)

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

    console.log(pageNum)

    return (
        <>
            <div className='h-full'>
                <div className={'flex flex-col h-full'}>
                    {pageNum === 1 &&
                        <div>
                            <div id='introduce-headline' className='mt-56 ml-32 text-8xl font-extrabold text-white'>
                                「기술을 연결하는 전산」
                            </div>
                            <div>
                                <img
                                    src="/Title.png"   // public 폴더 기준
                                    alt="표지 이미지"
                                    className="w-full h-[410px] mt-32 object-cover"
                                />
                            </div>
                            <div className='flex justify-end mt-10 mr-32'>
                                <button
                                    onClick={handlePageUp}
                                    className={`flex items-center mr-3 h-[80px] rounded-md mt-7 text-white ${ColorThema.Secondary3} hover:${ColorThema.Primary1}`}>

                                    <div className='m-6 text-5xl font-bold'>START</div>
                                </button>
                            </div>
                        </div>
                    }

                    {pageNum === 2 &&
                        <div>
                            <div className='mt-64 ml-24 text-white text-9xl font-bold'>INDEX</div>
                            <div className='mt-20 ml-40'>
                                <button
                                    onClick={handlePageUp}
                                    className={`flex items-center mr-3 h-[80px] rounded-md mt-10 text-white ${ColorThema.Secondary3} hover:${ColorThema.Primary1}`}>
                                    <div className='m-6 mx-10 text-5xl font-bold'> 🧭 강점과 약점 및 향후 계획</div>
                                </button>

                                <button
                                    className={`flex items-center mr-3 h-[80px] rounded-md mt-10 text-white ${ColorThema.Secondary3} hover:${ColorThema.Primary1}`}>
                                    <div className='m-6 mx-10 text-5xl font-bold'> ⚙️ 핵심가치: 기술 중심</div>
                                </button>
                            </div>
                        </div>
                    }

                    {pageNum === 3 &&
                        <div>
                            <div className='mt-56 ml-24 text-white text-9xl font-bold'>What is your major?</div>
                                <div className='mt-20 ml-80'>
                                    <div className='flex flex-row '>
                                        <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} m-5`}>
                                            <img
                                                src="/major1.png"   // public 폴더 기준
                                                alt="소개 이미지"
                                                className="w-[410px] h-[410px] object-cover"
                                            />
                                            <div className='flex justify-center text-white font-bold text-3xl m-3'>
                                                Computer Engineering
                                            </div>
                                        </div>

                                        <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} m-5 ml-32`}>
                                        <img
                                            onClick={handlePageUp}
                                            src="/major2.png"   // public 폴더 기준
                                            alt="소개 이미지"
                                            className="w-[410px] h-[410px] object-cover"
                                        />
                                        <div className='flex justify-center text-white font-bold text-3xl m-3'>
                                            Political Science
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {pageNum === 4 &&
                        <div>
                            <div className='mt-24    ml-24 text-white text-9xl font-bold'>What I Learned from Political Science</div>
                            <div className='mt-20 ml-16'>
                                <div className='flex flex-row ml-20'>
                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} m-5`}>
                                        <img
                                            src="/p1.jpeg"   // public 폴더 기준
                                            alt="소개 이미지"
                                            className="w-[350px] h-[410px] object-cover"
                                        />
                                        <div className='flex justify-center text-white font-bold text-2xl m-3'>
                                            다양한 의견 수렴
                                        </div>
                                    </div>

                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} m-5 ml-20`}>
                                        <img
                                            src="/p2.jpeg"   // public 폴더 기준
                                            alt="소개 이미지"
                                            className="w-[350px] h-[410px] object-cover"
                                        />
                                        <div className='flex justify-center text-white font-bold text-2xl m-3'>
                                            갈등 조정
                                        </div>
                                    </div>

                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} m-5 ml-20`}>
                                        <img
                                            onClick={handlePageUp}
                                            src="/p3.jpeg"   // public 폴더 기준
                                            alt="소개 이미지"
                                            className="w-[350px] h-[410px] object-cover"
                                        />
                                        <div className='flex justify-center text-white font-bold text-2xl m-3'>
                                            합리적 결정 도출
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {pageNum === 5 &&
                        <div>
                            <div className='mt-24 ml-24 text-white text-9xl font-bold'>The Same Applies to Computer Engineering</div>
                            <div className='mt-20 ml-16'>
                                <div className='flex flex-row ml-20'>
                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} m-5`}>
                                        <img
                                            src="/c1.jpeg"   // public 폴더 기준
                                            alt="소개 이미지"
                                            className="w-[350px] h-[410px] object-cover"
                                        />
                                        <div className='flex justify-center text-white font-bold text-2xl m-3'>
                                            여러 부서의 요구 사항 수렴
                                        </div>
                                    </div>

                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} m-5 ml-20`}>
                                        <img
                                            src="/c2.jpeg"   // public 폴더 기준
                                            alt="소개 이미지"
                                            className="w-[350px] h-[410px] object-cover"
                                        />
                                        <div className='flex justify-center text-white font-bold text-2xl m-3'>
                                            조직 내 이해관계자와 협력
                                        </div>
                                    </div>

                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} m-5 ml-20`}>
                                        <img
                                            onClick={handlePageUp}
                                            src="/c3.jpeg"   // public 폴더 기준
                                            alt="소개 이미지"
                                            className="w-[350px] h-[410px] object-cover"
                                        />
                                        <div className='flex justify-center text-white font-bold text-2xl m-3'>
                                            시스템을 합리적으로 기획·운영
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {pageNum === 6 &&
                        <div>
                            <div>
                                <div className='mt-16 ml-24 text-white text-9xl font-bold'>Current Limits in</div>
                                <div className='ml-96 text-white text-9xl font-bold'>Technical Depth</div>
                            </div>
                            <div className='mt-10 ml-16'>
                                <div className='flex flex-col ml-32'>
                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} m-5`}>
                                        <div
                                            onClick={handleLimitsNum1}
                                            className='flex text-white font-bold text-4xl m-3'>
                                            📌 현재 수준
                                        </div>
                                    </div>
                                    {
                                        limitsNum1 === 1 &&
                                        <div className={'ml-16 text-2xl text-white'}>
                                            <div className='mb-2'>▸ 서버, 네트워크, 데이터베이스 등 <span className={'font-bold underline'}>IT 인프라 전반에 대한 기본적인 이해</span></div>
                                            <div className='mb-2'>▸ AIoT 프로젝트 연구·개발 및 사업화 경험</div>
                                            <div className='mb-2'>▸ 기술적 이슈를 이해하고, 관련 부서 및 담당자와 원활히 소통할 수 있는 역량</div>
                                        </div>
                                    }

                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} m-5`}>
                                        <div
                                            onClick={handleLimitsNum2}
                                            className='flex text-white font-bold text-4xl m-3'>
                                            ⚠️ 보완이 필요한 부분
                                        </div>
                                    </div>
                                    {
                                        limitsNum2 === 1 &&
                                        <div className={'ml-16 text-2xl text-white'}>
                                            <div className='mb-2'>▸ 한전KPS <span className={'font-bold underline'}>IT 아키텍처 전반에 대한 이해</span></div>
                                            <div className='mb-2'>▸ 복합적인 시스템 장애 발생 시, 보다 심층적인 기술 분석 역량</div>
                                            <div className='mb-2'>▸ 특정 기술 분야에 대한 <span className={'font-bold underline'}>심화된 전문 지식</span></div>
                                        </div>
                                    }

                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} m-5`}>
                                        <div
                                            onClick={handleLimitsNum3}
                                            className='flex text-white font-bold text-4xl m-3'>
                                            🎯 보완이 필요한 이유
                                        </div>
                                    </div>
                                    {
                                        limitsNum3 === 1 &&
                                        <>
                                            <div className={'ml-16 text-2xl text-white'}>
                                                <div className='mb-2'>▸ IT 아키텍처에 대한 이해와 분석 역량은 <span className={'font-bold underline'}>시스템 기획·운영 및 안정성과 직결됨</span></div>
                                                <div className='mb-2'>▸ 장기적인 시스템 운영과 고도화를 위해 <span className={'font-bold underline'}>특정 기술 분야에 대한 전문성 확보</span>가 필요함</div>
                                            </div>

                                            <button
                                                onClick={handlePageUp}
                                                className={`flex items-center justify-center mr-20 mx-auto h-[50px] w-[100px] rounded-md text-white ${ColorThema.Secondary3} hover:${ColorThema.Primary1}`}>
                                                <div className='mx-2 text-2xl font-bold'>Next</div>
                                            </button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    }

                    {pageNum === 7 &&
                        <div>
                            <div className='mt-24 ml-24 text-white text-9xl font-bold'>Overcoming these limits through Learning</div>
                            <div className='flex items-end mt-32 ml-16'>
                                <div className='flex-col ml-20 text-white w-[90%]'>
                                    <div className={'flex flex-col'}>
                                        <div className={'flex justify-center px-2 text-md font-bold w-[98px] mb-1 rounded-md bg-red-600'}><span className={'flex'}>조직 내 성장</span></div>
                                        <div className={'flex justify-center px-2 text-md font-bold w-[98px] rounded-md bg-blue-600'}><span className={'flex'}>조직 외 성장</span></div>
                                    </div>
                                    <div className='flex flex-row items-end w-full'>
                                        <div className='flex flex-col flex-1'>
                                            <div className={'px-2 font-bold text-xl'}>[1년 차]</div>
                                            <div>
                                                <div
                                                    className={'flex justify-center my-2 p-2 rounded-md bg-red-600 text-xl font-bold'}>
                                                    KPS의 IT 아키텍처 학습
                                                </div>
                                                <div
                                                    className={'flex justify-center my-2 p-2 rounded-md bg-blue-600 text-xl font-bold'}>
                                                    TOEIC 900점 달성
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex flex-col flex-1'>
                                            <div className={'px-2 font-bold text-xl'}>[2~4년 차]</div>
                                            <div className={''}>
                                                <div
                                                    className={'flex justify-center my-2 p-2 rounded-md bg-red-600 text-xl font-bold'}>
                                                    직원으로서의 실무 경험 축적
                                                </div>
                                                <div
                                                    className={'flex justify-center my-2 mb-[102px] p-2 rounded-md bg-blue-600 text-xl font-bold'}>
                                                    인공지능 파트타임 석사 과정 이수
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex flex-col flex-1'>
                                            <div className={'px-2 font-bold text-xl'}>[5~9년 차]</div>
                                            <div className={''}>
                                                <div
                                                    className={'flex justify-center my-2 p-2 rounded-md bg-red-600 text-xl font-bold'}>
                                                    초급간부 시험 승격 도전
                                                </div>
                                                <div
                                                    className={'flex justify-center my-2 mb-[196px] p-2 rounded-md bg-blue-600 text-xl font-bold'}>
                                                    인공지능 관련 특허 등록
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex flex-col flex-1'>
                                            <div className={'px-2 font-bold text-xl'}>[10년 차 이상]</div>
                                            <div className={''}>
                                                <div
                                                    className={'flex justify-center my-2 p-2 rounded-md bg-red-600 text-xl font-bold'}>
                                                    디지털기술개발센터, 인재개발원 근무
                                                </div>
                                                <div
                                                    className={'flex justify-center my-2 mb-[290px] p-2 rounded-md bg-blue-600 text-xl font-bold'}>
                                                    대한민국 기술대상 수상 목표
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        onClick={handlePageUp}
                                        className="flex flex-row items-center border h-12 rounded-md text-white font-semibold"
                                    >
                                        <div className="flex-1 flex justify-center text-xl font-bold">Step1. 기반 구축</div>
                                        <div className="flex-1 flex justify-center text-xl font-bold">Step2. 전문성 강화</div>
                                        <div className="flex-1 flex justify-center text-xl font-bold">Step3. 주도적 역할 전환</div>
                                        <div className="flex-1 flex justify-center text-xl font-bold">Step4. 조직과 사회에 기여</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {pageNum === 8 &&
                        <div>
                            <div className='mt-64 ml-24 text-white text-9xl font-bold'>INDEX</div>
                            <div className='mt-20 ml-40'>
                            <button
                                    className={`flex items-center mr-3 h-[80px] rounded-md mt-10 text-white ${ColorThema.Secondary3} hover:${ColorThema.Primary1}`}>
                                    <div className='m-6 mx-10 text-5xl font-bold'> 🧭 강점과 약점 및 향후 계획</div>
                                </button>

                                <button
                                    onClick={handlePageUp}
                                    className={`flex items-center mr-3 h-[80px] rounded-md mt-10 text-white ${ColorThema.Secondary3} hover:${ColorThema.Primary1}`}>
                                    <div className='m-6 mx-10 text-5xl font-bold'> ⚙️ 핵심가치: 기술 중심</div>
                                </button>
                            </div>
                        </div>
                    }

                    {pageNum === 9 &&
                        <div>
                            <div>
                                <div className='mt-24 ml-24 text-white text-9xl font-bold'>What does
                                    Technology Oriented?
                                </div>
                            </div>
                            <div className='mt-10 ml-16'>
                                <div className='flex flex-col ml-32'>
                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} m-5`}>
                                        <div
                                            onClick={handleLimitsNum1}
                                            className='flex text-white font-bold text-4xl m-3'>
                                            ⚙️ 기술 결정론 - 기술이 사회 변화의 핵심 원동력이라는 관점
                                        </div>
                                    </div>
                                    {
                                        limitsNum1 === 2 &&
                                        <div className={'ml-16 text-2xl text-white'}>
                                            <div className='mb-2'>▸ 기술의 발전이 사회 구조·문화·제도·인간 행동을 주도적으로 결정한다는 관점</div>
                                            <div className='mb-2'>▸ <span className={'font-bold underline'}>우리 회사가 지금까지 설정해 온 방향</span>으로, 챗봇·생성형 AI·드론 등 다양한 신기술을 도입해 옴</div>
                                            <div className='mb-2'>▸ 그러나 <span className={'font-bold underline'}>실제 현장과 실무에서는 충분히 활용되지 못해</span>, 기술이 가진 잠재적 효용이 온전히 발휘되지 못하는 한계가 존재</div>
                                        </div>
                                    }

                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} m-5`}>
                                        <div
                                            onClick={handleLimitsNum2}
                                            className='flex text-white font-bold text-4xl m-3'>
                                            🧩 사회 결정론 - 기술은 중립적 도구이며, 어떻게 쓰이는지가 중요하다는 관점
                                        </div>
                                    </div>
                                    {
                                        limitsNum2 === 2 &&
                                        <div className={'ml-16 text-2xl text-white'}>
                                            <div className='mb-2'>▸ 사회·정치·경제·문화 등 기술 외적 요인이 기술의 개발과 활용을 결정한다는 관점</div>
                                            <div className='mb-2'>▸ 조직 문화와 절차, 사용 권한과 접근성, 현장 실무자들의 <span className={'font-bold underline'}>활용 방식이 기술의 실제 효용을 결정</span>함
                                            </div>
                                            <div className='mb-2'>▸ 기술이 아무리 우수하더라도, 접근성과 실무 환경이 뒷받침되지 않으면 효율은 크게 저하됨</div>
                                        </div>
                                    }

                                    <div className={`${ColorThema.Secondary3} hover:${ColorThema.Primary1} m-5`}>
                                        <div
                                            onClick={handleLimitsNum3}
                                            className='flex text-white font-bold text-4xl m-3'>
                                            🔍 신입사원 관점에서 바라본 한전KPS의 ‘기술 중시’
                                        </div>
                                    </div>
                                    {
                                        limitsNum3 === 2 &&
                                        <>
                                            <div className={'ml-16 text-2xl text-white'}>
                                                <div className='mb-2'>▸ 기술 중시의 핵심은 <span className={'font-bold underline'}>단순히 최신 기술을 도입하는 데 있는 것이 아니라</span>
                                                </div>
                                                <div className='mb-2'>▸ 실무 현장에서 <span className={'font-bold underline'}>기술 활용을 촉진할 수 있는 구조와 환경을 함께 설계</span>하는 데 있다고 생각함
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    }


                </div>
            </div>
        </>
    )
}
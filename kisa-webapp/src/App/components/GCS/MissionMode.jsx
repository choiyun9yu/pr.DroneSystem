import React, {useContext, useState, useEffect} from "react";

import { ColorThema } from '../ProejctThema';

export const MissionMode = (props) => {
    const [missionData, setMissionData] = useState([]);
    const [missionList, setMissionList] = useState([]);
    const [selectMission, setSelectMission] = useState({});
    const [selectStartPoint, setSelectStartPoint] = useState('미정');
    const [selectTargetPoint, setSelectTargetPoint] = useState('미정');
    const [selectTransitPoint, setSelectTransitPoint] = useState(['없음']);
    const [selectFlightAlt, setSelectFlightAlt] = useState(0);
    const [selectFlightDistance, setSelectFlightDistance] = useState('미정');
    const [selectTakeTime, setSelectTakeTime] = useState('미정');
    const [pointsList, setPointsList] = useState([]);
    const [transitCount, setTransitCount] = useState(0);
    const [directInput, setDirectInput] = useState(true);
    const [flightAlt, setFlightAlt] = useState(10);
    const [altScale, setAltScale] = useState(1);
    const [checkBtn, setCheckBtn] = useState(false);

    const handleMissionSelect = (e)=> {
        e.preventDefault();
        const { name, value } = e.target;
        setSelectMission(value);
    }

    const handleDeleteMission = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await fetch('http://localhost:5000/api/deletemissionload', {
                method: 'DELETE',
                body: formData,
            });
            if (response.ok) {
                // console.log('요청 성공');
                setCheckBtn(!checkBtn)
            } else {
                console.error('요청 실패');
            }
        } catch (error) {
            console.error('요청 중 오류 발생', error);
        } finally {
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
        }
    };

    const handleMissionStart = () => {
        /*
         * To Do
         * SignalRContainer 에 있는 함수들을 활용해서 미션을 전달하는 로직 구현
         */

        // 시동 걸고
        // 비행 고도 높이로 takeoff 하고
        // 스타팅포인트 출발지점으로 설정
        // 타겟포인트 목표지점으로 설정
        // 이동 명령 전달

        // 이부분이 고민인데, 경유 지점은 어떻게 구현할 것인가?

        // 이부분이 고민인데, 도착했다는걸 어떤 조건으로 파악하고, 도착했으면 랜드
    }

    const handleAltUp = () => {
        setFlightAlt(flightAlt+(1*altScale))
    }

    const handleAltDown = () => {
        if (flightAlt > 1) {
            setFlightAlt(flightAlt-(1*altScale))
        }
    }

    const handleAltScale = () => {
        if (altScale === 1) {
            setAltScale(10);
        }
        else if (altScale === 10) {
            setAltScale(1);
        }
    }

    const handleTransitUp = () => {
        if (transitCount<9){
            setTransitCount(transitCount+1);
        }
    }

    const handleTransitDown = () => {
        if (transitCount > 0) {
            setTransitCount(transitCount-1)
        }
    }

    const handleCreateMission = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await fetch('http://localhost:5000/api/createmission', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                // console.log('요청 성공');
                setCheckBtn(!checkBtn)
            } else {
                console.error('요청 실패');
            }
        } catch (error) {
            console.error('요청 중 오류 발생', error);
        } finally {
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            // console.log('폼 데이터:', data)
        }
    }

    const handleCurrentPoint = () => {
        props.handleCurrentPoint();
        if (directInput) {
            setDirectInput(false)
        }
        if (props.isLocalMarker){
            props.handleIsLocalMarker();
        }
    }

    const handleIsLocalMarker = () => {
        props.handleIsLocalMarker();
        if (directInput) {
            setDirectInput(false)
        }
    }

    const handleDirectInput = () => {
        setDirectInput(!directInput);
        if (props.isLocalMarker){
            props.handleIsLocalMarker();
        }
    }

    const handleEnrollPoint = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await fetch('http://localhost:5000/api/addwaypoint', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                // console.log('요청 성공');
                setCheckBtn(!checkBtn)
            } else {
                console.error('요청 실패');
            }
        } catch (error) {
            console.error('요청 중 오류 발생', error);
        } finally {
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
        }
    }

    const handleDeletePoint = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await fetch('http://localhost:5000/api/deletelocalpoint', {
                method: 'DELETE',
                body: formData,
            });
            if (response.ok) {
                // console.log('요청 성공');
                setCheckBtn(!checkBtn)
            } else {
                console.error('요청 실패');
            }
        } catch (error) {
                console.error('요청 중 오류 발생', error);
        } finally {
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
        }
    };

    useEffect(() => {
        const fetchLocalPoints = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/localpoints', {
                    method: 'GET',
                });
                if (response.ok) {
                    // console.log('요청 성공');
                    const data = await response.json();
                    setPointsList(data['localPointList']);
                } else {
                    console.error('요청 실패');
                }
            } catch (error) {
                console.error('요청 중 오류 발생', error);
            }
        };

        const fetchMissionLoad = async () => {
            try{
                const response = await fetch('http://localhost:5000/api/selectmission', {
                    method: 'GET',
                });
                if (response.ok) {
                    // console.log("요청 성공");
                    const data = await response.json();
                    const missionListData = [];
                    data.map(obj => {
                        missionListData.push(obj._id)
                    })
                    setMissionData(data)
                    setMissionList(missionListData)
                    missionData.map(obj => {
                        if (obj._id === selectMission){
                            setSelectStartPoint(obj.startPoint)
                            setSelectTransitPoint(obj.transitPoints)
                            setSelectTargetPoint(obj.targetPoint)
                            setSelectFlightAlt(obj.flightAlt)
                            setSelectFlightDistance(obj.flightDistance)
                            setSelectTakeTime(obj.takeTime)
                        }
                    })
                } else {
                    console.error("요청 실패");
                }
            } catch (error) {
                console.error('요청 중 오류 발생', error);
            }
        }

        fetchLocalPoints()

        fetchMissionLoad()

    }, [selectMission, checkBtn])

    return (
        <div id="right-sidebar" className="flex flex-col w-[300px]">
            <div className={`flex flex-col w-full h-full overflow-auto rounded-2xl ${ColorThema.Secondary4}`}>
                <div className="flex m-2 items-center">
                    <span className="text-white rounded-md m-3 font-bold text-medium">• 드론 미션</span>
                </div>
                {props.isMissionBtn
                    ?(
                        <div className={`m-2 text-white`}>
                            <form id={'missionload'} onSubmit={handleDeleteMission}>
                                <div className={`font-bold`}>
                                    미션 시작 하기
                                </div>
                                <div className={`m-2`}>
                                    <div className={`flex items-center`}>
                                        <span>미션 선택 : </span>
                                        <select
                                            onChange={handleMissionSelect}
                                            className={`flex m-1 w-[170px] h-[23px] text-black px-2`}
                                            name={'MissionName'}>
                                            {missionList.map((item, index) => (
                                                <option
                                                    value={item} key={index}>{item}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className={`flex flex-col mx-3 text-gray-400`}>
                                        <span>출발 지점 : {selectStartPoint}</span>
                                        <div className={`flex flex-row items-start justify-start`}>
                                            <div className={`flex w-[95px]`}>경유 지점 :</div>

                                            <div className={`flex w-[87%]`}>{(selectTransitPoint.length === 0)
                                                ? "없음"
                                                : selectTransitPoint.join(' - ')}
                                            </div>
                                        </div>
                                        <span>목표 지점 : {selectTargetPoint}</span>
                                        <span>비행 고도 : {selectFlightAlt} m</span>
                                        <span>예상 비행 거리 : {selectFlightDistance}</span>
                                        <span>예상 소요 시간  : {selectTakeTime}</span>
                                    </div>
                                </div>

                                <div className={`flex justify-end mx-5 mt-2`}>
                                    <button
                                        className={`flex mr-2 px-2 rounded-xl border hover:bg-[#6359E9]`}>
                                        제거
                                    </button>
                                    <button
                                        type={'button'} onClick={handleMissionStart}
                                        className={`flex px-2 rounded-xl border hover:bg-[#6359E9]`}>
                                        미션 시작
                                    </button>
                                </div>
                            </form>

                            <form id={'missionenroll'} className={`mt-3`}
                                  onSubmit={handleCreateMission}>
                                <div className={`font-bold`}>
                                미션 생성 하기
                                </div>

                                <div className={`flex flex-col m-2`}>
                                    <div className={`flex items-center`}>
                                        <span className={`mr-2`}>출발 지점</span>
                                        :
                                        <select

                                            className={`flex m-1 w-[170px] h-[23px] text-black px-2`}
                                            name={'StartPoint'}>
                                            {pointsList.map((item, index) => (
                                                <option value={item} key={index}>{item}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <TransitInput transitCount={transitCount} pointsList={pointsList}/>

                                    <div className={`flex items-center`}>
                                        <span className={`mr-2`}>목표 지점 </span>
                                        :
                                        <select
                                            className={`flex m-1 w-[170px] h-[23px] text-black px-2`}
                                            name={'TargetPoint'}>
                                            {pointsList.map((item, index) => (
                                                <option value={item} key={index}>{item}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className={`flex items-center`}>
                                        <span className={`mr-2`}>비행 고도
                                            <span className={`text-sm`}>(m)</span>
                                        </span>
                                        :
                                        <input
                                            className={`m-1 w-[45px] text-black px-2`}
                                            name={'FlightAlt'}
                                            type={'text'}
                                            value={flightAlt}
                                            placeholder={'비행 고도를 입력하세요'}
                                            readOnly>
                                        </input>

                                        <div className={`flex`}>
                                            <button type="button" onClick={handleAltUp}
                                                    className={`flex justify-center ml-2 w-[25px] h-full rounded-lg border hover:bg-[#6359E9]`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="w-4 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="m4.5 15.75 7.5-7.5 7.5 7.5"/>
                                                </svg>
                                            </button>
                                            <button type="button" onClick={handleAltDown}
                                                    className={`flex justify-center ml-1 w-[25px] h-full rounded-lg border hover:bg-[#6359E9]`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="w-4 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                                                </svg>
                                            </button>

                                            {(altScale === 1)
                                                ? (
                                                    <button type="button" onClick={handleAltScale}
                                                            className={`flex justify-center ml-1 w-[40px] h-full px-2 rounded-lg border hover:bg-[#6359E9]`}>
                                                        x10
                                                    </button>
                                                )
                                                : (
                                                    <button type="button" onClick={handleAltScale}
                                                            className={`flex justify-center ml-1 w-[40px] h-full px-2 rounded-xl border bg-[#6359E9]`}>
                                                        x10
                                                    </button>
                                                )
                                            }
                                        </div>

                                    </div>

                                    <div className={`flex justify-end mx-3 mt-2`}>
                                        <div className={`flex flex-row mr-3 pl-2 rounded-xl border`}>
                                            경유지
                                            <button type="button" onClick={handleTransitUp}
                                                    className={`flex px-1 hover:text-[#6359E9]`}>
                                                추가
                                            </button>
                                            |
                                            <button type="button" onClick={handleTransitDown}
                                                    className={`flex mr-2 pl-1 hover:text-[#6359E9]`}>
                                                삭제
                                            </button>
                                        </div>

                                        <button
                                            className={`flex px-2 rounded-xl border hover:bg-[#6359E9]`}>
                                            생성
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/*<form id={`waypointdelete`} className={`mt-5`}*/}
                            {/*      onSubmit={handleDeleteMission}>*/}
                            {/*    <div className={`font-bold`}>*/}
                            {/*        미션 삭제 하기*/}
                            {/*    </div>*/}
                            {/*    <div className={`flex flex-row justify-end px-2 m-2`}>*/}
                            {/*        <div>*/}
                            {/*            <select*/}
                            {/*                onChange={handleMissionSelect}*/}
                            {/*                className={`flex m-1 w-[170px] h-[23px] text-black px-2`}*/}
                            {/*                name={'MissionName'}>*/}
                            {/*                {missionList.map((item, index) => (*/}
                            {/*                    <option*/}
                            {/*                        value={item} key={index}>{item}</option>*/}
                            {/*                ))}*/}
                            {/*            </select>*/}
                            {/*        </div>*/}
                            {/*        <div className={`flex items-end ml-3`}>*/}
                            {/*            <button*/}
                            {/*                className={`flex px-2 mb-0.5 rounded-xl border hover:bg-[#6359E9]`}>*/}
                            {/*                삭제*/}
                            {/*            </button>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</form>*/}
                        </div>
                    )
                    : null
                }

                {props.isWayPoint
                    ? (
                        <div className={`m-2 text-white mt-5`}>
                            <form id={`waypointadd`}
                                  onSubmit={handleEnrollPoint}>
                                <div className={`font-bold`}>
                                    지점 추가 하기
                                </div>

                                <div className={`m-2`}>
                                    <div>
                                        <span>지점 이름 : </span>
                                        <input
                                            className={`m-1 w-[170px] text-black px-2`}
                                            name={'LocalName'}
                                            type={'text'}
                                            placeholder={`지점 이름을 임력하세요`}>
                                        </input>
                                    </div>
                                    {directInput
                                        ? (
                                            <>
                                                <div>
                                                    <span>지점 위도 : </span>
                                                    <input
                                                        className={`m-1 w-[170px] text-black px-2`}
                                                        name={'LocalLat'}
                                                    type={'text'}
                                                    placeholder={'위도를 입력하세요'}>
                                                </input>
                                            </div>

                                            <div>
                                                <span>지점 경도 : </span>
                                                <input
                                                    className={`m-1 w-[170px] text-black px-2`}
                                                    name={'LocalLon'}
                                                    type={'text'}
                                                    placeholder={'경도를 입력하세요'}>
                                                </input>
                                            </div>
                                        </>
                                    )
                                    : (<>
                                            <div>
                                                <span>지점 위도 : </span>
                                                <input
                                                    className={`m-1 w-[170px] text-black px-2`}
                                                    name={'LocalLat'}
                                                    type={'text'}
                                                    value={`${props.localLat ?? ""}`}
                                                    placeholder={'위도를 입력하세요'}>
                                                </input>
                                            </div>

                                            <div>
                                                <span>지점 경도 : </span>
                                                <input
                                                    className={`m-1 w-[170px] text-black px-2`}
                                                    name={'LocalLon'}
                                                    type={'text'}
                                                    value={`${props.localLon ?? ""}`}
                                                    placeholder={'경도를 입력하세요'}>
                                                </input>
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            <div className={`flex flex-col px-2 mr-2`}>
                                <div className={`flex flex-row justify-end`}>
                                    <button
                                        onClick={handleCurrentPoint}
                                        className={`flex px-1 rounded-xl border hover:bg-[#6359E9]`}>
                                        현재 위치
                                    </button>

                                    {props.isLocalMarker
                                        ? (<button
                                            onClick={handleIsLocalMarker}
                                            className={`flex mx-2 px-1 rounded-xl border bg-[#6359E9]`}>
                                            마커 위치
                                        </button>)
                                        : (<button
                                            onClick={handleIsLocalMarker}
                                            className={`flex mx-2  px-1 rounded-xl border hover:bg-[#6359E9]`}>
                                            마커 위치
                                        </button>)
                                        }

                                        {directInput
                                            ? (<button
                                                onClick={handleDirectInput}
                                                className={`flex px-1 rounded-xl border hover:bg-[#6359E9]`}>
                                                직접 입력
                                            </button>)
                                            : (<button
                                                onClick={handleDirectInput}
                                                className={`flex px-1 rounded-xl border hover:bg-[#6359E9]`}>
                                                직접 입력
                                            </button>)
                                        }
                                    </div>

                                    <div className={`flex justify-end mt-2`}>
                                        <button className={`flex px-2 rounded-xl border hover:bg-[#6359E9]`}>
                                        추가
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <form id={`waypointdelete`} className={`mt-3`}
                                  onSubmit={handleDeletePoint}>
                                <div className={`font-bold`}>
                                    지점 삭제 하기
                                </div>
                                <div className={`flex flex-row justify-end px-2 m-2`}>
                                    <div>
                                        <select
                                            className={`flex m-1 w-[170px] h-[23px] text-black px-2`}
                                            name={'LocalName'}>
                                            {pointsList.map((item, index) => (
                                                <option
                                                    value={item} key={index}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={`flex items-end ml-3`}>
                                        <button
                                            className={`flex px-2 mb-0.5 rounded-xl border hover:bg-[#6359E9]`}>
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                    : null}

            </div>
        </div>
    );
};

const TransitInput = (props) => {
    const transitElements = [];

    for (let i=0; i < props.transitCount; i++) {
        transitElements.push(
            <div className={`flex flex-row items-center`} key={i}>
                <span>경유지 ({i+1}) : </span>
                <select
                    className={`flex m-1 w-[170px] h-[23px] text-black px-2`}
                    name={`TransitPoint${i+1}`}>
                    {props.pointsList.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                    ))}
                </select>
            </div>
        )
    }

    return (
        <div>
            {transitElements}
        </div>
    )
}
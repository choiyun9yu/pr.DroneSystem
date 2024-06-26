import React, { useEffect, useState } from 'react';
import { ColorThema } from '../../ProjectThema';

export const LogForm = (props) => {
    const [drones, setDrones] = useState([]);
    const [flights, setFlights] = useState(['기간을 선택해 주세요.']);
    const [droneIdData, setDroneIdData] = useState({
        DroneId: '1'
    });
    const [periodFromData, setPeriodFromData] = useState({});
    const [periodToData, setPeriodToData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://' + process.env.REACT_APP_GCS_API_SERVER + '/api/getid', {
                    method: 'GET',
                });
                if (response.ok) {
                    // console.log('요청 성공');
                    const data = await response.json();
                    // console.log(data);
                    setDrones(data['drones']);
                } else {
                    console.error('요청 실패');
                }
            } catch (error) {
                console.error('요청 중 오류 발생', error);
            }
        };

        const fetchPost = async () => {
            // POST 요청
            try {
                const Body = new FormData();
                Body.append('DroneId', droneIdData["DroneId"]);
                Body.append('periodFrom', periodFromData["periodFrom"]);
                Body.append('periodTo', periodToData["periodTo"]);

                const response = await fetch('http://' + process.env.REACT_APP_GCS_API_SERVER + '/api/getid', {
                    method: 'POST',
                    body: Body,
                });

                if (response.ok) {
                    const data = await response.json();
                    // console.log('요청 성공');
                    setFlights(data['flights'])
                } else {
                    console.error('요청 실패');
                }
            } catch (error) {
                console.error('요청 중 오류 발생', error);
            }
        }
        fetchData();

        // fetchPost();
    }, []);

    const handleDroneIdChange = async (e) => {
        // 이벤트에서 name, value 추출
        const {name, value} = e.target;

        // Form 데이터 업데이트 (비동기로 처리)
        await setDroneIdData({
            [name]: value,
        });

        // POST 요청
        try {
            const Body = new FormData();
            Body.append([name], value);
            Body.append('periodFrom', periodFromData["periodFrom"]);
            Body.append('periodTo', periodToData["periodTo"]);

            const response = await fetch('http://' + process.env.REACT_APP_GCS_API_SERVER + '/api/getid', {
                method: 'POST',
                body: Body,
            });

            if (response.ok) {
                const data = await response.json();
                // console.log('요청 성공');
                setFlights(data['flights'])
            } else {
                console.error('요청 실패');
                setFlights(['기간을 선택해 주세요.'])
            }
        } catch (error) {
            console.error('요청 중 오류 발생', error);
        }
    }

    const handleperiodFromChange = async (e) => {
        const {name, value} = e.target;
        console.log(`event${name}:${value}`)
        await setPeriodFromData({
            [name]: value,
        });

        // POST 요청
        try {
            const Body = new FormData();
            Body.append([name], value);
            Body.append('DroneId', droneIdData["DroneId"]);
            Body.append('periodTo', periodToData["periodTo"]);

            const response = await fetch('http://' + process.env.REACT_APP_GCS_API_SERVER + '/api/getid', {
                method: 'POST',
                body: Body,
            });

            if (response.ok) {
                const data = await response.json();
                // console.log('요청 성공');
                setFlights(data['flights'])
            } else {
                console.error('요청 실패');
                setFlights(['비행 기록이 없습니다.'])
            }
        } catch (error) {
            console.error('요청 중 오류 발생', error);
        }
    }

    const handleperiodToChange = async (e) => {
        const {name, value} = e.target;
        console.log(`event ${name}:${value}`)
        await setPeriodToData({
            [name]: value,
        });

        // POST 요청
        try {
            const Body = new FormData();
            Body.append([name], value);
            Body.append('DroneId', droneIdData["DroneId"]);
            Body.append('periodFrom', periodFromData["periodFrom"]);

            const response = await fetch('http://' + process.env.REACT_APP_GCS_API_SERVER + '/api/getid', {
                method: 'POST',
                body: Body,
            });

            if (response.ok) {
                const data = await response.json();
                // console.log('요청 성공');
                setFlights(data['flights'])
            } else {
                console.error('요청 실패');
                setFlights(['비행 기록이 없습니다.'])
            }
        } catch (error) {
            console.error('요청 중 오류 발생', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const response = await fetch('http://' + process.env.REACT_APP_GCS_API_SERVER + '/api/logdata', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                // console.log('요청 성공');
                const data = await response.json();
                // console.log(data);
                props.dataTransfer(data['logPage']);
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
    };



    return (
        <div className={`flex flex-col w-full p-5 rounded-lg ${ColorThema.Secondary2}`}>
            <span className="rounded-md mb-5 font-bold text-medium text-white">• 부품 및 조회기간 선택</span>
            <form
                method="POST"
                action="http://localhost:5000/api/logdata"
                onSubmit={handleSubmit}
                className={`flex flex-row text-[#AEABD8]`}
            >
                <div className="flex flex-col mr-5">
                    <span className="mb-5">✓ 드론 선택</span>
                    <select className="h-[30px] w-[175px] px-2  rounded  text-gray-500" name={'DroneId'}
                            onChange={handleDroneIdChange}>
                        {drones.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col mr-5">
                    <span className="mb-5">✓ 기간 선택</span>
                    <div className="flex flex-row items-center">
                        <input
                            className="h-[30px] w-[175px] px-2 rounded text-gray-500"
                            placeholder="yyyy-mm-dd"
                            name={'periodFrom'}
                            type={'date'}
                            onChange={handleperiodFromChange}
                        ></input>
                        <span className="mr-3 ml-3"> ㅡ </span>
                        <input
                            className="h-[30px] w-[175px] px-2 rounded text-gray-500"
                            placeholder="yyyy-mm-dd"
                            name={'periodTo'}
                            type={'date'}
                            onChange={handleperiodToChange}
                        ></input>
                    </div>
                </div>
                <div className="flex flex-col mr-5">
                    <span className="mb-5">✓ 비행 로그 선택</span>
                    <select className="h-[30px] w-[175px] px-2 rounded text-gray-500 " name={'FlightId'}>
                        {flights.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col justify-end">
                    <button
                        type="submit"
                        className={`flex items-center h-[30px] py-1 px-3  rounded border hover:${ColorThema.Primary1} border-[#6359E9] text-white ${ColorThema.Secondary5}`}
                    >
                        조회
                    </button>
                </div>
            </form>
        </div>
    );
};

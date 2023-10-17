import React, {useState} from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { ColorThema } from '../ProejctThema';
import './GCSstyles.css';
import {FlightContents} from "./FlightMode";
import {OtherContents} from "./MissionMode";

const center = {
    lat: 36.37425121863451,
        lng: 127.38407125979359
}
export const MiddleMap = (props) => {
    const [isController, setIsController] = useState(true)

    const handleIsController= () => {
        setIsController(!isController)
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        })

    if (!isLoaded) {
        return null; // Google Maps JavaScript API가 로드되지 않았을 때 아무것도 렌더링하지 않음
    }

    return (
        props.swapMap
            ? <div id='google-map' className={`w-full h-full rounded-2xl ${ColorThema.Secondary4}`}>
              </div>
            : <div id='google-map' className={`w-full h-full rounded-2xl ${ColorThema.Secondary4}`}>
                <GoogleMap mapContainerClassName={`flex w-full h-full rounded-xl`}
                           center={center} zoom={15}>
                    {props.gcsMode === 'flight' ? <FlightContents isLeftPanel={props.isLeftPanel}
                                                                  handleIsLeftPanel={props.handleIsLeftPanel}
                                                                  isRightPanel={props.isRightPanel}
                                                                  handleIsRightPanel={props.handleIsRightPanel}
                                                                  isController={isController}
                                                                  handleIsController={handleIsController}
                                                                  handleSwapMap={props.handleSwapMap}
                                                                  middleTable={props.middleTable}
                    /> : null}
                    {props.gcsMode === 'mission' ? <OtherContents middleTable={props.middleTable}/> : null}
                    {props.gcsMode === 'video' ? <OtherContents middleTable={props.middleTable}/> : null}
                </GoogleMap>
              </div>
    );
};

export const MiniMap = (props) => {
    return (
        <>
            <GoogleMap mapContainerClassName={`flex w-full h-full`} center={center} zoom={15}>
                <button onClick={props.handleSwapMap} className={`absolute bottom-[10px] left-[10px] flex justify-center items-center w-[40px] h-[40px] bg-white hover:bg-gray-200`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </GoogleMap>
        </>
    );
}

export const Table = (props) => {
    const middleTable = {...props.middleTable};

    return(
        <div className={`absolute top-[50px] right-[60px] rounded-xl bg-black opacity-70`}>
            <table className={`mx-3 my-2 text-lg text-[#00DCF8]`}>
                <tbody>
                    <tr>
                        <th className={`px-2`}>전체 이동거리</th>
                        <td className={`px-2`}> {middleTable.TotalDistance} km</td>
                    </tr>
                    <tr>
                        <th className={`px-2`}>현재 비행거리</th>
                        <td className={`px-2`}> {middleTable.ElapsedDistance} km</td>
                    </tr>
                    <tr>
                        <th className={`px-2`}>잔여 이동거리</th>
                        <td className={`px-2`}> {middleTable.RemainDistance} km</td>
                    </tr>
                    <tr>
                        <th className={`px-2`}>현재 이동속도</th>
                        <td className={`px-2`}> {middleTable.DroneSpeed} m/s</td>
                    </tr>
                    <tr>
                        <th className={`px-2`}>평균 이동속도</th>
                        <td className={`px-2`}> {middleTable.DroneAvgSpeed} m/s</td>
                    </tr>
                    <tr>
                        <th className={`px-2`}>이륙 시작시간</th>
                        <td className={`px-2`}> {middleTable.StartTime} </td>
                    </tr>
                    <tr>
                        <th className={`px-2`}>비행 소요시간</th>
                        <td className={`px-2`}> {middleTable.TakenTime}</td>
                    </tr>
                    <tr>
                        <th className={`px-2`}>비행 완료시간</th>
                        <td className={`px-2`}> {middleTable.CompleteTime}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
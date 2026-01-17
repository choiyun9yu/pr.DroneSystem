import React, { useContext, useState, useEffect, useReducer } from 'react'
import { GoogleMap, useJsApiLoader, OverlayView, Polyline, Marker } from '@react-google-maps/api'

import { DroneContext } from './SignalRContainer';

import { FlightContents } from '../GCS/FlightMode/FlightContents';
import { MissionContents } from '../GCS/MissionMode/MissionContents';
import { VideoContents } from '../GCS/VideoMode/VideoContents';
import { NewLinkModal } from './LeftSidebar';

export const MiddleMap = (props) => {
    const { droneMessage, handleDroneStartMarking, handleDroneTargetMarking } = useContext(DroneContext)
    const startPoint = droneMessage && droneMessage.DroneMission.StartPoint
    const targetPoint = droneMessage && droneMessage.DroneMission.TargetPoint
    const [stationPoint, setStationPoint] = useState()
    const [returnPoint, setReturnPoint] = useState()
    const dronePath = droneMessage ? droneMessage.DroneMission.DroneTrails.q : []
    const [isMarker, setIsMarker] = useState(false)
    const [isRtl, setIsRtl] = useState(false)
    const [markerId, setMarkerId] = useState(1)
    const [pathLine, setPathLine] = useState([])

    const [downloadPathLine, setDownloadPathLine] = useState(null)

    const [isFlightInfoTable, toggleFlightInfoTable] = useReducer(
        isFlightInfoTable => !isFlightInfoTable, true
    )
    const [isIndicator, toggleIndicator] = useReducer(
        isIndicator => !isIndicator, true
    )
    const [isController, toggleController] = useReducer(
        isController => !isController, true
    )

    const redMarkerIcon = {
        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    }

    const yellowMarkerIcon = {
        url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    }

    const purpleMarkerIcon = {
        url: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
    }

    const blueMarkerIcon = {
        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    }

    const handleIsMarker = () => {
        setIsMarker(!isMarker)
    }

    const toggleIsRtl = () => {
        setIsRtl(!isRtl)
    }

    const handleReturnPoint = () => {
        setReturnPoint({
            lat: droneMessage && droneMessage.DroneStt.Lat,
            lng: droneMessage && droneMessage.DroneStt.Lon
        })
    }

    const handleMarkerReset = () => {
        setMarkerId(1)
        props.setTargetPoints([])
        props.setFlightSchedule([])
        setPathLine([])
        setIsMarker(false)
        setIsRtl(false)
        setStationPoint({
            lat: 0.0,
            lng: 0.0
        })
        handleDroneStartMarking(0,0)
        handleDroneTargetMarking(0,0)
    }

    const handleMapClick = e => {
        if (isMarker) {
            handleDroneStartMarking(droneMessage.DroneStt.Lat, droneMessage.DroneStt.Lon)
            handleDroneTargetMarking(e.latLng.lat(), e.latLng.lng()
            )
            setIsMarker(!isMarker)
        }

        if (props.stationMarker) {
            props.setStationLat(e.latLng.lat())
            props.setStationLon(e.latLng.lng())
            setStationPoint({
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            })
            props.toggleStationMarker()
        }

    }

    // const handleMapClick = e => {
    //     if (isMarker) {
    //         props.setTargetPoints([...props.targetPoints, { id:markerId, position:{ lat: e.latLng.lat(),lng: e.latLng.lng() } }])
    //         setMarkerId(markerId+1)
    //         setPathLine([startPoint, ...props.targetPoints.map(marker => marker.position)])
    //         handleDroneStartMarking(droneMessage.DroneStt.Lat, droneMessage.DroneStt.Lon)
    //     }
    //
    //     if (props.stationMarker) {
    //         props.setStationLat(e.latLng.lat())
    //         props.setStationLon(e.latLng.lng())
    //         setStationPoint({
    //             lat: e.latLng.lat(),
    //             lng: e.latLng.lng()
    //         })
    //         props.toggleStationMarker()
    //     }
    //
    // }

    useEffect(() => {
        setPathLine([startPoint, ...props.targetPoints.map(marker => marker.position)])
    }, [props.targetPoints, startPoint])

    const handleStartPointCenter = () => {
        props.setCenter({
            lat: droneMessage && droneMessage.DroneMission.StartPoint.lat,
            lng: droneMessage && droneMessage.DroneMission.StartPoint.lng
        })
    }

    const handleTargetPointCenter = () => {
        props.setCenter({
            lat: droneMessage && droneMessage.DroneMission.TargetPoint.lat,
            lng: droneMessage && droneMessage.DroneMission.TargetPoint.lng
        })
    }

    const handleCurrentCenter= () => {
        props.setCenter({
            lat: droneMessage && droneMessage.DroneStt.Lat,
            lng: droneMessage && droneMessage.DroneStt.Lon
        })
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    if (!isLoaded) return null


    return (
        <>
            {props.addNewLinkModal && <NewLinkModal toggleAddNewLinkModal={props.toggleAddNewLinkModal}/>}
            {props.swapMap
                ? <div id='video-swap' className={'w-full h-full rounded-2xl bg-[#1D1D41]'}></div>
                : <div id='google-map' className={'w-fll h-full rounded-2xl bg-[#1D1D41]'}>
                    <GoogleMap
                        mapContainerClassName={'flex w-full h-full rounded-xl'}
                        center={props.center}
                        zoom={17}
                        onClick={handleMapClick}
                    >
                        <OverlayView
                            position={{ lat: droneMessage && droneMessage.DroneStt.Lat, lng: droneMessage && droneMessage.DroneStt.Lon }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            getPixelPositionOffset={(width, height) => ({
                                x: -(width / 2),
                                y: -(height / 2),
                            })}
                        >
                            <div
                                style={{
                                    width: '42px',
                                    height: '68px',
                                    backgroundImage: `url(${process.env.PUBLIC_URL}/Drone.png)`,
                                    backgroundSize: 'contain',
                                    transform: `translate(-50%, -50%) rotate(${droneMessage && droneMessage.DroneStt.Head}deg)`,
                                }}
                            />
                        </OverlayView>

                        {props.targetPoints.map( marker =>
                            <Marker
                                key={marker.id}
                                position={marker.position}
                                icon={redMarkerIcon}
                            />)}


                        {/* Go To Mission Line */}
                        {(downloadPathLine === null)
                            ? <Polyline path={pathLine} options={{ strokeColor: '#AA66FF', strokeWeight: 0.8 }}/>
                            : <Polyline path={downloadPathLine} options={{ strokeColor: '#FF3333', strokeWeight: 1 }}/>
                        }

                        {/* Go To Marker Line */}
                        <Polyline path={[startPoint, targetPoint]} options={{ strokeColor: '#AA66FF', strokeWeight: 1 }}/>

                        {/* drone past path */}
                        <Polyline path={dronePath} options={{ strokeColor: '#BCBEC0', strokeWeight: 2 }} />

                        <Marker position={stationPoint} icon={purpleMarkerIcon}/>
                        {/*{isRtl && <Marker position={returnPoint} icon={yellowMarkerIcon}/>}*/}
                        <Marker position={targetPoint} icon={redMarkerIcon} />
                        <Marker position={startPoint} icon={blueMarkerIcon}/>

                        {props.gcsMode === 'flight' &&
                            <FlightContents
                                leftPanel={props.lefPanel}
                                toggleLeftPanel={props.toggleLeftPanel}
                                rightPanel={props.rightPanel}
                                toggleRightPanel={props.toggleRightPanel}
                                toggleSwapMap={props.toggleSwapMap}
                                isFlightInfoTable={isFlightInfoTable}
                                toggleFlightInfoTable={toggleFlightInfoTable}
                                isIndicator={isIndicator}
                                toggleIndicator={toggleIndicator}
                                isController={isController}
                                toggleController={toggleController}
                                isMarker={isMarker}
                                handleIsMarker={handleIsMarker}
                                handleMarkerReset={handleMarkerReset}
                                targetPoints={props.targetPoints}
                                isRtl={isRtl}
                                toggleIsRtl={toggleIsRtl}
                                handleReturnPoint={handleReturnPoint}
                                setReturnPoint={setReturnPoint}
                                targetPoint={targetPoint}
                            />}

                        {props.gcsMode === 'mission' &&
                            <MissionContents
                                isFlightInfoTable={isFlightInfoTable}
                                toggleMissionBtn={props.toggleMissionBtn}
                                toggleStationBtn={props.toggleStationBtn}
                                handleCurrentCenter={handleCurrentCenter}
                                handleStartPointCenter={handleStartPointCenter}
                                handleTargetPointCenter={handleTargetPointCenter}
                            />}
                        {props.gcsMode === 'video' &&
                            <VideoContents
                                isFlightInfoTable={isFlightInfoTable}
                            />}

                    </GoogleMap>
                </div>
            }
        </>

    );
};

export const MiniMap = (props) => {
    const { droneMessage } = useContext(DroneContext)

    return (
        <>
            <GoogleMap
                mapContainerClassName={'flex w-full h-full'}
                center={props.center}
                zoom={15}
            >

                <OverlayView
                    position={{ lat: droneMessage && droneMessage.DroneStt.Lat, lng: droneMessage && droneMessage.DroneStt.Lon }}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    getPixelPositionOffset={(width, height) => ({
                        x: -(width / 2),
                        y: -(height / 2),
                    })}
                >
                    <div
                        style={{
                            width: '42px',
                            height: '68px',
                            backgroundImage: `url(${process.env.PUBLIC_URL}/Drone.png)`,
                            backgroundSize: 'contain',
                            transform: `translate(-50%, -50%) rotate(${droneMessage && droneMessage.DroneStt.Head}deg)`,
                        }}
                    />
                </OverlayView>

                <button
                    className={'absolute bottom-[25px] left-[10px] flex justify-center items-center w-[40px] h-[40px] bg-white hover:bg-gray-200'}
                    onClick={props.toggleSwapMap}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="w-6 h-6">
                        <path fillRule="evenodd"
                              d="M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </GoogleMap>
        </>
    )
}

export const FlightInfoTable = () => {
    const { droneMessage } = useContext(DroneContext)

    let averageSpeed

    let totalDistance
    let remainDistance
    let elapsedDistance

    let startTime
    let completeTime

    let takeTime
    let currentTime

    let formattedStartTime
    let formattedTakeTime
    let formattedCompleteTime

    if (droneMessage !== null) {
        totalDistance = droneMessage && droneMessage.DroneMission.TotalDistance
        elapsedDistance = droneMessage && droneMessage.DroneMission.CurrentDistance
        remainDistance = totalDistance - elapsedDistance

        startTime = droneMessage && droneMessage.DroneMission.StartTime && new Date(droneMessage && droneMessage.DroneMission.StartTime).getTime()
        completeTime = droneMessage && droneMessage.DroneMission.CompleteTime && new Date(droneMessage && droneMessage.DroneMission.CompleteTime).getTime()

        if ((startTime !== null && completeTime === null) || completeTime < startTime) {
            currentTime = Date.now() // 현재 시간을 밀리초로 얻음
            takeTime = currentTime - startTime
            formattedTakeTime = formatTime(takeTime)
        } else {
            takeTime = completeTime - startTime
            formattedTakeTime = formatTime(takeTime)
        }

        averageSpeed = (takeTime > 0) && (elapsedDistance > 0) ? elapsedDistance / (takeTime / 1000) : 0

        formattedStartTime = startTime
            ? new Date(startTime).toLocaleTimeString('en-US', { hour12: false })
            : '00:00:00'
        formattedCompleteTime = completeTime
            ? new Date(completeTime).toLocaleTimeString('en-US', { hour12: false })
            : '00:00:00'

        function formatTime(timeInMilliseconds) {
            const date = new Date(timeInMilliseconds)
            const hours = date.getUTCHours().toString().padStart(2, '0')
            const minutes = date.getUTCMinutes().toString().padStart(2, '0')
            const seconds = date.getUTCSeconds().toString().padStart(2, '0')

            return `${hours}:${minutes}:${seconds}`
        }

        return (
            <div className={'absolute top-[10px] right-[60px] rounded-xl bg-black opacity-70'}>
                <table className={'m-2 text-lg font-normal text-[#00DCF8]'}>
                    <tbody>
                    {/*<tr>*/}
                    {/*    <th className={'px-2'}>전체 이동거리</th>*/}
                    {/*    <td className={'px-2'}> {droneMessage && (totalDistance / 1000).toFixed(3)} km</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <th className={'px-2'}>잔여 이동거리</th>*/}
                    {/*    <td className={'px-2'}> {*/}
                    {/*        (droneMessage && (remainDistance / 1000) < 0*/}
                    {/*            ? '0.000'*/}
                    {/*            : droneMessage && (remainDistance / 1000).toFixed(3))*/}
                    {/*    } km</td>*/}
                    {/*</tr>*/}
                    <tr>
                        <th className={'px-2'}>이동 속력</th>
                        <td className={'px-2'}>{
                            (droneMessage && (droneMessage.DroneStt.Speed).toFixed(3) <= 0.025 ? '0.000' : droneMessage && (droneMessage.DroneStt.Speed).toFixed(3))
                        } m/s
                        </td>
                    </tr>
                    <tr>
                        <th className={'px-2'}>드론 고도</th>
                        <td className={'px-2'}>{
                            (droneMessage && (droneMessage.DroneStt.Alt).toFixed(3))
                        } m
                        </td>
                    </tr>
                    {/*<tr>*/}
                    {/*    <th className={'px-2'}>비행 거리</th>*/}
                    {/*    <td className={'px-2'}> {droneMessage && (elapsedDistance / 1000).toFixed(3)} km</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <th className={'px-2'}>평균 이동속도</th>*/}
                    {/*    <td className={'px-2'}>{((averageSpeed > 0) ? averageSpeed : 0).toFixed(3)} m/s</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <th className={'px-2'}>이륙 시간</th>*/}
                    {/*    <td className={'px-2'}>{formattedStartTime}</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <th className={'px-2'}>비행 시간</th>*/}
                    {/*    <td className={'px-2'}>{formattedTakeTime}</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <th className={'px-2'}>착륙 시간</th>*/}
                    {/*    <td className={'px-2'}>{formattedCompleteTime}</td>*/}
                    {/*</tr>*/}
                    </tbody>
                </table>
            </div>
        )
    }
}
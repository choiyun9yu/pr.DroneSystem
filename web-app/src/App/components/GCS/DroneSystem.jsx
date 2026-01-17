import { useContext, useReducer, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

import { VideoMode } from '../GCS/VideoMode/VideoMode'
import { MissionMode } from '../GCS/MissionMode/MissionMode'
import { FlightMode } from '../GCS/FlightMode/FlightMode'
import { LeftSidebar } from './LeftSidebar'
import { MiddleMap } from './MiddleMap'
import { DroneContext } from './SignalRContainer'

export const DroneSystem = () => {
    const { droneMessage } = useContext(DroneContext)

    const [gcsMode] = useOutletContext()

    const [lefPanel, toggleLeftPanel] = useReducer(
        leftPanel => !leftPanel, true
    )
    const [rightPanel, toggleRightPanel] = useReducer(
        rightPanel => !rightPanel, true
    )
    const [swapMap, toggleSwapMap] = useReducer(
        swapMap => !swapMap, false
    )
    const [addNewLinkModal, toggleAddNewLinkModal] = useReducer(
        addNewLinkModal => !addNewLinkModal, false
    )
    const [isMissionBtn, toggleMissionBtn] = useReducer(
        isMissionBtn => !isMissionBtn, false
    )
    const [stationMarker, toggleStationMarker] = useReducer(
        stationMarker => !stationMarker, false
    )
    const [isStationBtn, toggleStationBtn] = useReducer(
        isStationBtn => !isStationBtn, false
    )

    const [center, setCenter] = useState({
        lat: 35.40992942351967,
        lng: 126.4198020766582
    })

    const [targetPoints, setTargetPoints] = useState([]) // {id:1, position:{lat:0, lng:0}}
    const [flightSchedule, setFlightSchedule] = useState([])

    const [stationLat, setStationLat] = useState()
    const [stationLon, setStationLon] = useState()

    const handleCurrentPoint = () => {
        setStationLat(droneMessage.DroneStt.Lat)
        setStationLon(droneMessage.DroneStt.Lon)
    }

    return(
        <div className={'flex w-full h-full p-3 overflow-hidden'}>
            { lefPanel &&
                <div id={'left-sidebar'} className={'w-[180px]'}>
                    <LeftSidebar
                      toggleAddNewLinkModal={toggleAddNewLinkModal}
                      setCenter={setCenter}
                      flightSchedule={flightSchedule}
                    />
                </div>
            }

            <div id={'middle-map'} className={'flex-grow m-3'}>
                <MiddleMap
                    gcsMode={gcsMode}
                    addNewLinkModal={addNewLinkModal}
                    toggleAddNewLinkModal={toggleAddNewLinkModal}
                    center={center}
                    setCenter={setCenter}
                    swapMap={swapMap}
                    toggleSwapMap={toggleSwapMap}
                    lefPanel={lefPanel}
                    toggleLeftPanel={toggleLeftPanel}
                    rightPanel={rightPanel}
                    toggleRightPanel={toggleRightPanel}
                    stationMarker={stationMarker}
                    toggleStationMarker={toggleStationMarker}
                    setStationLat={setStationLat}
                    setStationLon={setStationLon}
                    targetPoints={targetPoints}
                    setTargetPoints={setTargetPoints}
                    setFlightSchedule={setFlightSchedule}
                    toggleMissionBtn={toggleMissionBtn}
                    toggleStationBtn={toggleStationBtn}
                />
            </div>

            { rightPanel &&
                <div id={'right-sidebar'} className={''}>
                    {gcsMode === 'flight' && <FlightMode
                        center={center}
                        swapMap={swapMap}
                        toggleSwapMap={toggleSwapMap}
                    />}
                    {gcsMode === 'mission' && <MissionMode
                        isMissionBtn={isMissionBtn}
                        isStationBtn={isStationBtn}
                        stationLat={stationLat}
                        stationLon={stationLon}
                        stationMarker={stationMarker}
                        toggleStationMarker={toggleStationMarker}
                        setTargetPoints={setTargetPoints}
                        setFlightSchedule={setFlightSchedule}
                        handleCurrentPoint={handleCurrentPoint}
                    />}
                    {gcsMode === 'video' && <VideoMode/>}
                </div>
            }

        </div>
    )
}
import React, { useCallback, useContext } from 'react'
import { useOutletContext } from 'react-router-dom'
import { DroneContext } from './SignalRContainer'
import { LeftSideBtn } from '../GCS/components/GcsBtn'

export const LeftSidebar = (props) => {
    const [gcsMode, setGcsMode] = useOutletContext()

    const handleFlightMode = useCallback(() => {
        setGcsMode('flight')
    })
    const handleMissionMode = useCallback(() => {
        setGcsMode('mission')
    })
    const handleVideoMode = useCallback(() => {
        setGcsMode('video')
    })

    return (
        <div className={'flex flex-col items-start w-full h-full rounded-2xl font-bold text-medium text-gray-200 bg-[#1D1D41]'}>
            <LeftSideBtn
                gcsMode={gcsMode}
                handleFlightMode={handleFlightMode}
                handleMissionMode={handleMissionMode}
                handleVideoMode={handleVideoMode}
            />

            {/*<AddNewLink toggleAddNewLinkModal={props.toggleAddNewLinkModal}/>*/}

            <EnrolledDrone setCenter={props.setCenter}/>

            <FlightSchedule flightSchedule={props.flightSchedule}/>
        </div>
    )
}

const AddNewLink = (props) => {
    return (
        <div className={'m-2 items-center'}>
            <button
                className={'flex w-full items-center ml-2 px-2 py-1 rounded-md bg-[#27264E] hover:bg-[#6359E9]'}
                onClick={props.toggleAddNewLinkModal}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="mr-1 w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>
                </svg>
                Add New Link
            </button>
        </div>
    )
}

export const NewLinkModal = (props) => {

    const addLinkModalSelectList = [
        'Communication Link',
        'TCP',
        'UDP',
        'SERIAL'
    ]

    const handleNewConnectionBtn = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

    }

    return (
        <div className={'modal absolute top-[30%] left-[37%] w-[450px] h-[250px] z-50 rounded-2xl text-black bg-[#6359E9]'}>
            <div className={'flex flex-row pl-4 py-2 items-start justify-start text-2xl font-bold'}>
                <div className={'flex items-start justify-start'}>New Link Connection</div>

                <button className={'close flex ml-auto mr-3'} onClick={props.toggleAddNewLinkModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="#4B4B99" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                    </svg>
                </button>

            </div>
            <div className={'flex px-4 items-center '}>
                <div className={'modal-content'}>
                    <form className={'flex-col'}>
                        <div className={'my-3'}>
                            <select
                                className={'ml-2 px-1 w-[400px] h-[35px] rounded border border-gray-700'}
                                name={'connectionType'}
                                // onChange={handleConnectionType}
                            >
                                {addLinkModalSelectList.map((item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>

                        <div className={''}>
                            <span> Address </span>
                            <input
                                className={'ml-2 p-2 w-[400px] h-[35px] rounded border border-gray-700'}
                                type={'text'}
                                name={'connectionAddress'}
                            />
                        </div>

                        <div className={'flex mr-2 mt-5'}>
                            <button
                                type={'submit'} onClick={handleNewConnectionBtn}
                                className={'ml-auto py-1 px-4 rounded-md text-lg text-white bg-[#1D1D41]'}
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const EnrolledDrone = (props) => {
    const { droneMessage, droneList, selectedDrone, setSelectedDrone, handleSelectedDrone } = useContext(DroneContext)

    const handleSelectDrone = (droneId) => {
        setSelectedDrone(droneId)
        handleSelectedDrone(droneId)
        props.setCenter({
            lat: droneMessage && droneMessage.DroneStt.Lat,
            lng: droneMessage && droneMessage.DroneStt.Lon
        })
    }

    return (
        <div className="w-full m-2 items-center">
            <span className="ml-3">• 등록 드론 </span>
            { droneList
                ? droneList.map((droneId) => {
                    return (
                        selectedDrone == droneId
                            ?
                            <button
                                className={'flex flex-col justify-center ml-3 my-1 px-3 w-[80%] h-[35px] rounded bg-[#6359E9]'}
                                onClick={() => handleSelectDrone(droneId)} key={droneId}
                            >

                                <div className={'flex items-center w-full'}>
                                    <span className={'text-xs, font-normal'}>ArduCopter {droneId}</span>
                                </div>

                            </button>
                            :
                            <button
                                className={'flex flex-col justify-center ml-3 my-1 px-3 w-[80%] h-[35px] rounded bg-[#27264E]'}
                                key={droneId} onClick={() => handleSelectDrone(droneId)}
                            >

                                <div className={'flex items-center w-full'}>
                                    <span className={'text-xs, font-normal'}>ArduCopter {droneId}</span>
                                </div>


                            </button>
                    )
                })
                : null
            }
        </div>
    )
}

const FlightSchedule = (props) => {
    return (
        <div className="w-full m-2 items-center">
            {/*<span className="ml-3">• 비행 경로 </span>*/}
            <div className={'flex flex-col m-1 text-sm font-normal'}>
                <ScheduleComponent
                    startPoint={props.flightSchedule[0]}
                    transitList={props.flightSchedule[1]}
                    targetPoint={props.flightSchedule[2]}
                />
            </div>
        </div>
    )
}

const ScheduleComponent = (props) => {
    const { droneMessage } = useContext(DroneContext)
    const JSXElements = []

    if (props.transitList === undefined) return

    const transitPath = [props.startPoint, ...props.transitList, props.targetPoint]

    for (let i=0; i<transitPath.length; i++) {

        if (i===0) continue

        JSXElements.push(
            <React.Fragment key={i}>
                {(droneMessage?droneMessage.DroneMission.PathIndex:0)===i
                    ?
                    <div className={'flex flex-col justify-center m-2  pl-3 py-1 border border-[#6359E9] rounded-md w-[85%] bg-[#6359E9]'} key={i}>
                        <div>
                            <span> {transitPath[i - 1]} </span>
                        </div>

                        <div className={'flex flex-row'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-4 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
                            </svg>

                            <span className={'ml-1'}> {transitPath[i]} </span>
                        </div>

                    </div>
                    :
                    <div>
                        <div className={'flex flex-col justify-center m-2  pl-3 py-1 border border-gray-400 rounded-md w-[85%]'} key={i}>
                            <div>
                                <span> {transitPath[i - 1]} </span>
                            </div>

                            <div className={'flex flex-row'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                     stroke="currentColor" className="w-4 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
                                </svg>

                                <span className={'ml-1'}> {transitPath[i]} </span>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }

    return <div>{JSXElements}</div>

}
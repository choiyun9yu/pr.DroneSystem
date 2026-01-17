import { useContext, useReducer, useState } from 'react'
import styled from 'styled-components'

import { DroneJoyStick } from '../components/DroneJoyStick'
import { ControlJoyStick } from '../components/ControlJoyStick'
import { AttitudeIndicator } from '../components/AttitudeIndicator'
import {FlightInfoTable} from "../MiddleMap";
import {DroneContext} from "../SignalRContainer";

const ControlButton = styled.button`
    background-image: linear-gradient(180deg,
    rgba(96.71694979071617, 93.3640743046999, 141.64585292339325, 1) 0%,
    rgba(46.116092428565025, 43.2159436494112, 117.27387472987175, 1) 35%);
    color: #AEABD8;

    &:hover {
        background: #6359e9;
        color: white;
    }
`

export const FlightContents = (props) => {
  return (
    <div id='map-flight' className={'flex justify-center w-full h-full'}>
      <FlightBtn
        leftPanel={props.leftPanel}
        toggleLeftPanel={props.toggleLeftPanel}
        wayPointMarker={props.wayPointMarker}
        toggleWayPointMarker={props.toggleWayPointMarker}
        rightPanel={props.rightPanel}
        toggleRightPanel={props.toggleRightPanel}
        toggleSwapMap={props.toggleSwapMap}
        toggleFlightInfoTable={props.toggleFlightInfoTable}
        toggleIndicator={props.toggleIndicator}
        isMarker={props.isMarker}
        handleIsMarker={props.handleIsMarker}
        handleMarkerReset={props.handleMarkerReset}
      />

      {props.isFlightInfoTable && <FlightInfoTable />}
      {props.isIndicator && <AttitudeIndicator/>}

      {props.isController
        ? <MainController
          toggleController={props.toggleController}
          targetPoints={props.targetPoints}
          isRtl={props.isRtl}
          toggleIsRtl={props.toggleIsRtl}
          handleReturnPoint={props.handleReturnPoint}
          setReturnPoint={props.setReturnPoint}
          targetPoint={props.targetPoint}
        />
        : <button onClick={props.toggleController}
          className={'absolute bottom-0 w-10 h-7 rounded-t-md bg-[#1D1D41] hover:bg-gray-300'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"
            style={{ transform: 'rotate(270deg)' }} className={'w-6 h-5 mx-auto mt-0.5 hover:text-[#1D1D41]'}>
            <path fillRule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clipRule="evenodd"/>
          </svg>
        </button>
      }
    </div>
  )
}

const FlightBtn = (props) => {
  const { droneMessage, handleDroneFlightMode, handleMissionAlt } = useContext(DroneContext)

  const [logBtn, toggleLogBtn] = useReducer(
    logBtn => !logBtn, false
  )
  const [altBtn, toggleAltBtn] = useReducer(
    altBtn => !altBtn, false
  )
  const [xTen, toggleXTen] = useReducer(
    xTen => !xTen, false
  )

  const printDroneLogs = (logdata) => {
    return logdata.map((entry, index) => (
      <div className={'flex flex-row justify-start items-start text-black font-normal'} key={index}>
        <p className={'min-w-[150px] mr-3'} style={{ textAlign: 'left' }}>
          {new Date(entry.logtime).toLocaleString()}
        </p>
        <p className={'min-w-[320px]'} style={{ textAlign: 'left' }}>
          {entry.message.replace(/[^a-zA-Z0-9\s]/g, '')}
        </p>
      </div>
    ))
  }

  const handleMissionAltUpBtn = () => {
    if (droneMessage !== null) handleMissionAlt(droneMessage.DroneMission.MissionAlt + (xTen?10:1))
  }

  const handleMissionAltDownBtn = () => {
    if (droneMessage !== null) handleMissionAlt(droneMessage.DroneMission.MissionAlt - (xTen?10:1))
  }

  return (
      <>
          {/* top btn */}
          <div className={'flex h-[30px] z-10 mt-[10px]'}>
              {droneMessage && droneMessage.DroneStt.FlightMode === 3
                  ? <button className={'px-2 py-1 mr-0.5 rounded-md text-white bg-[#6359E9]'}>Auto</button>
                  : <ControlButton className={'px-2 py-1 mr-0.5 rounded-md text-white bg-[#6359E9]'}
                                   onClick={() => handleDroneFlightMode(3)}>Auto</ControlButton>
              }
              {/*{droneMessage && droneMessage.DroneStt.FlightMode === 0*/}
              {/*    ? <button className={'px-2 py-1 mr-0.5 rounded-md text-white bg-[#6359E9]'}>Stabilize</button>*/}
              {/*    : <ControlButton className={'px-2 py-1 mr-0.5 rounded-md text-white'}*/}
              {/*                     onClick={() => handleDroneFlightMode(0)}>Stabilize</ControlButton>*/}
              {/*}*/}
              {/*{droneMessage && droneMessage.DroneStt.FlightMode === 5*/}
              {/*  ? <button className={'px-2 py-1 mr-0.5 rounded-md text-white bg-[#6359E9]'}>Loiter</button>*/}
              {/*  : <ControlButton className={'px-2 py-1 mr-0.5 rounded-md text-white'} onClick={() => handleDroneFlightMode(5)}>Loiter</ControlButton>*/}
              {/*}*/}
              {/*{droneMessage && droneMessage.DroneStt.FlightMode === 16*/}
              {/*  ? <button className={'px-2 py-1 mr-0.5 rounded-md text-white bg-[#6359E9]'}>PosHold</button>*/}
              {/*  : <ControlButton className={'px-2 py-1 mr-0.5 rounded-md text-white'} onClick={() => handleDroneFlightMode(16)}>PosHold</ControlButton>*/}
              {/*}*/}
              {/*{droneMessage && droneMessage.DroneStt.FlightMode === 2*/}
              {/*  ? <button className={'px-2 py-1 mr-0.5 rounded-md text-white bg-[#6359E9]'}>AltHold</button>*/}
              {/*  : <ControlButton className={'px-2 py-1 mr-0.5 rounded-md text-white'} onClick={() => handleDroneFlightMode(2)}>AltHold</ControlButton>*/}
              {/*}*/}
              {droneMessage && droneMessage.DroneStt.FlightMode === 4
                  ? <button className={'px-2 py-1 mr-0.5 rounded-md text-white bg-[#6359E9]'}>Guided</button>
                  : <ControlButton className={'px-2 py-1 mr-0.5 rounded-md text-white'}
                                   onClick={() => handleDroneFlightMode(4)}>Guided</ControlButton>
              }
              {droneMessage && droneMessage.DroneStt.FlightMode === 17
                  ? <button className={'px-2 py-1 mr-0.5 rounded-md text-white bg-[#6359E9]'}>Brake</button>
                  : <ControlButton className={'px-2 py-1 mr-0.5 rounded-md text-white'}
                                   onClick={() => handleDroneFlightMode(17)}>Brake</ControlButton>
              }
              {droneMessage && droneMessage.DroneStt.FlightMode === 9
                  ? <button className={'px-2 py-1 mr-0.5 rounded-md text-white bg-[#6359E9]'}>Land</button>
                  : <ControlButton className={'px-2 py-1 mr-0.5 rounded-md text-white'}
                                   onClick={() => handleDroneFlightMode(9)}>Land</ControlButton>
              }
              {droneMessage && droneMessage.DroneStt.FlightMode === 6
                  ? <button className={'px-2 py-1 mr-0.5 rounded-md text-white bg-[#6359E9]'}>RTL</button>
                  : <ControlButton className={'px-2 py-1 mr-0.5 rounded-md text-white'}
                                   onClick={() => handleDroneFlightMode(6)}>RTL</ControlButton>
              }
          </div>

          {/* left btn */}
          <button onClick={toggleAltBtn}
                  className={'absolute top-[10px] left-[10px] flex justify-center items-center w-[40px] h-[40px] bg-white hover:bg-gray-200 shadow-sm shadow-[#BBBBBB]'}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                  <path fillRule="evenodd"
                        d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z"
                        clipRule="evenodd"/>
              </svg>
          </button>

          <button onClick={props.toggleLeftPanel}
                  className={'absolute top-[60px] left-[10px] flex justify-center items-center w-[40px] h-[40px] bg-white hover:bg-gray-200 shadow-sm shadow-[#BBBBBB]'}>
              {props.leftPanel
                  ?
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                      <path fillRule="evenodd"
                            d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                            clipRule="evenodd"/>
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                      <path fillRule="evenodd"
                            d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z"
                            clipRule="evenodd"/>
                  </svg>}
          </button>

          {props.isMarker
              ? <button onClick={props.handleIsMarker}
                        className={'absolute top-[110px] left-[10px] flex justify-center items-center w-[40px] h-[40px] bg-[#6359E9] shadow-sm shadow-[#BBBBBB]'}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                      <path fillRule="evenodd"
                            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                            clipRule="evenodd"/>
                  </svg>
              </button>
              : <button onClick={props.handleIsMarker}
                        className={'absolute top-[110px] left-[10px] flex justify-center items-center w-[40px] h-[40px] bg-white hover:bg-gray-200 shadow-sm shadow-[#BBBBBB]'}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                      <path fillRule="evenodd"
                            d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                            clipRule="evenodd"/>
                  </svg>
              </button>
          }

          <button onClick={props.handleMarkerReset}
                  className={'absolute top-[160px] left-[10px] flex justify-center items-center w-[40px] h-[40px] bg-white hover:bg-gray-200 shadow-sm shadow-[#BBBBBB]'}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                  <path fillRule="evenodd"
                        d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        clipRule="evenodd"/>
                  <g stroke="darkred" strokeWidth="2">
                      <line x1="2" y1="2" x2="23" y2="21"/>
                  </g>
              </svg>

          </button>

          <button
              className={'absolute top-[210px] left-[10px] flex justify-center items-center w-[40px] h-[40px] bg-white hover:bg-gray-200 shadow-sm shadow-[#BBBBBB]'}
              onClick={toggleLogBtn}
          >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                  <path
                      fillRule="evenodd"
                      d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm3.97.97a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Zm4.28 4.28a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                      clipRule="evenodd"
                  />
              </svg>
              {logBtn && (
                  <div className={'overflow-scroll'} style={{
                      position: 'absolute',
                      top: '50px',
                      left: '0px',
                      width: '600px',
                      height: '250px',
                      background: '#fff',
                      border: '1px solid #000'
                  }}>
                      <div className={'px-2'}>
                          {droneMessage && printDroneLogs(droneMessage.DroneStt.DroneLogger)}
                      </div>
                  </div>
              )}
          </button>


          {altBtn
              ? (<div className={'flex flex-row rounded border justify-end items-center text-sm text-black font-normal'}
                      style={{
                          position: 'absolute',
                          top: '245px',
                          left: '52px',
                          width: '135px',
                          height: '40px',
                          background: '#fff',
                      }}>
                  <span className={'ml-2'}> Alt: </span>
                  <div className={'mx-auto'}> {droneMessage && droneMessage.DroneMission.MissionAlt}</div>
                  <div className={'flex flex-col items-center text-xs'}>
                      <button
                          onClick={handleMissionAltUpBtn}
                          className={'w-[40px] rounded-xl border hover:bg-[#AEABE9]'}
                      >
                          up
                      </button>
                      <button
                          className={'w-[40px] rounded-xl border hover:bg-[#AEABE9]'}
                          onClick={handleMissionAltDownBtn}
                      >
                          down
                      </button>
                  </div>
                  {xTen
                      ? <button className={'w-[30px] h-[36px] mr-1 rounded-xl border text-xs bg-[#AEABD8]'}
                                onClick={toggleXTen}>x10</button>
                      : <button className={'w-[30px] h-[36px] mr-1 rounded-xl border text-xs'}
                                onClick={toggleXTen}>x10</button>}
              </div>) : null}

          {/* right btn */}
          <button onClick={props.toggleRightPanel}
                  className={'absolute top-[60px] right-[10px] flex justify-center items-center w-[40px] h-[40px] bg-white hover:bg-gray-200 shadow-sm shadow-[#BBBBBB]'}>
              {props.rightPanel
                  ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                      <path fillRule="evenodd"
                            d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z"
                            clipRule="evenodd"/>
                  </svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                      <path fillRule="evenodd"
                            d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                            clipRule="evenodd"/>
                  </svg>}
          </button>

          <button onClick={props.toggleSwapMap}
                  className={'absolute top-[110px] right-[10px] flex justify-center items-center w-[40px] h-[40px] bg-white hover:bg-gray-200 shadow-sm shadow-[#BBBBBB]'}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                  <path fillRule="evenodd"
                        d="M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z"
                        clipRule="evenodd"/>
              </svg>
          </button>

          <button onClick={props.toggleFlightInfoTable}
                  className={'absolute top-[160px] right-[10px] flex justify-center items-center w-[40px] h-[40px] bg-white hover:bg-gray-200 shadow-sm shadow-[#BBBBBB]'}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                  <path
                      d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z"/>
              </svg>
          </button>

          <button onClick={props.toggleIndicator}
                  className={'absolute top-[210px] right-[10px] flex justify-center items-center w-[40px] h-[40px] bg-white hover:bg-gray-200 shadow-sm shadow-[#BBBBBB]'}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                  <path
                      d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z"/>
              </svg>
          </button>

      </>
  )
}

const MainController = (props) => {
    const {
        handleDroneFlightMode,
        handleDroneFlightCommand,
        handleDroneTargetMarking,
        handleDroneTransitMarking,
        handleDroneMovetoTarget,
        handleDroneMovetoBase,
        handleMoveBtn,
        handleMissionStart,
    } = useContext(DroneContext)

    const handleGoToBtn = () => {
        props.setReturnPoint({
            lat: 0.0,
            lng: 0.0
        })

        handleDroneTargetMarking(
            props.targetPoints[props.targetPoints.length - 1].position.lat,
            props.targetPoints[props.targetPoints.length - 1].position.lng
        )

        const transitPointsList = []
        const transitList = props.targetPoints.slice(0, props.targetPoints.length - 1)
        transitList.map(obj => transitPointsList.push(obj.position))
        handleDroneTransitMarking(transitPointsList)

        handleDroneMovetoTarget()
    }

    const handleReturnBtn = () => {
        handleDroneMovetoBase()
        props.toggleIsRtl()
        props.handleReturnPoint()
    }

    return (
        <div id='main-controller'
             className={'absolute flex justify-center overflow-hidden bottom-0 h-[220px] text-[#AEABD8]'}>
            <div className={'flex flex-col mt-0.5 mx-2'}>
                <ControlButton className={'w-20 h-10 mb-1.5 rounded-xl'} onClick={() => handleDroneFlightCommand(0)}>Arm</ControlButton>
        <ControlButton className={'w-20 h-10 mb-1.5 rounded-xl'} onClick={() => handleDroneFlightCommand(2)}>Take Off</ControlButton>
        <ControlButton className={'w-20 h-10 mb-1.5 rounded-xl'} onClick={() => handleDroneFlightCommand(3)}>Land</ControlButton>
        <ControlButton className={'w-20 h-10 mb-1.5 rounded-xl'} onClick={() => handleDroneFlightCommand(1)}>Dis-Arm</ControlButton>
      </div>

      <div
        className={'flex flex-col justify-center items-center h-full rounded-t-3xl w-[200px] shadow-2xl bg-[#1D1D41]'}>
        <span
          className={'flex justify-center w-[40px] mb-3 rounded-md border border-[#6359E9] text-sm text-[#6359E9]'}>드론</span>
        <DroneJoyStick/>
      </div>
      <button
        className={'absolute bottom-0 w-5 h-5 rounded-t-md bg-white hover:bg-gray-300'}
        onClick={props.toggleController}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1D1D41"
          style={{ transform: 'rotate(90deg)' }} className="w-5 h-4 mx-auto mt-0.5 hover:text-white">
          <path fillRule="evenodd"
            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
            clipRule="evenodd"/>
        </svg>
      </button>
      <div
        className={'flex flex-col justify-center items-center h-full rounded-t-3xl w-[200px] shadow-2xl bg-[#1D1D41]'}>
        <span
          className={'flex justify-center w-[40px] mb-3 rounded-md border border-[#6359E9] text-sm text-[#6359E9]'}>제어</span>
        <ControlJoyStick/>
      </div>

      <div className={'flex flex-col mt-0.5 mx-2'}>
        <ControlButton className={'w-20 h-12 mb-1.5 rounded-xl text-sm'} onClick={() => handleMoveBtn(props.targetPoint.lat, props.targetPoint.lng)}>Go To Marker</ControlButton>
        <ControlButton className={'w-20 h-12 mb-1.5 rounded-xl text-sm'} onClick={handleMissionStart} >Mission Start</ControlButton>
        <ControlButton className={'w-20 h-10 mb-1.5 rounded-xl'} onClick={() => handleDroneFlightMode(17)}>Brake</ControlButton>
        <ControlButton className={'w-20 h-12 mb-1.5 rounded-xl'} onClick={() => handleDroneFlightMode(6)}>Return to Base</ControlButton>

        {/*<ControlButton className={'w-20 h-10 mb-1.5 rounded-xl'} onClick={() => handleReturnBtn()}>Return</ControlButton>*/}
        {/*{ props.isRtl*/}
        {/*  ? <button className={'w-20 h-10 mb-1.5 rounded-xl bg-[#6359E9]'}>Return</button>*/}
        {/*  : <ControlButton className={'w-20 h-10 mb-1.5 rounded-xl'} onClick={() => handleReturnBtn()}>Return</ControlButton>*/}
        {/*}*/}
      </div>
    </div>
  )
}
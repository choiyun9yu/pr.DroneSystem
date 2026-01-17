import { CameraJoyStick } from '../components/CameraJoyStick'
import { useContext } from 'react'
import {DroneContext} from "../SignalRContainer";
import {MiniMap} from "../MiddleMap";

export const FlightMode = (props) => {
  return (
    <div id="right-flightmode" className="flex  flex-col w-[500px] h-full">
      <RightSideTop />
      <RightSideBottom
        center={props.center}
        swapMap={props.swapMap}
        toggleSwapMap={props.toggleSwapMap}
      />
    </div>
  )
}

const RightSideTop = () => {
  const { droneMessage } = useContext(DroneContext)

  return(
    <div className={'items-start w-full h-1/2 mb-3 rounded-2xl bg-[#1D1D41] font-normal'}>
      <div className="flex m-2 items-center">
        <span className="text-white rounded-md m-3 font-bold text-medium">• 드론 정보</span>
      </div>
      <table id={'gcs-mini-table'}
        className={'w-[90%] h-[70%] mx-auto border-t-2 border-l-2 border-[#4B4B99] text-white text-sm'}>
        <tbody>
          <tr className={'w-full border-b-2 border-[#4B4B99]'}>
            <th className={'w-[23%] border-r-2 border-[#4B4B99]'}>드론 ID</th>
            <td className={'w-[27%] pl-3 border-r-2 border-[#4B4B99] bg-[#27264E]'}>ArduCopter {droneMessage && droneMessage.DroneId}</td>
            <th className={'w-[23%] border-r-2 border-[#4B4B99]'}>현재 WP 번호</th>
            <td className={'w-[27%] pl-3 border-r-2 border-[#4B4B99] bg-[#27264E]'}>{droneMessage && droneMessage.DroneMission.PathIndex}</td>
          </tr>

          <tr className={'w-full border-b-2 border-[#4B4B99]'}>
            <th className={'w-[23%] border-r-2 border-[#4B4B99]'}>드론 전압 (V)</th>
            <td className={'w-[27%] pl-3 border-r-2 border-[#4B4B99] bg-[#27264E]'}>{droneMessage && droneMessage.DroneStt.PowerV}</td>
            <th className={'w-[23%] border-r-2 border-[#4B4B99]'}>드론 온도 (°C)</th>
            <td className={'w-[27%] pl-3 border-r-2 border-[#4B4B99] bg-[#27264E]'}>{droneMessage && droneMessage.DroneStt.TempC}</td>
          </tr>

          <tr className={'w-full border-b-2 border-[#4B4B99]'}>
            <th className={'w-[23%] border-r-2 border-[#4B4B99]'}>위성 수신 수</th>
            <td className={'w-[27%] pl-3 border-r-2 border-[#4B4B99] bg-[#27264E]'}>{droneMessage && droneMessage.DroneStt.SatellitesCount}</td>
            <th className={'w-[23%] border-r-2 border-[#4B4B99]'}>HDOP</th>
            <td className={'w-[27%] pl-3 border-r-2 border-[#4B4B99] bg-[#27264E]'}>{droneMessage && droneMessage.DroneStt.HDOP.toFixed(9)}</td>
          </tr>

          <tr className={'w-full border-b-2 border-[#4B4B99]'}>
            <th className={'w-[23%] border-r-2 border-[#4B4B99]'}>위도</th>
            <td className={'w-[27%] pl-3 border-r-2 border-[#4B4B99] bg-[#27264E]'}>{droneMessage && droneMessage.DroneStt.Lat}</td>
            <th className={'w-[23%] border-r-2 border-[#4B4B99]'}>경도</th>
            <td className={'w-[27%] pl-3 border-r-2 border-[#4B4B99] bg-[#27264E]'}>{droneMessage && droneMessage.DroneStt.Lon}</td>
          </tr>

          <tr className={'w-full border-b-2 border-[#4B4B99]'}>
            <th className={'w-[23%] border-r-2 border-[#4B4B99]'}>고도 (m)</th>
            <td className={'w-[27%] pl-3 border-r-2 border-[#4B4B99] bg-[#27264E]'}>{droneMessage && droneMessage.DroneStt.Alt}</td>
            <th className={'w-[23%] border-r-2 border-[#4B4B99]'}>제어권</th>
            <td className={'w-[27%] pl-3 border-r-2 border-[#4B4B99] bg-[#27264E]'}>{droneMessage && droneMessage.ControlStt}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const RightSideBottom = (props) => {
  return (
    <div className={'flex items-start w-full h-full rounded-2xl bg-[#1D1D41]'}>
      <div className="flex flex-col w-full h-full m-2">
        <span className="text-white rounded-md m-3 font-bold text-medium">• 드론 카메라</span>
        <div className={'w-full min-h-[250px] mx-auto bg-black'}>
          {props.swapMap && <MiniMap
            center={props.center}
            toggleSwapMap={props.toggleSwapMap}
          />}
        </div>

        <div className={'flex flex-col w-full h-full text-[#AEABD8]'}>
          <div className={'flex flex-row w-full mt-3 justify-center'}>
            <div className={'w-full'}>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  className="w-5 h-5 hover:text-gray-300">
                  <path fillRule="evenodd"
                    d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                    clipRule="evenodd"/>
                </svg>

              </button>
            </div>
            <div
              className={'flex justify-center min-w-[100px] py-0.5 rounded border border-[#6359E9] text-sm text-[#6359E9] font-semibold'}>카메라
                제어
            </div>
            <div className={'flex w-full items-center justify-end'}>
              <button className={'mr-3'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  className="w-6 h-6 hover:text-gray-300">
                  <path fillRule="evenodd"
                    d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                    clipRule="evenodd"/>
                </svg>
              </button>
              <button
                className={'mr-3 my-0.5 px-1 rounded border text-sm text-[#1D1D41] border-[#AEABD8] bg-[#AEABD8] hover:text-gray-300 hover:border-gray-300'}>Follow
              </button>
              <button className={'mr-3'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  className="w-6 h-6 hover:text-gray-300">
                  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z"/>
                  <path fillRule="evenodd"
                    d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"/>
                </svg>
              </button>
              <button className={'mr-3'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  className="w-6 h-6 hover:text-gray-300">
                  <path
                    d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z"/>
                </svg>

              </button>
            </div>
          </div>

          <div className={'flex flex-row w-full h-full mt-5 mb-3'}>
            <div className={'flex justify-end items-center w-full h-full'}>
              <button className={'mt-4 mx-auto'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  className="w-6 h-6 hover:text-gray-300">
                  <path fillRule="evenodd"
                    d="M3.22 3.22a.75.75 0 011.06 0l3.97 3.97V4.5a.75.75 0 011.5 0V9a.75.75 0 01-.75.75H4.5a.75.75 0 010-1.5h2.69L3.22 4.28a.75.75 0 010-1.06zm17.56 0a.75.75 0 010 1.06l-3.97 3.97h2.69a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75V4.5a.75.75 0 011.5 0v2.69l3.97-3.97a.75.75 0 011.06 0zM3.75 15a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-2.69l-3.97 3.97a.75.75 0 01-1.06-1.06l3.97-3.97H4.5a.75.75 0 01-.75-.75zm10.5 0a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-2.69l3.97 3.97a.75.75 0 11-1.06 1.06l-3.97-3.97v2.69a.75.75 0 01-1.5 0V15z"
                    clipRule="evenodd"/>
                </svg>
              </button>
              <div className={'flex flex-col h-full mr-5 items-center'}>
                <div className={'flex justify-end px-1 rounded border border-[#AEABD8] text-sm'}>
                    zoom
                </div>
                <div className={'flex flex-col h-full justify-between'}>
                  <button
                    className={'flex justify-center items-center m-2 w-5 h-5 rounded-full bg-[#AEABD8] text-gray-800 hover:bg-gray-300'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd"
                        d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                        clipRule="evenodd"/>
                    </svg>
                  </button>
                  <button
                    className={'flex justify-center items-center m-2 w-5 h-5 rounded-full bg-[#AEABD8] text-gray-800 hover:bg-gray-300'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd"
                        d="M5.25 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className={'flex items-center w-full'}>
              <CameraJoyStick />
            </div>

            <div className={'flex w-full h-full items-center'}>
              <div className={'flex flex-col h-full ml-5 items-center'}>
                <div className={'flex flex-col justify-end px-1 rounded border border-[#AEABD8] text-sm'}>
                    focus
                </div>
                <div className={'flex flex-col h-full justify-between'}>
                  <button
                    className={'flex justify-center items-center m-2 w-5 h-5 rounded-full bg-[#AEABD8] text-gray-800 hover:bg-gray-300'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd"
                        d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                        clipRule="evenodd"/>
                    </svg>
                  </button>
                  <button
                    className={'flex justify-center items-center m-2 w-5 h-5 rounded-full bg-[#AEABD8] text-gray-800 hover:bg-gray-300'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd"
                        d="M5.25 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </div>
              <button className={'mt-4 mx-auto'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  className="w-6 h-6 hover:text-gray-300">
                  <path
                    d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className={'flex flex-col text-gray-800 font-semibold'}>
            <div className={'flex flex-col mb-5 items-center'}>
              <div>
                <button
                  className={'mb-1 ml-1 px-2 py-1 rounded-md shadow border border-gray-400 bg-gray-300 hover:bg-gray-400 text-xs '}>Mid
                </button>
                <button
                  className={'mb-1 ml-1 px-2 py-1 rounded-md shadow border border-gray-400 bg-gray-300 hover:bg-gray-400 text-xs '}>Down
                </button>
              </div>
              <div>
                <button
                  className={'mb-1 ml-1 px-4 py-1 rounded-md shadow border border-gray-400 bg-gray-300 hover:bg-gray-400 text-xs '}>Calibration
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
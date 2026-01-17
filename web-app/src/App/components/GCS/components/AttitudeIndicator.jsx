import { useContext } from 'react'
import styled from 'styled-components'
import {DroneContext} from "../SignalRContainer";

const GaugeStyleComponent = styled.div`
  background-image: linear-gradient(135deg,
  rgba(96.71694979071617, 93.3640743046999, 141.64585292339325, 1) 0%,
  rgba(46.116092428565025, 43.2159436494112, 117.27387472987175, 1) 35%,
  rgba(2.2979988902807236, 5.280578546226025, 21.38650830835104, 1) 100%);
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
`

const skyColor = { start: '#4C77BA', stop: '#4C77BA' }
const landColor = { start: '#6EAB33', stop: '#497C11' }

const SIZE = 100
const r1 = (0.8 * SIZE) / 2
const r2 = (0.9 * SIZE) / 2
const trianglePoints = [
  (SIZE / 2) - 2,
  SIZE / 20,
  (SIZE / 2) + 2,
  SIZE / 20,
  SIZE / 2,
  (SIZE / 20) + 8
]

export const AttitudeIndicator = () => {
  const { droneMessage } = useContext(DroneContext)

  const roll = (droneMessage && droneMessage.DroneStt.Roll || 0) * (180/Math.PI)
  const pitch = (droneMessage && droneMessage.DroneStt.Pitch || 0) * (180/Math.PI)

  return (
    <div className={'absolute top-2 left-16 flex z-10'}>
      <GaugeStyleComponent className={'flex justify-center items-center rounded-3xl border border-[#1D1D41]'}>
        <div className={'p-3'}>
          <svg width={SIZE} height={SIZE}>
            <defs>
              <linearGradient
                id="greenGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%">
                <stop offset="0%" stopColor={skyColor.start} stopOpacity={1}/>
                <stop
                  offset={`${SIZE / 2 - ((-pitch / 45) * SIZE) / 2}%`}
                  stopColor={skyColor.stop}
                  stopOpacity={1}/>
                <stop
                  offset={`${SIZE / 2 - ((-pitch / 45) * SIZE) / 2}%`}
                  stopColor={landColor.start}
                  stopOpacity={1}/>
                <stop offset="100%" stopColor={landColor.stop} stopOpacity={1}/>
              </linearGradient>
            </defs>
            <g transform={`rotate(${-roll} ${SIZE / 2} ${SIZE / 2})`}>
              <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2} fill="url(#greenGradient)"/>
              {[...Array(5).keys()].map(value => (
                <line
                  key={value}
                  x1={(SIZE / 12) * (value % 2 === 0 ? 5 : 5.5)}
                  x2={(SIZE / 12) * (value % 2 === 0 ? 7 : 6.5)}
                  y1={SIZE / 2 + ((value - 2) * SIZE) / 10}
                  y2={SIZE / 2 + ((value - 2) * SIZE) / 10}
                  strokeWidth={1}
                  stroke="white"
                />
              ))}
              {[...Array(9).keys()].map(value => {
                const { x1, y1, x2, y2 } = calculateRadLine(
                  r1,
                  r2,
                  Math.PI / 6 + (Math.PI / 12) * value,
                  SIZE / 2,
                  SIZE / 2
                )
                return (
                  <line
                    key={value}
                    x1={x1}
                    x2={x2}
                    y1={y1}
                    y2={y2}
                    strokeWidth={2}
                    stroke="white"
                  />
                )
              })}
            </g>
            <circle cx={SIZE / 2} cy={SIZE / 2} r={2} fill="red"/>
            <line
              x1={(SIZE / 12) * 2}
              x2={(SIZE / 12) * 3.5}
              y1={SIZE / 2}
              y2={SIZE / 2}
              stroke="red"
              strokeWidth={1}
            />
            <line
              x1={(SIZE / 12) * 8.5}
              x2={(SIZE / 12) * 10}
              y1={SIZE / 2}
              y2={SIZE / 2}
              stroke="red"
              strokeWidth={1}
            />
            <polygon points={trianglePoints} fill="red"/>
          </svg>
        </div>
      </GaugeStyleComponent>
    </div>
  )
}

const calculateRadLine = (r1, r2, angel, x, y) => {
  const x1 = x - Math.cos(angel) * r1
  const y1 = y - Math.sin(angel) * r1
  const x2 = x - Math.cos(angel) * r2
  const y2 = y - Math.sin(angel) * r2
  return { x1, y1, x2, y2 }
}
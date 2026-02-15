import React from "react";

export const VideoMode = () => {
  return (
    <div id='right-videomode' className={'flex flex-col w-[720px] h-full'}>
      <VideoModeTop />
      {/*<VideoModeBottom />*/}
    </div>
  )
}

const VideoModeTop = () => {
  return (
    <div className={'flex items-start w-full h-full mb-3 rounded-2xl bg-[#1D1D41]'}>
      <div className="flex flex-col w-full h-full m-2">
        <span className="text-white rounded-md mt-5 ml-5 mb-2 font-bold text-2xl">📝 한빛 송전탑(2) 이상 보고서</span>
          <div className={'flex justify-center items-center w-full h-full px-2 pt-3 pb-7'}>
              <img
                  src="/report1.png"   // public 폴더 기준
                  alt="소개 이미지"
                  className="w-[90%] h-[95%] object-cover"
              />
          </div>
      </div>
    </div>
  )
}

const VideoModeBottom = () => {
    return (
        <div className={'flex items-start w-full h-1/2 rounded-2xl bg-[#1D1D41]'}>
            <div className="flex flex-col w-full h-full m-2">
                <span className="text-white rounded-md m-3 font-bold text-medium">• 드론 영상2</span>
                <div className={'flex justify-center items-center w-full h-full px-2 pt-3 pb-7'}>
          <div className={'flex w-full h-full bg-black'}></div>
        </div>
      </div>
    </div>
  )
}
import { useState, useEffect } from 'react';

const Videos = () => {
  const [autoplayVideos] = useState([
    '../../Videos/InShot_20231006_165440014.mp4',
    '../../Videos/FB_VID_287688640886468840.mp4',
    '../../Videos/InShot_20230105_123531479.mp4',
  ]);

  const [remainingVideos] = useState([
    '../../Videos/InShot_20231015_222815636.mp4',
    '../../Videos/InShot_20221005_021650132.mp4',
    '../../Videos/InShot_20231109_133012034.mp4',
    '../../Videos/InShot_20231127_160950730.mp4',
    '../../Videos/InShot_20230207_233101661.mp4',
    '../../Videos/InShot_20231203_233313963.mp4',
    '../../Videos/FB_VID_1761597629104177213.mp4',
    '../../Videos/InShot_20231027_135826592.mp4',
    '../../Videos/InShot_20231006_164447478.mp4',
  ]);

  useEffect(() => {
    const autoplayVideoElements = document.querySelectorAll('.autoplay-video');
    autoplayVideoElements.forEach((videoElement) => {
      videoElement.muted = true;
      videoElement.loop = true;
      videoElement.autoplay = true;
    });
  }, []);

  return (
    <div className="bg-[linear-gradient(270deg,_#FFDEE9,_#B5FFFC)] min-h-screen">
      <div className="container mx-auto py-8 pl-5">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-12 mt-3 pr-[100px] italic ">
          Explore Our Product Videos
        </h1>
        <div className="flex flex-wrap mb-8">
          {autoplayVideos.map((video, index) => (
            <div
              key={index}
              className="bg-[linear-gradient(180deg,_#96deda,_#50c9c3)] relative overflow-hidden rounded-lg shadow-md flex-grow mr-4 border border-gray-300"
            >
              <video className="autoplay-video w-full h-[550px]">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto py-[50px] pl-5 pr-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {remainingVideos.map((video, index) => (
            <div
              key={index}
              className="bg-[linear-gradient(0deg,_#fff1eb,_#ace0f9)] relative overflow-hidden rounded-lg shadow-md border border-gray-300 hover:shadow-lg transform transition-transform duration-300 hover:scale-105 mb-5 "
            >
              <video controls className="w-full h-[500px]">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;

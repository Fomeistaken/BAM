import React from "react";
import { Link, useParams } from "react-router-dom";
import { videos } from "../videos";
import { useState, useEffect } from 'react';

function Video() {
  const { id } = useParams();
  // console.log(id)
  const currentVideo = videos.find((video) => video.id === id);
  console.log(currentVideo)
  const [videoData, setVideoData] = useState(null);
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  
  useEffect(() => {
    const apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${currentVideo && currentVideo.id}&key=${API_KEY}`
    console.log(apiUrl)
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setVideoData(data);
      })
      .catch(error => {
        console.error("Fetch error", error);
      });
      console.log(apiUrl)  
  }, []);
  
  console.log(videoData ? videoData : "Loading...")

  if(!currentVideo){
return (
  <div class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
	<h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
	<div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
		Video Not Found
	</div>
	<button class="mt-5">
      <a
        class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
          <Link to="/home">Go Home</Link>
        </span>
      </a>
    </button>
</div>
)


  }



else{
  
  return (
    <div className="flex justify-center items-center min-h-screen flex-col p-4">
    {videoData &&  <>
     <iframe
        
        src={"https://www.youtube.com/embed/" + currentVideo.id}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className=" w-full h-72 shadow-xl shadow-black rounded-md"
      ></iframe>
      <div className="max-w-[75%] bg-slate-100 p-4 mt-4 rounded-lg">
        <h1 className="text-3xl font-bold border-b-2 border-white pb-2 text-black">
          {videoData && videoData.items[0].snippet.title}
        </h1>
        <hr className="background-white" />
        <Link to={'https://youtube.com/channel/' + videoData.items[0].snippet.channelId} target='_blank' className="text-lg text-gray-900 mt-2">
          {videoData && 'Uploaded By: '+ videoData.items[0].snippet.channelTitle}
        </Link>
      </div>
     </>}
    </div>
  );
  
}
}

export default Video;

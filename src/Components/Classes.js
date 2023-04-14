import React, { useState } from "react";
import setTitle from "../Accessories/setTitle";
import { useUser } from "@supabase/auth-helpers-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel CSS
import { videos } from "../videos";

function Classes() {
  const [videoData, setVideoData] = useState([]);
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const promises = videos.map(async (video) => {
        const apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${video.id}&key=${API_KEY}`;
        const response = await fetch(apiUrl);
        return await response.json();
      });

      const data = await Promise.all(promises);
      setVideoData(data);
    };

    fetchData();
  }, []);

  setTitle("Courses");
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            All of the Courses
          </h1>
        </div>
        <div className="flex flex-wrap -m-4 ">
          {videoData.map((video, index) => (
            <Link
              to={"/videos/" + video.items[0].id}
              key={index}
              className=" z-0 lg:w-1/3 sm:w-1/2  p-4 "
            >
              <div className="flex relative rounded-lg">
                <img
                  alt="gallery"
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                  src={video.items[0].snippet.thumbnails.high.url}
                />
                <div className=" rounded-lg px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {video.items[0].snippet.title.substring(0, 70)}
                  </h1>
                  <p className="leading-relaxed">
                    {video.items[0].snippet.description.substring(0, 150)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Classes;

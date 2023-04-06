import React, { useState } from "react";
import setTitle from "../setTitle";
import { useUser } from "@supabase/auth-helpers-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel CSS
import { Carousel } from "react-responsive-carousel";
import { videos } from "../videos";

function Home() {

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








  const usercheck = useUser();
  const navigate = useNavigate();
  setTitle("Home");



  return (
<>
   { usercheck !== null? (<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900">
          Welcome to BAM!
        </h1>
        <p className="mt-4 text-xl text-gray-600 text-center">
          BAM! is a free educational website with courses for everyone. Learn at
          your own pace, anytime, anywhere.
        </p>

        <h1 className="text-xl font-bold text-center text-indigo-900 mx-auto my-10">
          Welcome
        </h1>
        <div className="w-9/12 md:w-3/4 lg:w-9/12 mx-auto">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            className="rounded-lg overflow-hidden"
          >
            <div>
              <img
                src="https://source.unsplash.com/random/?Coding"
                alt="Image 1"
                className="w-full h-64 object-cover"
              />
            </div>
            <div>
              <img
                src="https://source.unsplash.com/random/?Code"
                alt="Image 2"
                className="w-full h-64 object-cover"
              />
            </div>
            {/* <div>
              <img
                src="https://dummyimage.com/600x400/000/000"
                alt="Image 3"
                className="w-full h-64 object-cover"
              />
            </div> */}
          </Carousel>
        </div>

        <br />
          <h1 className="text-xl font-bold text-center text-indigo-900 mx-auto my-10">
          Start Here &#8595;
        </h1>
          <div className="mt-10 max-w-md mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {videoData.slice(0, 6).map((video, index) =>(
          <Link key={index} to={'/videos/'+video.items[0].id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-full object-cover"
                src={video.items[0].snippet.thumbnails.high.url}
                alt=""
              />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <div className="block mt-2">
                  <p className="text-xl font-semibold text-gray-900">
                  {video.items[0].snippet.title.substring(0, 100)}

                  </p>
                  <p className="mt-3 text-base text-gray-500">
                  {video.items[0].snippet.description.substring(0, 150)}

                  </p>
                </div>
              </div>
            </div>
          </Link>
          
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to='/courses'
            className="text-base font-medium text-indigo-600 hover:text-indigo-500"
          >
            See all courses<span aria-hidden="true"> →</span>
          </Link>
        </div>
      
        
        
        
      </div>
    </div>): (
      <>
       <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Welcome to BAM!
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-center">
            BAM! is a free educational website with courses for everyone. Learn at
            your own pace, anytime, anywhere.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-48 md:h-56 lg:h-64 relative">
              <img
                src="https://source.unsplash.com/random/?Education"
                alt="Image 1"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <h2 className="text-xl font-bold text-white mb-2">Learn new skills</h2>
                <p className="text-lg text-white">Discover courses in various subjects and expand your knowledge.</p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-48 md:h-56 lg:h-64 relative">
              <img
                src="https://source.unsplash.com/random/?Code"
                alt="Image 2"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <h2 className="text-xl font-bold text-white mb-2">Improve your career</h2>
                <p className="text-lg text-white">Upgrade your skills and advance your career with our high-quality courses.</p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-48 md:h-56 lg:h-64 relative">
              <img
                src="https://source.unsplash.com/random/?Technology"
                alt="Image 3"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <h2 className="text-xl font-bold text-white mb-2">Learn at your own pace</h2>
                <p className="text-lg text-white">Take courses at your own pace and on your own schedule, without deadlines or due dates.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
             <center> <p className="text-xl text-gray-600">
              To enroll now, please&nbsp;
              <Link to="/login" className="text-indigo-500 font-medium">
                Log In
              </Link>
              .
            </p></center>
    </div>
      </>
    )}
    </>
  );
}

export default Home;




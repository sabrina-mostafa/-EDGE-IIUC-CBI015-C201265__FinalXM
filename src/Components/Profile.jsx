import { useState, useEffect } from "react";

const Profile = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedTimeLeft = localStorage.getItem("timeLeft");
    const storedDisabledState = localStorage.getItem("isDisabled");

    if (storedTimeLeft && storedDisabledState === "true") {
      const remainingTime =
        parseInt(storedTimeLeft, 10) - Math.floor(Date.now() / 1000);
      if (remainingTime > 0) {
        setIsDisabled(true);
        setTimeLeft(remainingTime);
      } else {
        localStorage.removeItem("timeLeft");
        localStorage.removeItem("isDisabled");
      }
    }
  }, []);

  useEffect(() => {
    let timer;

    if (isDisabled && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTimeLeft = prev - 1;

          if (newTimeLeft <= 0) {
            setIsDisabled(false);
            localStorage.removeItem("timeLeft");
            localStorage.removeItem("isDisabled");
          } else {
            localStorage.setItem(
              "timeLeft",
              Math.floor(Date.now() / 1000) + newTimeLeft
            );
          }

          return newTimeLeft;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isDisabled, timeLeft]);


  const handleDivClick = () => {
    setIsSelected((prev) => !prev); // div select
  };


  const handleClick = () => {
    setIsDisabled(true);
    const newTimeLeft = 1 * 60;
    setTimeLeft(newTimeLeft);

    localStorage.setItem(
      "timeLeft",
      Math.floor(Date.now() / 1000) + newTimeLeft
    );
    localStorage.setItem("isDisabled", "true");

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <body className="bg-[white]">

      <nav className="w-[100%] flex justify-center items-center pb-[0.4%]">
        <div className="navbar 2xl:w-[65%] w-[85%] flex justify-between">
          <div className="navbar-start">
            <a className="w-[10rem] cursor-pointer">
              <img src="https://mocktrails.com/uploads/medium/4db20fb0859e3bb81bc835636373d972_medium-229x68.png" alt="" className=" w-[100%]" />
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-[16px] font-[700] text-[#524d4d]">
              <li>
                <a className="hover:text-[#5B4DB8] hover:bg-transparent">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-[#5B4DB8] hover:bg-transparent">
                  Interviewers
                </a>
              </li>
              <li>
                <a className="hover:text-[#5B4DB8] hover:bg-transparent">
                  Blogs
                </a>
              </li>
            </ul>
          </div>
          <div className="navbar-end hidden lg:flex">
            <a className="btn mr-[1%] font-[700] min-h-[2.3rem] h-[2.3rem] bg-[#f5f3f3] text-[black] border-transparent hover:bg-[#ecfaf9] hover:border-transparent">
              Sign In
            </a>
            <button className="btn btn-active btn-primary bg-[#5B4DB8] hover:bg-[#5B4DB8] text-[white] font-[700] min-h-[2.3rem] h-[2.3rem]">
              Get started
            </button>
          </div>
          <div className="dropdown">
            <div tabindex="0" role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[1.7rem] w-[1.7rem] text-[#6a747b]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabindex="0"
              className="menu menu-sm dropdown-content font-[700] text-[#524d4d] bg-[white] right-0 rounded-box z-[1] mt-3 sm:w-[35rem] w-[16rem] px-[1rem] py-[2rem] shadow"
            >
              <li>
                <a className="text-[16px] hover:text-[#5B4DB8] hover:bg-transparent">
                  Home
                </a>
              </li>
              <li>
                <a className="text-[16px] hover:text-[#5B4DB8] hover:bg-transparent">
                  Interviewers
                </a>
              </li>
              <li>
                <a className="text-[16px] hover:text-[#5B4DB8] hover:bg-transparent">
                  Blogs
                </a>
              </li>
              <div className="navbar-end w-[95%] sm:pl-[2%] pl-[5%] sm:pt-[5%] pt-[10%]">
                <a className="btn sm:mr-[2%] mr-[4%] font-[700] min-h-[2.3rem] h-[2.3rem] bg-[#f5f3f3] text-[black] border-transparent hover:bg-[#ecfaf9] hover:border-transparent">
                  Sign In
                </a>
                <button className="btn btn-active btn-primary bg-[#5B4DB8] hover:bg-[#5B4DB8] text-[white] font-[700] min-h-[2.3rem] h-[2.3rem]">
                  Get started
                </button>
              </div>
            </ul>
          </div>
        </div>
      </nav>


      <header className="w-[100%] flex flex-col justify-center items-center pb-[3%]">
        <div className="up w-[100%] h-[16rem] overflow-hidden">
          <img
            src="https://mocktrails.com/uploads/big/43e8485bd686c86b6f4b28e7932a9337_big-1280x853.jpeg"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>

        <div className=" dwn xl:w-[65%] w-[85%] flex flex-row justify-between items-center">
          <div className="lft md:w-[15rem] w-[9rem] md:mt-[-6rem] sm:mt-[-10rem] mt-[-15rem] ">
            <div className="avatar">
              <div className=" border-[white] md:border-[6px] border-[4px] w-[96%] rounded-full ">
                <img src="https://mocktrails.com/uploads/medium/cc257a5a2b10bbc5862717147902b9ad_medium-870x1200.jpg" className="w-[100%]" />
              </div>
            </div>
          </div>

          <div className="rgt  w-[80%] pt-[1%] flex md:flex-row flex-col justify-between">
            <div className="l ">
              <div className="u flex items-center w-[82%] ">
                <h1 className="sm:text-[34px] text-[28px] text-[black] font-[700] pr-[5%]">
                  Abir Khan
                </h1>
                <img
                  src="https://mocktrails.com/assets/images/flags/bd.png"
                  alt=""
                  className="sm:w-[26px] w-[22px] sm:h-[17px] h-[14px] rounded-[5px]"
                />
              </div>

              <div className="d text-[black]">
                <p className="sm:text-[18px] text-[16px] font-[500] leading-[32px]">
                  Senior Software Engineer{" "}
                  <span className="text-[#696868]">at</span>{" "}
                  <span className="font-[700] sm:text-[20px] text-[17px]">Growth Garage</span>{" "}
                </p>
                <div className="flex items-center">
                  <i className="fa-solid fa-location-dot mr-[3%] text-[16px] text-[#999]"></i>
                  <p className="font-[600] leading-[30px]">Bangladesh</p>
                </div>
                <div className="flex items-center">
                <i className="fa-regular fa-clock mr-[3%] text-[#999]"></i>
                  <p className="font-[500] text-[#555454] leading-[30px]">
                    Active
                    <span className="font-[700] text-[black]"> a week ago</span>
                  </p>
                </div>
                <div className="flex items-center">
                <i className="fa-solid fa-recycle mr-[3%] text-[#999]"></i>
                  <p className="font-[600] text-[#555454]">
                    Usually responds in
                    <span className="font-[700] text-[black]"> hour</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end md:mt-[1%] sm:mt-[5%] mt-[10%]">
              <div className="w-[55px] h-[42px] md:mr-[4%] mr-[1%] rounded-[5px] hover:shadow-xl bg-[#5B4DB8] text-[white] flex justify-center items-center cursor-pointer">
                <a href="">
                  <i className="fa-regular fa-comment text-[17px]"></i>
                </a>
              </div>
              <div className="w-[55px] h-[42px] rounded-[5px] shadow-md flex justify-center items-center cursor-pointer">
                <a href="">
                  <i className="fa-regular fa-heart text-[18px]"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>


      <main className="w-[100%] flex justify-center items-center sm:pt-0 pt-[10%]">
        <div className="container 2xl:w-[65%] xl:w-[86%] lg:w-[92%] sm:w-[75%] w-[88%]">
          <div>
            <div className="title flex font-[600] text-[#3a3838] text-[17px]">
              <h1 className="mr-[2.5%] underline decoration-[2px] underline-offset-[10px] decoration-[#5B4DB8] ">Overview</h1>
              <h1>Reviews</h1>
            </div>
            <div className="flex w-full flex-col mt-[-1%]">
              <div className="divider"></div>
            </div>
          </div>

          <div className="flex lg:flex-row flex-col justify-between">
            <div className="lf lg:w-[47%] sm:w-[98%] w-[100%]">
              <div className="f text-[black]">
                <p className="font-[600] text-[17px] py-[1%]">
                  5+ Years of Experience in Software Engineering
                </p>
                <h1 className="font-[700] text-[22px] py-[2%] pt-[5%]">
                  Background
                </h1>
                <div className=" text-[17px] font-[600] border-[#ddd9d9b4] border-[1px] rounded-[8px] shadow-[0px_2px_12px_#ddd9d9]">
                  <div className="flex justify-between leading-[4.5rem]">
                    <h1 className="pl-[20px]">Skills</h1>
                    <div className="pr-[25px] flex items-center">
                      <p className="border-[1px] border-[#dc3545] bg-[#dc35451a] text-[#dc3545] text-[15px] rounded-[5px] p-[12px] leading-[16px]">
                        Full stack
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between rounded-b-[8px] border-t-[1px] leading-[4.5rem]">
                    <h1 className="pl-[20px]">Fluent In</h1>
                    <div className="flex gap-[10px] items-center pr-[25px]">
                      <p className="border-[1px] border-[#ddd9d9b4] text-[15px] rounded-[5px] p-[12px] leading-[16px]">
                        Bengali
                      </p>
                      <p className="border-[1px] border-[#ddd9d9b4] text-[15px] rounded-[5px] p-[12px] leading-[16px]">
                        English
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="s text-[black] pt-[8%]">
                <h1 className="font-[700] text-[22px] pb-[2%]">Experiences</h1>
                <div className="text-[17px] font-[600] border-[#ddd9d9b4] border-[1px] rounded-[8px] shadow-[0px_2px_12px_#ddd9d9]">
                  <div className="flex p-[3%] pb-[6%]">
                    <div className="w-[51px] mr-[20px] h-[45px] bg-[#bebebe1a] rounded-[5px] flex justify-center items-center">
                      <i className="fa-solid fa-briefcase text-[20px] text-[#5B4DB8]"></i>
                    </div>
                    <div className="leading-[26px]">
                      <h1 className="text-[20px]">Software Engineer</h1>
                      <p className="text-[16px]">
                        ShareTrip Ltd{" "}
                        <span className="text-[14px] text-[#686767]">
                          (21 Dec 2024 - 21 Dec 2024)
                        </span>
                      </p>
                      <p className="text-[13px]">
                        Played Key role in developing ShareTrip B2B Portal
                      </p>
                    </div>
                  </div>
                  <div className="flex p-[3%] pb-[6%] border-t-[1px]">
                    <div className="w-[51px] mr-[20px] h-[45px] bg-[#bebebe1a] rounded-[5px] flex justify-center items-center">
                      <i className="fa-solid fa-briefcase text-[20px] text-[#5B4DB8]"></i>
                    </div>
                    <div className="leading-[25px]">
                      <h1 className="text-[20px]">Software Engineer</h1>
                      <p className="text-[16px]">
                        Field Nation{" "}
                        <span className="text-[14px] text-[#686767]">
                          (21 Dec 2024 - 21 Dec 2024)
                        </span>
                      </p>
                      <p className="text-[13px]">Platform Operations Team</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="t text-[black] pt-[8%]">
                <h1 className="font-[700] text-[22px] pb-[2%]">Educations</h1>
                <div className=" text-[17px] font-[600]">
                  <div className="flex p-[3%] border-[#ddd9d9b4] border-[1px] rounded-[8px] shadow-[0px_2px_12px_#ddd9d9]">
                    <div className="w-[55px] mr-[18px] h-[50px] bg-[#bebebe1a] rounded-[5px] flex justify-center items-center">
                      <i className="fa-solid fa-graduation-cap text-[19px] text-[#5B4DB8]"></i>
                    </div>
                    <div>
                      <h1 className="text-[20px]">
                        International Islamic University Chittagong
                      </h1>
                      <p className="text-[13px] text-[#686767]">
                        Bachelors of Computer Science and Engineering • 2024 •
                        2024
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-[3%] p-[3%] border-[#ddd9d9b4] border-[1px] rounded-[8px] shadow-[0px_2px_12px_#ddd9d9]">
                    <div className="w-[55px] mr-[18px] h-[50px] bg-[#bebebe1a] rounded-[5px] flex justify-center items-center">
                      <i className="fa-solid fa-graduation-cap text-[19px] text-[#5B4DB8]"></i>
                    </div>
                    <div>
                      <h1 className="text-[20px]">
                        International Islamic University Chittagong
                      </h1>
                      <p className="text-[13px] text-[#686767]">
                        Masters in CS in Data Science Track • 2024 • 2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rt lg:w-[47%] sm:w-[98%] w-[100%] lg:pt-[1%] pt-[10%] text-[black] pt-[1%]">
              <div className="p-[4%] border-[#ddd9d9b4] border-[1px] rounded-[8px] shadow-[0px_2px_12px_#ddd9d9]">
                <div>
                  <h1 className="font-[700] text-[22px] pb-[2%]">
                    Community statistics
                  </h1>
                  <div className="grid sm:grid-cols-2 py-[5%] gap-x-[10%]">
                    <div className="flex sm:mb-[14%] mb-[6%]">
                      <div className="mr-[6%] flex justify-center items-center bg-[#dc35451a] text-[#dc3545] w-[55px] h-[30px] p-[26px] rounded-[10px] text-[20px]">
                        <i className="fa-regular fa-rectangle-list"></i>
                      </div>
                      <div>
                        <h1 className="text-[20px] font-[600]">0</h1>
                        <p className="text-[#6c757d] font-[500]">
                          Completed Sessions
                        </p>
                      </div>
                    </div>
                    <div className="flex sm:mb-[14%] mb-[6%]">
                      <div className="mr-[6%] flex justify-center items-center bg-[#28a74533] text-[#28a745] w-[55px] h-[30px] p-[26px] rounded-[10px] text-[22px]">
                        <i className="fa-regular fa-clock"></i>
                      </div>
                      <div>
                        <h1 className="text-[20px] font-[600]">0 Minutes</h1>
                        <p className="text-[#6c757d] font-[500]">
                          Total mentoring time
                        </p>
                      </div>
                    </div>
                    <div className="flex sm:mb-0 mb-[6%]">
                      <div className="mr-[6%] flex justify-center items-center bg-[#99c2f433] text-[#286efb] w-[55px] h-[30px] p-[26px] rounded-[10px] text-[20px]">
                        <i className="fa-regular fa-calendar-check"></i>
                      </div>
                      <div>
                        <h1 className="text-[20px] font-[600]">3%</h1>
                        <p className="text-[#6c757d] font-[500]">
                          Average Attendence
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-[6%] flex justify-center items-center bg-[#ffc1071a] text-[#856404] w-[55px] h-[30px] p-[26px] rounded-[10px] text-[20px]">
                        <i className="fa-solid fa-graduation-cap text-[19px]"></i>
                      </div>
                      <div>
                        <h1 className="text-[20px] font-[600]">5 Years</h1>
                        <p className="text-[#6c757d] font-[500]">Experience</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h1 className="font-[700] text-[22px] py-[3%] pt-[5%]">
                    Sessions
                  </h1>
                  <div className="overflow-x-auto mb-[5%] w-[100%] ">

                    <div
                    
                    onClick={handleDivClick}

                    
                    className={`${isSelected ? "lg:w-[33rem] sm:w-[100%] w-[27rem] flex justify-between items-center px-[3%] py-[2%] border-[#ddd9d9b4] hover:border-[#5B4DB8] border-[2px] rounded-[5px]" : "lg:w-[33rem] sm:w-[100%] w-[27rem] flex justify-between items-center px-[3%] py-[2%] border-[#ddd9d9b4] hover:border-[#5B4DB8] border-[2px] rounded-[5px]" }`} >
                      <div>
                        <p className="font-[600]">
                          Full Stack Developer Mock Interview
                        </p>
                        <div className="flex items-center text-[#686767] text-[13px] pt-[1%]">
                          <i className="fa-regular fa-clock"></i>
                          <p className="font-[600] pl-[8px]">{formatTime(timeLeft)} minitues</p>
                        </div>
                      </div>
                      <div className="w-[5.6rem] bg-[#6a747b1a] rounded-[35px] flex justify-center items-center">
                        <div className="font-[600]">
                          <h1 className="leading-[34px] text-[17px]">
                            450.00 ৳
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[100%] flex justify-center items-center pb-[2%]">
                    <button

                      onClick={handleClick}
                      disabled={!isSelected || isDisabled}

                      className={` ${
                        !isSelected || isDisabled
                          ? "btn-block w-[100%] h-[2.8rem] font-[700] bg-[#5b4db870] hover:bg-[#5b4db870] text-[16px] rounded-[5px] text-[white] border-transparent cursor-not-allowed"
                          : "btn btn-block w-[100%] bg-[#5B4DB8] hover:bg-[#5B4DB8] text-[16px] rounded-[5px] text-[white] border-transparent hover:border-transparent"
                      } `}
                    >
                        
                      {isDisabled ? "Please wait..." : "Book Now"}

                    </button>
                    
                  </div>

                  <div>
                    {/* Pop-Up */}
                    {showPopup && (
                      <div className="fixed w-[40%] h-[15%] bg-[white] flex justify-center items-center border-[#5B4DB8] border-[3px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded shadow-lg z-50">
                        <p className="text-[#5B4DB8] text-[18px] font-bold text-center">
                          Booking Confirmed!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>


      <footer className="pt-[2%] w-[100%] flex flex-col justify-center items-center">
        <div className="flex w-full flex-col">
          <div className="divider"></div>
        </div>

        <div className="lg:w-[75%] sm:w-[85%]">
          <footer className="footer text-[black] p-10">
            <aside>
              <img
                src="https://mocktrails.com/uploads/medium/4db20fb0859e3bb81bc835636373d972_medium-229x68.png"
                alt=""
                className="w-[9rem]"
              ></img>
              <p className="font-[600] text-[17px] py-[3.5%]">
                Empowering your journey, one Mock Interview at a time.
              </p>
              <div className="flex justify-between sm:w-[50%] w-[55%] text-[18px]">
                <div className="border-[1px] border-[#5B4DB8] text-[#5B4DB8] hover:text-[white] hover:bg-[#5B4DB8] py-[8px] px-[10px] rounded-[5px]">
                  <i className="fa-brands fa-square-facebook"></i>
                </div>
                <div className="border-[1px] border-[#5B4DB8] text-[#5B4DB8] hover:text-[white] hover:bg-[#5B4DB8] py-[8px] px-[10px] rounded-[5px]">
                  <i className="fa-brands fa-twitter"></i>
                </div>
                <div className="border-[1px] border-[#5B4DB8] text-[#5B4DB8] hover:text-[white] hover:bg-[#5B4DB8] py-[8px] px-[10px] rounded-[5px]">
                  <i className="fa-brands fa-linkedin"></i>
                </div>
                <div className="border-[1px] border-[#5B4DB8] text-[#5B4DB8] hover:text-[white] hover:bg-[#5B4DB8] py-[8px] px-[10px] rounded-[5px]">
                  <i className="fa-brands fa-instagram"></i>
                </div>
              </div>
            </aside>
            <nav className="text-[#757474] font-[700]">
              <h6 className="text-[17px] text-[black] pb-[18%]">Services</h6>
              <a className="link link-hover hover:text-[#5B4DB8]">
                Interviewers
              </a>
              <a className="link link-hover hover:text-[#5B4DB8]">Blogs</a>
              <a className="link link-hover hover:text-[#5B4DB8]">Contact</a>
            </nav>
            <nav className="text-[#757474] font-[700]">
              <h6 className="text-[17px] text-[black] pb-[12%]">Pages</h6>
              <a className="link link-hover hover:text-[#5B4DB8]">
                Terms and Condition
              </a>
              <a className="link link-hover hover:text-[#5B4DB8]">
                Privacy Policy
              </a>
            </nav>
          </footer>
        </div>

        <div className="flex w-full flex-col">
          <div className="divider"></div>
        </div>

        <footer className="footer footer-center text-base-content pb-[1.5%]">
          <aside>
            <p className="text-[16px] text-[black] font-[600]">
              © 2024 All rights reserved.
            </p>
          </aside>
        </footer>
      </footer>
    </body>
    
  );
};

export default Profile;

import React, { useEffect, useState } from 'react'
import './Weather.css'
function WeatherApp() {
    const [days, setDays] = useState([]);
    const [data, setData] = useState(null);
    const [input, setInput] = useState('')
    const [city, setCity] = useState('Hyderabad');
    const [daysIndex, setDaysIndex] = useState(0);
    const [searchBtnFlag, setSearchBtnFlag] = useState(false);
    const [inDate, setInDate] = useState(null);
    async function getData() {
        try {
            let tempInput = input;
            if (tempInput === '') {
                tempInput = 'Hyderabad';
            }
              let tempDate=getDate();
            let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${tempInput}/${tempDate}?unitGroup=us&include=days%2Cevents&key=7VNDDSKQZWW5GKCWREYN35BDC&contentType=json`)
            if (response.status) {
                if (response.status === 429) {
                    alert("Too Many Requests!Try Again After Some Time!")
                }
            }
            let temp = await response.json();
            setCity(temp.resolvedAddress);
            setDays(temp.days);
            setData(temp.days[0]);
            setSearchBtnFlag(false);
        }
        catch (e) {
            console.log(e);
        }
    }
    function getDate() {
        let dt;
        if (inDate) {
            dt = new Date(inDate);
        }
        else {
            return '';
        }
        return (dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + "/" + dt.getFullYear() + "-" + (dt.getMonth() + 1) +"-28");
    }
    function searchClick() {
        getData();
    }
    useEffect(() => {
        getData();
    }, [])

    function clickNextDay() {
        if (daysIndex !== days.length - 1) {
            setData(days[daysIndex + 1]);
            setDaysIndex((prev) => prev + 1)
        }
    }
    function clickHome() {
        setInDate(null);
        getData();
    }
    function dateVisible() {
        setSearchBtnFlag((prev) => !prev);
    }
    function setClick() {
        getData();
        setSearchBtnFlag(false);
    }
    return (

        <div>
            <div className='backGround w-[100%] bg-repeat  md:min-h-lvh '>
                <nav className='fixed w-[100%] md:bg-[rgb(255,255,255,0.3)] shadow-lg bg-blue-300'>
                    <div className='flex justify-around place-items-center gap-0 md:flex-row flex-col'>
                        <ul className='flex justify-center place-items-center gap-10 cursor-pointer md:text-xl text-sm text-white md:py-9 py-2'>
                            <li onClick={clickHome} className='border-Animation px-2 border-b-[0.3rem] border-b-transparent anim'>Home</li>
                            <li onClick={clickNextDay} className='border-b-[0.3rem] border-b-transparent anim'>See Next Day's</li>
                            <li onClick={dateVisible} className='border-b-[0.3rem] border-b-transparent anim'>Search by Date</li>
                        </ul>
                        {(searchBtnFlag) ? <div className='absolute top-20 md:left-[28%]'>
                            <div className='md:text-xl overflow-hidden h-10 flex place-content-center rounded-lg shadow-xl'>
                                <input type="date" className='p-2' onChange={(e) => setInDate(e.target.value)} value={inDate} />
                                <button onClick={setClick} className='bg-blue-500 font-semibold text-white px-3 hover:bg-blue-400'>Set</button>
                            </div>
                        </div> : null}
                        <div className='flex overflow-hidden rounded-lg md:text-xl mb-3 md:mb-0'>
                            <input type="text" placeholder='Search City...' className='md:w-72 px-4  focus:outline-none ' value={input} onChange={(e) => setInput(e.target.value)} />
                            <button onClick={searchClick} className='bg-[rgb(0,206,209)] px-4 md:py-2 py-1 text-white font-semibold hover:bg-[rgb(96,229,232)] active:bg-[rgb(0,206,209)] duration-300'>Search</button>
                        </div>
                    </div>
                </nav>
                <div className='flex flex-col place-items-center md:gap-16 gap-6 p-7 md:pt-36 pt-24 w-[100%]'>
                    {data ? <div className='md:text-3xl text-white flex flex-col md:gap-3 gap-1 place-items-center'>
                        <h1 className='border-b-2 w-fit px-4' >Weather For {city}</h1>
                        <h1>On {data.datetime}</h1>
                        <h1 className='border-b-2 w-fit px-4'>{data.description}</h1>
                    </div> : null}
                    <div className='flex justify-around place-items-center md:text-3xl text-xl text-white md:px-16 md:gap-20 gap-3 flex-wrap'>
                        <div className='bg-[rgb(0,0,0,0.05)] rounded-3xl'>
                            <div className='bg-[rgb(255,255,255,0.2)] p-7 py-10 rounded-3xl flex flex-col md:gap-6 gap-2 md:w-80  min-w-[300px] shadow-2xl' style={{ boxShadow: "2px 4px 20px rgb(0,0,0,0.2" }}>
                                <p>Temperature:</p>
                                {(data) ? <ul className='flex flex-col gap-4'><p className='md:text-6xl text-4xl'>{Math.floor(((data.temp) - 32) * 5/9 )}° C</p>
                                    <li>Temp-Max : {Math.floor(((data.tempmax) - 32) * 5/9 )}° C</li>
                                    <li>Temp-Min : {Math.floor(((data.tempmin) - 32) * 5/9 )}° C</li>
                                </ul>
                                    : null}
                            </div>
                        </div>
                        <div className='bg-[rgb(0,0,0,0.05)] rounded-3xl'>
                            <div className='bg-[rgb(255,255,255,0.2)] p-7 py-10 rounded-3xl flex flex-col gap-6 md:w-80  min-w-[300px] shadow-2xl' style={{ boxShadow: "2px 4px 20px rgb(0,0,0,0.2" }}>
                                <p>Humididty:</p>
                                {data ? <ul className='flex flex-col gap-4'>
                                    <p className='md:text-6xl text-4xl'>{data.humidity} %</p>
                                    <li>Feels Like : {data.feelslike}</li>
                                    <li>Dew : {data.dew}</li>
                                </ul> : null}
                            </div>
                        </div>
                        <div className='bg-[rgb(0,0,0,0.05)] rounded-3xl'>
                            <div className='bg-[rgb(255,255,255,0.2)] p-7 py-10 rounded-3xl flex flex-col gap-6 md:w-80  min-w-[300px] shadow-2xl' style={{ boxShadow: "2px 4px 20px rgb(0,0,0,0.2", textShadow: "2px 4px 20px rgb(0,0,0,0.3)" }}>
                                <p>Wind:</p>
                                {data ? <ul className='flex flex-col gap-4'>
                                    <p className='md:text-6xl text-4xl'>{data.windspeed} <span className='md:       text-5xl'>Kmph</span></p>
                                    <li>Wind-Gust : {data.windgust}</li>
                                    <li>Direction : {data.winddir} <span className='md:text-xl'>deg</span></li>
                                </ul> : null}
                            </div>
                        </div>
                    </div>
                    {(data && data.length !== 0) ?
                        <div className='flex place-content-center w-[100%]'>
                            <div className='flex md:text-2xl px-10 text-[rgb(0,0,0,0.7)] md:gap-12 gap-6 justify-around  flex-wrap bg-[rgb(255,255,255,0.2)] rounded-xl shadow-xl p-10 '>
                                <div>
                                    <p>Pressure:</p>
                                    <p>{data.pressure}</p>
                                </div>
                            
                            <div>
                                <p>Sunrise:</p>
                                <p>{data.sunrise}</p>
                            </div>
                            <div>
                                <p>Sunset:</p>
                                <p>{data.sunset}</p>
                            </div>
                            <div>
                                <p>Cloudcover:</p>
                                <p>{data.cloudcover}</p>
                            </div>
                            <div>
                                <p>UVindex</p>
                                <p>{data.uvindex}</p>
                            </div>
                            <div>
                                <p>SolarRadiation:</p>
                                <p>{data.solarradiation}</p>
                            </div>
                            <div>
                                <p>Precipitation:</p>
                                <p>{data.precip}</p>
                            </div>
                            <div>
                                <p>Moonphase:</p>
                                <p>{data.moonphase}</p>
                            </div>
                            </div>
                        </div>
                        : null}

                </div>

            </div>
        </div>
    )
}

export default WeatherApp

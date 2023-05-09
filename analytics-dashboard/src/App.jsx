import { useEffect, useState } from "react";
import { Col, Row, DatePicker, TimePicker, Switch, Select } from "antd";
import Sider from "./components/Sider";
import Header from "./components/Header";
import SubType from "./components/SubType";
import SplineChart from "./components/Charts/SplineChart";
import { Activity, Monitor, Video } from "react-feather";
import PieChart from "./components/Charts/PieChart";
import moment from "moment";
import "./App.css";
import Modal from "./components/Modal";
import ContentLoader, { Facebook } from "react-content-loader";
import LineChart from "./components/Charts/LineChart";

function App() {
  const [events, setEvents] = useState([
    "Motion",
    "Analytic",
    "Tampering",
    "LineCrossing",
    "Intrusion",
    "Counting",
    "FaceRec",
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [isActiveId, setIsActiveId] = useState(0);
  const [data, setData] = useState([]);
  const { RangePicker } = DatePicker;
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState();
  const [switchBackground, setSwitchBackground] = useState("#111827");
  const [options, setOptions] = useState([
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
  ]);
  const { Option } = Select;
  const [cameraVisible, setCameraVisible] = useState(false);
  const [apiToken, setApiToken] = useState(null);
  const [userDetails, setUserDetails] = useState({
    userName: "it@januscontinental.com",
    password: "Hub@123",
  });
  const [apiKey, setApiKey] = useState(
    "d5kIYphEl27gl12Te6sJA12WpegDmXyj8trfRWT7"
  );
  const [selectedType, setSelectedType] = useState("Analytic");

  const [allCameras, setAllCameras] = useState(null);

  const [params, setParams] = useState({
    cameraId: "",
    from: "",
    to: "",
    type: "",
    // subType: null,
  });

  const [selectedCameras, setSelectedCameras] = useState([]);
  const [bodyVisible, setBodyVisible] = useState(false);

  const [countPerHour, setCountPerHour] = useState();

  const [allDataStore, setAllDataStore] = useState([
    //General Layout of Data
    // {
    //   cameraId: '1',
    //   data: [
    //     {from: '',
    //     to: '',
    //     noOfPeople: ''},
    //   ]
    // }
  ]);

  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    //There are two steps to fetching data when the page first loads.
    // 1.  Fetch every camera.
    // 2. Loop through every camera and fetch data for the last 30 days. This will be a lengthy process.
    // 3. Later on we can make the ux better by showing data as it comes. If it is of any benefit to do this.
    //getInitialData()
    setBodyVisible(true);
    setStartDate(moment().subtract(1, "day"));
    setEndDate(moment().subtract(1, "day"));
    setStartTime("00:00:01");
    setEndTime("23:59:59");

    // if(apiToken){
    //   getCameras();
    //   console.log("Fetched cameras")
    // }
    if (!apiToken) {
      getInitialData();
    }
  }, []);

  // useEffect(()=>{
  //   if(!apiToken){
  //     generateToken;
  //   }
  // }, [startDate, endDate])

  useEffect(() => {
    console.log("api token has changed ");
    console.log("Camera info ", allCameras);
    if (!allCameras && apiToken) {
      console.log("fetching cameras");
      getCameras();
      setSelectedType("Analytic");
    }
  }, [apiToken]);

  useEffect(() => {
    console.log("Fetching events ");
    if (selectedCameras) {
      getEvents();
    }
  }, [selectedCameras]);

  async function getInitialData() {
    //Generate token
    const res = await fetch("", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // unofficial location of parameters
      }),
    });
    const data = await res.json();
    // console.log("Token here ", data)
    setApiToken(data);
  }

  // useEffect(()=>{
  //   //The idea is, data will only change after there has been fetching involved
  //   //In this case, we need to segment our data into different parts.
  //   //For now, we want the chart to display data for a single day,
  //   //It should also display data for different cameras.

  //   //We will need a button to move the data from one day to the next.
  //   //But we will need a camera icon to refresh the entire data in the chart.
  //   //We can do this by the use of props to the charts.
  //   //The button to move the chart by day will thus be internal, but on camera change we will change the prop data.

  // }, [data])

  function groupData(data) {
    console.log("Received this data to group ", data)
    const dataByHour = {};

    data?.instances.forEach((d) => {
      const hour = moment(d.endTimeUtc)
        .startOf("hour")
        .format("HH:mm:ss");

      if (!dataByHour[hour]) {
        dataByHour[hour] = 0;
      }

      dataByHour[hour]++;
    });

    console.log("This is data per hour of the day ", dataByHour);

    setGroupedData(x => [...x, {
      from: data?.from,
      to: data?.to,
      group: dataByHour
    }])
  }

  //The function below should be able to take the param state object and fetch the data required.

  // function getEvents() {
  //   console.log("This is the cameras list ", allCameras)
  //   //Fetching automatically a great number of times, with controlled sequence.
  //   if(allCameras && startDate && endDate && startTime && endTime){

  //     allCameras?.data.map((camera)=>{
  //       setAllDataStore([])
  //       // console.log("This is start date", startDate);
  //       // // console.log("This is end date", endDate)
  //       // // console.log("This is the clone of a moment ", moment().clone());
  //       for(let i=startDate.clone(); moment(i).isBefore(moment(endDate)); moment(i).add(1, 'day')){

  //         let newParams = {...params, from: `${moment(i).format("YYYY/MM/DD")} ${startTime}`,
  //         to: `${moment(i).format("YYYY/MM/DD")} ${endTime}` , cameraId: camera?.id}
  //         console.count("This is camera ", camera?.id)
  //         console.count("This is how many days were fetching for camera above");

  //         // fetch("https://admin-api.3deye.me/v3/events/camera?" +
  //         //     new URLSearchParams(newParams),
  //         //   {
  //         //     headers: {
  //         //       "Content-Type": "application/json",
  //         //       "x-api-key": apiKey,
  //         //       Authorization: `Bearer ${apiToken?.accessToken}`,
  //         //     },
  //         //   }
  //         // )
  //         //   .then((res) => res.json())
  //         //   .then((data) => {
  //         //     let newerParams = {...newParams, noOfPeople: data?.data?.length};
  //         //     console.log("This is newer params ", newerParams)
  //         //     setAllDataStore(x => [...x, {
  //         //       "cameraId": newerParams.cameraId,
  //         //       "from": newerParams.from,
  //         //       "to": newerParams.to,
  //         //       "noOfPeople": newerParams.noOfPeople
  //         //     }])
  //         //   });
  //         //Now fetch for everyday that's listed and add the data to the global array.
  //       }
  //       console.count("This is my camera ", camera)
  //     })
  //   }
  // }

  function getEvents() {
    setData([]);
    //Fetching automatically a great number of times, with controlled sequence.
    if (
      allCameras &&
      startDate &&
      endDate &&
      startTime &&
      endTime &&
      selectedType
    ) {
      setBodyVisible(true);
      console.log("Cameras ", allCameras);
      console.log("dates 1 ", startDate, " 2 ", endDate);
      console.log("Type ", selectedType);
      allCameras?.map((camera) => {
        let allDataStore = [];
        for (
          let i = startDate.clone();
          moment(i).isSameOrBefore(endDate);
          i.add(1, "day")
        ) {
          console.count("Has executed said times ");
          let newParams = {
            ...params,
            from: `${moment(i).format("YYYY/MM/DD")} ${startTime}`,
            to: `${moment(i).format("YYYY/MM/DD")} ${endTime}`,
            cameraId: camera?.id,
            type: selectedType,
          };
          console.log("This is my params ", newParams);
          fetch(
            "https://admin-api.3deye.me/v3/events/camera?" +
              new URLSearchParams(newParams),
            {
              headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                Authorization: `Bearer ${apiToken?.accessToken}`,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              //set all Data Store to contain all the dateRange data for given camera
              allDataStore.push({
                instances: data?.data,
                from: newParams.from,
                to: newParams.to,
              });
            })
            .catch((err) => {
              setBodyVisible(false);
              console.log("There was an error ", err);
            });
          //End of for loop, next day data next or exit
        }
        console.log(
          "Moving from camera ",
          camera?.id,
          " \nData fetched is ",
          allDataStore
        );
        setBodyVisible(false);
        setData((y) => [
          ...y,
          {
            cameraId: camera?.id,
            type: selectedType,
            data: allDataStore,
          },
        ]);
      });
    }
  }

  // function getCustomEvents() {
  //   //Fetching automatically a great number of times, with controlled sequence.

  //   setData([]);
  //   if(selectedCameras && startDate && endDate && startTime && endTime){
  //     setBodyVisible(true)
  //     console.log("This is selected cameras ", selectedCameras);
  //     selectedCameras?.map((camera)=>{
  //       setAllDataStore([])
  //       for(let i=startDate.clone(); i<=endDate; i.add(1, 'day')){

  //         let newParams = {...params, from: `${moment(i).format("YYYY/MM/DD")} ${startTime}`,
  //         to: `${moment(i).format("YYYY/MM/DD")} ${endTime}` , cameraId: camera?.id, type:selectedType}

  //         fetch("https://admin-api.3deye.me/v3/events/camera?" +
  //             new URLSearchParams(newParams),
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               "x-api-key": apiKey,
  //               Authorization: `Bearer ${apiToken?.accessToken}`,
  //             },
  //           }
  //         )
  //           .then((res) => res.json())
  //           .then((data) => {
  //             let newerParams = {...newParams, noOfPeople: data?.data?.length};
  //             console.log("This is Data ", data)
  //             // setAllDataStore(x => [...x, {
  //             //   "cameraId": newerParams.cameraId,
  //             //   "from": newerParams.from,
  //             //   "to": newerParams.to,
  //             //   "noOfPeople": newerParams.noOfPeople
  //             // }])
  //             setData(x => [...x, data]);

  //           })
  //           .catch(
  //             (err)=>{
  //               setBodyVisible(false);
  //               console.log("There was an error ", err)
  //             }
  //           );
  //         //Now fetch for everyday that's listed and add the data to the global array.
  //       }
  //     })
  //     setBodyVisible(false)
  //   }
  // }

  function getCameras() {
    //Fetching automatically a great number of times, with controlled sequence.
    console.log("This is my token ", apiToken?.accessToken);
    fetch("https://admin-api.3deye.me/v3/cameras", {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        Authorization: `Bearer ${apiToken?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data received ", data);
        setAllCameras(data.data);
        setSelectedCameras(data.data);
      });
    //Now fetch for everyday that's listed and add the data to the global array.
  }

  //We call this function either everytime a request is made or we use the refresh toke to ensure tokens are at a minimum.
  async function generateToken() {
    const data = await fetch("https://admin-api.3deye.me/v3/auth/token", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "it@januscontinental.com",
        password: "Hub@123",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("This is the access token data ", data);
        setApiToken(data);
      });
  }

  function handleEventClick(event, index) {
    setIsActiveId(index);
    setSelectedType(event);
    setIsVisible(true);
  }

  function analyzeCamera(selectCam){
      console.log("This is the name of the camera selected ", selectCam);
      const cameraId = selectedCameras.find(camera => camera.name === selectCam);
      console.log("This is camera id ", cameraId.id);
      data.map(cameraData => {
        
        if(cameraData.cameraId=== cameraId.id){
          console.log("So we're looking to analyze data for this camera ", cameraData)
          cameraData.data.map(z => {
            console.log("Passing in this record ", z)
            groupData(z);
          })
        }
      })

  }

  return (
    <div className="font-mono w-full flex">
      {/* Left Panel */}
      <Sider />
      {/* Right Panel */}
      <div className="text-white bg-[#1d1f20]  w-screen px-6 py-4">
        {/* Header component */}
        <Header />

        <button onClick={() => console.log("Global Data ", data)}>
          Check Data
        </button>

        <div className="px-4 flex-col items-center">
          <Row className="my-4 w-full flex justify-between" gutter={24}>
            <Col span={8} className="rounded-xl">
              {!bodyVisible ? (
                <SubType type={"Car"} />
              ) : (
                <ContentLoader
                  animate={true}
                  speed={1}
                  interval={0.5}
                  backgroundColor="black"
                  foregroundColor="gray"
                />
              )}
            </Col>

            <Col span={8} className="rounded-xl">
              {!bodyVisible ? (
                <SubType type={"Person"} />
              ) : (
                <ContentLoader
                  animate={true}
                  speed={1}
                  interval={0.5}
                  backgroundColor="black"
                  foregroundColor="gray"
                />
              )}
            </Col>

            <Col span={8} className="rounded-xl">
              {!bodyVisible ? (
                <SubType type={"Animal"} />
              ) : (
                <ContentLoader
                  animate={true}
                  speed={1}
                  interval={0.5}
                  backgroundColor="black"
                  foregroundColor="gray"
                />
              )}
            </Col>
          </Row>

          {
            data ? 
            <Row className="flex my-4 justify-between w-3/4">
            
            {data &&
              <Select
              className="my-2 flex-col items-center justify-center"
                  style={{ width: "40%" }}
                  placeholder="Select a camera to analyze data"
                  onChange={analyzeCamera}
                  allowClear
              >
                {data.map((item, index) => {
                const camera = selectedCameras.find(p => p.id === item?.cameraId);
                return (
                  <Option key={index} value={camera?.name}>
                    {camera?.name.toLowerCase()}
                  </Option>
                );
              })}
              </Select>
              }
              
          </Row>
          :
          <ContentLoader
                  animate={true}
                  speed={1}
                  interval={0.5}
                  backgroundColor="black"
                  foregroundColor="gray"
                />
          }

          <Row gutter={24} className="my-4 w-full flex justify-evenly">
            <Col span={16} className="rounded-xl bg-[#161616]">
              {groupedData.length > 0 ? (
                <SplineChart data={groupedData}/>
              ) : (
                <ContentLoader
                  animate={true}
                  speed={1}
                  interval={0.5}
                  backgroundColor="black"
                  foregroundColor="gray"
                />
              )}
            </Col>
            <Col span={7} className="rounded-xl bg-[#161616]">
              <div className="flex items-center justify-center py-4">
                <p className="text-white font-mono text-xl font-semibold">
                  Select Event Type
                </p>
              </div>
              <div className="flex-col px-2">
                {/* Divided into three parts */}
                <div className="flex-col text-white font-mono">
                  {!bodyVisible ? (
                    events.map((event, index) => (
                      <div
                        key={index}
                        className="flex w-full my-1 justify-center"
                      >
                        <button
                          onClick={() => {
                            handleEventClick(event, index);
                          }}
                          className={`w-40 bg-gradient-to-r ${
                            isActiveId === index
                              ? " from-gray-800 to-yellow-900 text-white "
                              : ""
                          } active:text-black hover:to-white  hover:text-black hover:from-gray-800 text-base text-gray-500 font-bold py-2 px-4 rounded`}
                        >
                          {event}
                        </button>
                      </div>
                    ))
                  ) : (
                    <ContentLoader
                      animate={true}
                      speed={1}
                      interval={0.5}
                      backgroundColor="black"
                      foregroundColor="gray"
                    />
                  )}
                </div>
              </div>
            </Col>
          </Row>

          {/* Modals can appear anywhere in the page because their default flex is 1 */}
          {/* <Modal
        style={{
          backgroundColor: 'red'
        }}
        open={isVisible} onOk={()=>setIsVisible(false)} onCancel={()=>setIsVisible(false)}>
          <p style={{backgroundColor: 'red'}}>This is where we fetch values</p>
        </Modal> 
        
        
        */}
          {/* <!-- Modal --> */}

          <Modal isOpen={isVisible}>
            <h1 className="mb-4 text-2xl font-bold">Choose request params</h1>
            <div className="flex flex-col justify-center items-center">
              <p>Choose date Range</p>
              <RangePicker
                className="my-2"
                style={{ width: "80%" }}
                disabledDate={(date) => {
                  if (date > moment()) return date;
                }}
                onChange={(e) => {
                  if (e) {
                    setStartDate(moment(e[0].$d));
                    setEndDate(moment(e[1].$d));
                  }
                }}
              />

              <p className="mt-2">Choose time range</p>
              <p>(for days selected)</p>
              <TimePicker.RangePicker
                className="my-2"
                style={{ width: "80%" }}
                onOk={(e) => {
                  if (e) {
                    setStartTime(moment(e[0].$d).format("HH:mm"));
                    setEndTime(moment(e[1].$d).format("HH:mm"));
                  }
                }}
              />

              {/* <p>S</p>
          <TimePicker.RangePicker
          onChange={(e)=>{
            setStartTime(moment(e[0].$d).format("HH:mm"));
            setEndTime(moment(e[1].$d).format("HH:mm"))
            console.log("Selected time")
          }}
          />
           */}
              <Switch
                className="my-4"
                style={{
                  width: "80%",
                  backgroundColor: switchBackground,
                  fontWeight: "bold",
                }}
                unCheckedChildren={<p>Fetch Data for all Cameras</p>}
                checkedChildren={<p>Fetch data for individual Cameras</p>}
                onChange={(change) => {
                  console.log(change);
                  change
                    ? (() => {
                        setSwitchBackground("#1976d2");
                        setCameraVisible(true);
                      })()
                    : (() => {
                        setSwitchBackground("#111827");
                        setCameraVisible(false);
                        setAllCameras(selectedCameras);
                      })();
                }}
              />

              {cameraVisible && (
                <Select
                  placeholder={"select Cameras"}
                  mode="multiple"
                  className="my-2 flex-col items-center justify-center"
                  //  options={[1, 2, 3, 4, 5]}
                  // className="w-28 flex items-center justify-center text-black"
                  style={{ width: "70%" }}
                  initialvalue="Select a camera"
                  onChange={(data) => {
                    setAllCameras([]);
                    console.log("Selected value ", data);
                    data.map((x) => {
                      setAllCameras((y) => [
                        ...y,
                        {
                          id: x,
                        },
                      ]);
                    });
                  }}
                >
                  {selectedCameras &&
                    selectedCameras.map((item, index) => (
                      <Option
                        className="flex flex-col items-center justify-center text-black"
                        value={item?.id}
                        key={index}
                      >
                        {item?.name}
                      </Option>
                    ))}
                </Select>
              )}
            </div>
            <div className="flex-col items-center justify-center ">
              <div className="flex items-center justify-center my-2">
                <button
                  className="px-4 py-2  text-white bg-emerald-500 rounded-lg hover:bg-emerald-600"
                  onClick={() => {
                    setBodyVisible(false);
                    setIsVisible(false);
                    getEvents();
                  }}
                >
                  Fetch Events
                </button>
              </div>
              <div className="flex items-center justify-center ">
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  onClick={() => setIsVisible(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>

          <Row className="my-4 w-full flex justify-between" gutter={24}>
            <Col
              span={8}
              className="rounded-xl flex-col items-center justify-center"
            >
              {!bodyVisible ? (
                <Row>
                  <Col className="rounded-xl bg-[#161616]">
                    <PieChart data={groupedData}/>
                  </Col>
                  {/* <Col span={4}>
            <p>Other !bodyVisible appears here</p>
            </Col> */}
                </Row>
              ) : (
                <ContentLoader
                  animate={true}
                  speed={1}
                  interval={0.5}
                  backgroundColor="black"
                  foregroundColor="gray"
                />
              )}
            </Col>

            <Col span={16} className="rounded-xl bg-[#161616]">
              {!bodyVisible ? (
                <LineChart data={groupedData} />
              ) : (
                <ContentLoader
                  animate={true}
                  speed={1}
                  interval={0.5}
                  backgroundColor="black"
                  foregroundColor="gray"
                />
              )}
            </Col>

            {/* <Col span={8} className="rounded-xl">
          {data ? <SubType type={'Animal'}/>
          :
          <ContentLoader animate={true} speed={1}
          interval={0.5} backgroundColor="black" foregroundColor="gray"/>}
          </Col> */}
          </Row>

          {/* <div>
        <ContentLoader animate={true} speed={1}
          interval={0.1} backgroundColor="black" foregroundColor="gray">
          <rect x="0" y="0" rx="3" ry="3" width="180" height="10" />
          <rect x="0" y="20" rx="3" ry="3" width="150" height="10" />
          <rect x="0" y="40" rx="3" ry="3" width="140" height="10" />
        </ContentLoader>
        </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;

import axios from 'axios';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './UserVideoComponent';
import endcall from '../../assets/images/endcall.png';
import guide1 from '../../assets/images/vchatguide1.png';
import guide2 from '../../assets/images/vchatguide2.png';
import guide3 from '../../assets/images/vchatguide3.png';

import styled from "styled-components";


const OPENVIDU_SERVER_URL = `${process.env.REACT_APP_VCHAT_SEVER}` ;
const OPENVIDU_SERVER_SECRET = `${process.env.REACT_APP_VCHAT_SECRET}`;

class VideoChatConnect extends Component {
    constructor(props) {
        super(props);
        /* console.log(window.location.href) */
        const href = window.location.href;
        let roomId = []
        roomId = href.split('vchat/');        
        console.log(roomId[1]);

        this.state = {
            mySessionId: `${roomId[1]}`,
            myUserName: 'Participant' + Math.floor(Math.random() * 1000), //내 닉네임
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscribers: [],
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    handleMainVideoStream(stream) {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

    deleteSubscriber(streamManager) {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    }

    joinSession() {
        // --- 1) Get an OpenVidu object ---

        this.OV = new OpenVidu();

        // --- 2) Init a session ---

        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;

                // --- 3) Specify the actions when events take place in the session ---

                // On every new Stream received...
                mySession.on('streamCreated', (event) => {
                    // Subscribe to the Stream to receive it. Second parameter is undefined
                    // so OpenVidu doesn't create an HTML video by its own
                    var subscriber = mySession.subscribe(event.stream, undefined);
                    var subscribers = this.state.subscribers;
                    subscribers.push(subscriber);

                    // Update the state with the new subscribers
                    this.setState({
                        subscribers: subscribers,
                    });
                });

                // On every Stream destroyed...
                mySession.on('streamDestroyed', (event) => {

                    // Remove the stream from 'subscribers' array
                    this.deleteSubscriber(event.stream.streamManager);
                });

                // On every asynchronous exception...
                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });

                // --- 4) Connect to the session with a valid user token ---

                // 'getToken' method is simulating what your server-side should do.
                // 'token' parameter should be retrieved and returned by your own backend
                this.getToken().then((token) => {
                    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
                    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                    mySession
                        .connect(
                            token,
                            { clientData: this.state.myUserName },
                        )
                        .then(async () => {
                            var devices = await this.OV.getDevices();
                            var videoDevices = devices.filter(device => device.kind === 'videoinput');

                            // --- 5) Get your own camera stream ---

                            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                            // element: we will manage it on our own) and with the desired properties
                            let publisher = this.OV.initPublisher(undefined, {
                                audioSource: undefined, // The source of audio. If undefined default microphone
                                videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                                resolution: '640x480', // The resolution of your video
                                frameRate: 30, // The frame rate of your video
                                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                mirror: false, // Whether to mirror your local video or not
                            });

                            // --- 6) Publish your stream ---

                            mySession.publish(publisher);

                            // Set the main video in the page to display our webcam and store our Publisher
                            this.setState({
                                currentVideoDevice: videoDevices[0],
                                mainStreamManager: publisher,
                                publisher: publisher,
                            });
                        })
                        .catch((error) => {
                            console.log('There was an error connecting to the session:', error.code, error.message);
                        });
                });
            },
        );
    }

    leaveSession() {

        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 1000),
            mainStreamManager: undefined,
            publisher: undefined
        });

        window.location.reload()
    }

    async switchCamera() {
        try{
            const devices = await this.OV.getDevices()
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if(videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0){
                    // Creating a new publisher with specific videoSource
                    // In mobile devices the default and first camera is the front one
                    var newPublisher = this.OV.initPublisher(undefined, {
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: true,
                        publishVideo: true,
                        mirror: true
                    });

                    //newPublisher.once("accessAllowed", () => {
                    await this.state.session.unpublish(this.state.mainStreamManager)

                    await this.state.session.publish(newPublisher)
                    this.setState({
                        currentVideoDevice: newVideoDevice,
                        mainStreamManager: newPublisher,
                        publisher: newPublisher,
                    });
                }
            }
          } catch (e) {
            console.error(e);
          }
    }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;
        return (
            <div className="container">
                {this.state.session === undefined ? (
                    <div id="join">
                        {/* <div id="img-div">
                            <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
                        </div> */}
                        <VchatContainer>
                            <VchatHeaderButtonSet>
                            <form className="form-group" onSubmit={this.joinSession}>
                                <p>
                                    {/* <label>Participant(닉네임): </label> */}
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="userName"
                                        value={myUserName}
                                        onChange={this.handleChangeUserName}
                                        required
                                        style={{ display: "none" }}
                                    />
                                </p>
                                <p>
                                    {/* <label> Session(RoomID): </label> */}
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="sessionId"
                                        value={mySessionId}
                                        onChange={this.handleChangeSessionId}
                                        required
                                        style={{ display: "none" }}
                                    />
                                </p>
                                
                                <p className="text-center">
                                    <JoinButton className="btn btn-lg btn-success" name="commit" type="submit" value="통화하기" ></JoinButton>
                                </p>
                            </form>
                            <BackLink to= '/chat/' className="links"><p>뒤로가기</p></BackLink>
                            </VchatHeaderButtonSet>
                            <VChatGuide>
                                <h2 style={{marginLeft:'35px'}}>1. 권한을 허용 해 주세요</h2>
                                <Guide1Img src={guide1}></Guide1Img>
                                <h2 style={{marginLeft:'25px'}}>2. 허용창이 뜨지 않는다면?</h2>
                                <Guide2Img src={guide2}></Guide2Img>
                                <h4 style={{marginLeft:'70px'}}>1. 자물쇠 모양을 눌러</h4>
                                <h4 style={{marginLeft:'35px',marginTop:'-5px'}}>2. 사이트 설정으로 이동해 주세요.</h4>
                                <Guide3Img src={guide3}></Guide3Img>
                                <h4>3. 카메라와 마이크를 허용으로 변경 해 주세요.</h4>
                                
                            </VChatGuide>
                        </VchatContainer>
                        
                    </div>
                    
                ) : null}

                {this.state.session !== undefined ? (
                    <div id="session">

                        <SessionHeader>
                            {/* <h1>{mySessionId}</h1> */}
{/*                             <SessionExit
                                className="btn btn-large btn-danger"
                                type="button"
                                id="buttonLeaveSession"
                                onClick={this.leaveSession}
                                value="채팅방 나가기"
                            /> */}
                            <div>
                                <SessionExit value="Leave session" onClick={this.leaveSession}>
                                통화 종료
                                <EndcallImg src={endcall} />
                                </SessionExit>
                                
                            </div>
                        </SessionHeader>

                        {/* 메인 캠 */}
                        {/* {this.state.mainStreamManager !== undefined ? (
                            <div id="main-video" className="col-md-6">
                                <UserVideoComponent streamManager={this.state.mainStreamManager} />
                                <input
                                    className="btn btn-large btn-success"
                                    type="button"
                                    id="buttonSwitchCamera"
                                    onClick={this.switchCamera}
                                    value="Switch Camera"
                                />
                            </div>
                        ) : null} */}

                       
                        <VideoContainer>

                         {/* 나의 캠 */}
                        <MyCamDiv>
                            {this.state.publisher !== undefined ? (
                                <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                                    <UserVideoComponent
                                        streamManager={this.state.publisher} />
                                </div>
                            ) : null}
                        </MyCamDiv>

                        {/* 상대 캠 */}
                        <OtherCamDiv>
                            {this.state.subscribers.map((sub, i) => (
                                <div key={i} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                                    <UserVideoComponent streamManager={sub} />
                                </div>
                            ))}
                        </OtherCamDiv>
                        </VideoContainer>
                        
                    </div>
                ) : null}

                                

            </div>
        );
    }

    /**
     * --------------------------
     * SERVER-SIDE RESPONSIBILITY
     * --------------------------
     * These methods retrieve the mandatory user token from OpenVidu Server.
     * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
     * the API REST, openvidu-java-client or openvidu-node-client):
     *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
     *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
     *   3) The Connection.token must be consumed in Session.connect() method
     */

    getToken() {
        return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
    }

    createSession(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ customSessionId: sessionId });
            axios
                .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('CREATE SESION', response);
                    resolve(response.data.id);
                })
                .catch((response) => {
                    var error = Object.assign({}, response);
                    if (error?.response?.status === 409) {
                        resolve(sessionId);
                    } else {
                        console.log(error);
                        console.warn(
                            'No connection to OpenVidu Server. This may be a certificate error at ' +
                            OPENVIDU_SERVER_URL,
                        );
                        if (
                            window.confirm(
                                'No connection to OpenVidu Server. This may be a certificate error at "' +
                                OPENVIDU_SERVER_URL +
                                '"\n\nClick OK to navigate and accept it. ' +
                                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                OPENVIDU_SERVER_URL +
                                '"',
                            )
                        ) {
                            window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                        }
                    }
                });
        });
    }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            var data = {};
            axios
                .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('TOKEN', response);
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }
}

export default VideoChatConnect;

const SessionHeader = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const VchatContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const VchatHeaderButtonSet = styled.div`
`
const VChatGuide = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
    margin-top: 25px;
    margin-left: 64px;
`
const Guide1Img = styled.img`
    display: flex;
    justify-content: center;

`
const Guide2Img = styled.img`
display: flex;
justify-content: center;

`
const Guide3Img = styled.img`
display: flex;
justify-content: center;

`

const SessionExit = styled.button`
    float: right;
    margin-top: 5px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    flex-direction: row;

    border: 2px solid #6e96ee;
    background-color: white;
    border-radius: 10px;
    font-weight: 600;
    font-size: 12px;
    height: 25px;
    :hover{
    border: none;
    background-color: #4097df;
    color:white;
  }
`


const VideoContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

const MyCamDiv = styled.div`
/*     width: 370px;
    height: 250px; */
`

const OtherCamDiv = styled.div`
margin-top: 10px;
/*     width: 370px;
    height: 250px; */
`

const EndcallImg = styled.img`
    margin-left: 2px;
    width: 15px;
    height: 15px;
`

const JoinButton = styled.input`
    float: right;
    margin-top: 5px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    flex-direction: row;

    border: 2px solid #6e96ee;
    background-color: white;
    border-radius: 10px;
    font-weight: 600;
    font-size: 12px;
    height: 28px;
    width: 100px;
    :hover{
    border: none;
    background-color: #4097df;
    color:white;
  }
  cursor:pointer
`

const BackLink = styled(Link)`
    align-items: center;
    text-decoration-line: none;
    float: left;
    margin-top: 5px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    color: inherit;

    border: 2px solid #6e96ee;
    background-color: white;
    border-radius: 10px;
    font-weight: 600;
    font-size: 12px;
    height: 25px;
    width: 100px;
    :hover{
    border: none;
    background-color: #4097df;
    color:white;
  }
`
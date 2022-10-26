import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';
import styled from "styled-components";

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render() {
        return (
            <CamDiv>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        {/* <div><p>{this.getNicknameTag()}</p></div> */}
                    </div>
                ) : null}
            </CamDiv>
        );
    }
    
}
const CamDiv = styled.div`
    width: 370px;
    height: 300px;
`
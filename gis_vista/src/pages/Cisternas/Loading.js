import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import animationData from '../../assets/img/washing-hands.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const Overlay = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    background-color: rgba(0,0,0,0.2);
`;

const Loading = ({ show = false }) => {
    return show ?
        <Overlay className="d-flex justify-content-center align-items-center">
            <Lottie
                options={defaultOptions}
                height={400}
                width={400}
            />
        </Overlay> : null;
}

export default Loading;
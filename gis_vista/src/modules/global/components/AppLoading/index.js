import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../../assets/img/app-loading.json';
import styled from 'styled-components';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const AppLoading = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Lottie
                options={defaultOptions}
                height={400}
                width={400}
            />
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
`;

export default AppLoading;
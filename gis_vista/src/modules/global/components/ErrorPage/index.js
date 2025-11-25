import React from 'react';
import styled from 'styled-components';
import ErrorSvg from '../../../../assets/img/error.svg';

const titulo = '!Un error ocurrió!';

const ErrorPage = ({ error }) => {
    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Sign className="d-flex">
                <Image src={ErrorSvg}></Image>
                <SignInfo className="d-flex flex-column">
                    <h1 className="font-weight-bold text-danger">{titulo}</h1>
                    <h2 className="text-underline mb-4">Detalle:</h2>
                    <h4>{error.message}</h4>
                </SignInfo>
            </Sign>
        </Container>
    );
};

const Sign = styled.div`    
    padding: 30px;
    height: 380px;
    width: 780px;
`;

const SignInfo = styled.div`    
    padding: 20px 10px 5px 10px;    
    flex: 1;
`;

const Container = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
`;

const Image = styled.img`
    height: 100%;
    margin-right: 20px;
`;

export default ErrorPage;
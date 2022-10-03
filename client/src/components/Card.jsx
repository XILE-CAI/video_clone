import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
    width: ${(props) => props.type !== "sm" && "360px"};
    margin-bottom: ${(props) => props.type === "sm"? "10px":"45px"};
    display: ${(props) => props.type === "sm" && "flex"};
    cursor: pointer;
    gap: 10px;
`;

const Image = styled.img`
    width: 100%;
    height: ${(props) => props.type === "sm"? "120px" : "202px"};
    background-color: #999;
    flex: 1;
`;

//include avatar and details
const Details = styled.div`
    display: flex;
    margin: ${(props) => props.type === "sm"? "0px" : "16px"};
    gap: 12px;
    flex:1;
`;

const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    display:${(props) => props.type === "sm" && "none"};

`;

//include title channel name and other information
const Texts = styled.div``;

const Title = styled.h1`
    font-size:16px;
    font-weight: 500;
    color:${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
    margin: 9px 0px;
`;

const Info = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
`;


const Card = ({type}) => {
  return (
    <Link to="/video/test" style={{textDecoration:"none"}}>
        <Container type={type}>
            <Image type={type} src="https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault.webp?v=6277c159&sqp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA"/>
            <Details type={type}>
                <ChannelImage type={type} src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo"/>
                <Texts>
                    <Title>Test video</Title>
                    <ChannelName>Lama Dev</ChannelName>
                    <Info>660,908 views • 1 day ago</Info>
                </Texts>
            </Details>
        </Container>
    </Link>
  )
}

export default Card
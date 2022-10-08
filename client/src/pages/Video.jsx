import React from 'react'
import styled from 'styled-components'
import Comments from '../components/Comments';

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";

import Card from '../components/Card';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice"; 
import axios from 'axios';

const Container = styled.div`
    display: flex;
    gap:24px;
`;

const Content = styled.div`
    flex:5;
`;

const VideoWrapper = styled.div`

`;

const Title =styled.h1`
    font-size: 18px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Info = styled.span`
    color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
   display: flex;
   gap: 20px;
   color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
`;

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Subscribe = styled.button`
    background-color: red;
    color: white;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
`

const ChannelInfo = styled.div`
    display: flex;
    gap:20px;
`;

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const ChannelDetail = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
    font-weight: 500;
`;

const ChannelCounter = styled.span`
    margin-top:5px;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.textSoft};
    font-size: 12px;
`;

const Description = styled.p`
    font-size: 14px;
`;

const Recommendation = styled.div`
    flex:2;
`;

const VideoFrame = styled.video`
    max-height: 720px;
    width: 100%;
    object-fit: cover;
`;

const Video = () => {
    const {currentUser} = useSelector((state) => state.user)
    const {currentVideo} = useSelector((state) => state.video)
    const dispatch = useDispatch();

    //video id
    const path = useLocation().pathname.split("/")[2];

  
    const [channel, setChannel] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoRes = await axios.get(`/videos/find/${path}`)
                const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)

             
                setChannel(channelRes.data)
                dispatch(fetchSuccess(videoRes.data))
            } catch (err) {
                
            }
            fetchData()
        }
    },[path,dispatch])

    const handleSub = async () => {
        currentUser.subscribedUsers.includes(channel._id)
        ? await axios.put(`/users/unsub/${channel._id}`)
        : await axios.put(`/users/sub/${channel._id}`);
        dispatch(subscription(channel._id))
    }

  return (
    <Container>
        <Content>
            <VideoWrapper>
             <iframe
                width="100%"
                height="720"
                
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
            </VideoWrapper>

            <Title>Tube</Title>

            <Details>
                <Info>1 views • Jun 22, 2022</Info>
                
                <Buttons>
                    <Button>
                        <ThumbUpOutlinedIcon /> 123
                    </Button>
                    <Button>
                        <ThumbDownOffAltOutlinedIcon /> Dislike
                    </Button>
                    <Button>
                        <ReplyOutlinedIcon /> Share
                    </Button>
                    <Button>
                        <AddTaskOutlinedIcon /> Save
                    </Button>
                </Buttons>
            </Details>

            <Hr />

            <Channel>
                <ChannelInfo>
                    <Image src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
                    <ChannelDetail>
                        <ChannelName>Lama Dev</ChannelName>
                        <ChannelCounter>200K subscribers</ChannelCounter>
                        <Description>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Doloribus laborum delectus unde quaerat dolore culpa sit aliquam
                            at. Vitae facere ipsum totam ratione exercitationem. Suscipit
                            animi accusantium dolores ipsam ut.
                        </Description>
                    </ChannelDetail>
                </ChannelInfo>
                <Subscribe onClick={handleSub}>
                    {currentUser.subscribedUsers?.includes(channel._id)
                    ?"SUBSCRIBED"
                    :"SUBSCRIBE"}
                </Subscribe>
            </Channel>

            <Hr/>
            <Comments/>
        </Content>
        {/* <Recommendation>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
        </Recommendation> */}
    </Container>
  )
}

export default Video;
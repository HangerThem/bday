"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import confetti from "canvas-confetti";

const Container = styled.div`
  font-family: "Arial", sans-serif;
  line-height: 1.5;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 20px auto;
`;

const Title = styled.h2`
  color: #eee;
  font-size: 50px;
  text-align: center;
`;

const InfoText = styled.p`
  color: #fff;
  font-size: 16px;
  margin: 5px 0;
`;

const PublicIP = styled.p`
  color: #fff;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

export default function Page() {
  const [flattenedInfo, setFlattenedInfo] = useState<string[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  const [displayedInfoCount, setDisplayedInfoCount] = useState(0);

  useEffect(() => {
    (async () => {
      let publicIP = "";
      await fetch("https://api.ipify.org?format=json")
        .then((res) => res.json())
        .then((data) => {
          publicIP = data.ip;
        });

      await fetch("/api/v1/network-info")
        .then((res) => res.json())
        .then((data) => {
          const flattened: string[] = [];
          flattened.push(`Public IP: ${publicIP}`);
          Object.entries(data).forEach(
            ([interfaceName, details]: [string, any]) => {
              details.forEach((detail: any) => {
                flattened.push(
                  `Interface: ${interfaceName}, IP: ${detail.address}`
                );
                flattened.push(
                  `Interface: ${interfaceName}, MAC: ${detail.mac}`
                );
                flattened.push(
                  `Interface: ${interfaceName}, CIDR: ${detail.cidr}`
                );
              });
            }
          );
          setFlattenedInfo(flattened);
          setShowInfo(true);
        });
    })();
  }, []);

  useEffect(() => {
    if (!showInfo) return;

    const intervalId = setInterval(() => {
      setDisplayedInfoCount((prevCount) => {
        if (prevCount >= flattenedInfo.length) {
          clearInterval(intervalId);
          return prevCount;
        }
        return prevCount + 1;
      });
    }, 750);

    return () => clearInterval(intervalId);
  }, [showInfo, flattenedInfo.length]);

  useEffect(() => {
    confetti({
      particleCount: 250,
      spread: 180,
      origin: { y: 0.6 },
      shapes: ["square", "star"],
      startVelocity: 80,
      scalar: 0.8,
      decay: 0.9,
    });
  }, []);

  const renderNetworkInfo = () => {
    return (
      <div>
        {flattenedInfo.slice(0, displayedInfoCount).map((info, index) => (
          <InfoText key={index}>{info}</InfoText>
        ))}
      </div>
    );
  };

  return (
    <Container>
      <Title>Happy birthday bro!</Title>
      {renderNetworkInfo()}
    </Container>
  );
}

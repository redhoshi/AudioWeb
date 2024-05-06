import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, CardHeader, CardBody, CardFooter, Center, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import { color } from 'framer-motion';
import { IconName } from "react-icons/md";
import { MdGraphicEq } from "react-icons/md";
import { CgPlayButtonO, CgPlayStopO } from "react-icons/cg";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { size } from 'mathjs';

const WaveformVisualizer = () => {
  const [frequency, setFrequency] = useState(440);
  const [amplitude, setAmplitude] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);

  const canvasRef = useRef(null);
  const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    const drawWaveform = () => {
      context.clearRect(0, 0, width, height);
      context.beginPath();
      for (let i = 0; i < width; i++) {
        const x = i;
        const y = centerY + amplitude * Math.sin(2 * Math.PI * frequency * i / width);
        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }
      context.strokeStyle = '#000';
      context.stroke();
    };

    drawWaveform();

    return () => {
      context.clearRect(0, 0, width, height);
    };
  }, [frequency, amplitude]);

  useEffect(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    }
  }, [frequency]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(amplitude / 100, audioContextRef.current.currentTime);
    }
  }, [amplitude]);

  const handleFrequencyChange = (event) => {
    setFrequency(parseInt(event.target.value));
  };

  const handleAmplitudeChange = (event) => {
    setAmplitude(parseInt(event.target.value));
  };

  const togglePlay = () => {
    if (!isPlaying) {
      oscillatorRef.current = audioContextRef.current.createOscillator();
      oscillatorRef.current.type = 'sine'; // サイン波
      oscillatorRef.current.frequency.value = frequency;

      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = amplitude / 100;

      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);

      oscillatorRef.current.start();
    } else {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }
    setIsPlaying(!isPlaying);
  };

  const codeString =
    `  oscillatorRef.current = audioContextRef.current.createOscillator();
  oscillatorRef.current.type = "sine"; // サイン波
  oscillatorRef.current.frequency.value = frequency;

  gainNodeRef.current = audioContextRef.current.createGain();
  gainNodeRef.current.gain.value = amplitude / 100;

  oscillatorRef.current.connect(gainNodeRef.current);
  gainNodeRef.current.connect(audioContextRef.current.destination);

  oscillatorRef.current.start() `;

  return (

    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginBlockStart: '20px', marginBlockEnd: '20px', marginLeft: '20px', marginRight: '20px' }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: "40px" }}>Sin Wave</h1>
        <Card>
          <CardBody>
            <Center>
              <canvas ref={canvasRef} width={400} height={200} style={{ border: '1px solid black' }} />
            </Center>
          </CardBody>
        </Card>
        <button onClick={togglePlay}>{isPlaying ? <CgPlayStopO size="3rem" /> : <CgPlayButtonO size="3rem" />}</button>
      </div>
      <div style={{ flex: 1, marginLeft: '20px' }}>
        <div>
          <label htmlFor="frequency">Frequency:</label>
          <span>{frequency} Hz</span>
          <Slider min={0} max={2000} step={30} aria-label='slider-ex-5' value={frequency} onChange={(val) => setFrequency(val)} focusThumbOnChange={false} >
            <SliderTrack bg='red.100'>
              <SliderFilledTrack bg='tomato' />
            </SliderTrack>
            <SliderThumb boxSize={6}>
              <Box color='tomato' as={MdGraphicEq} />
            </SliderThumb>
          </Slider>
        </div>
        <div>
          <label htmlFor="amplitude">Amplitude:</label>
          <span>{amplitude}dB</span>
          <Slider min={10} max={100} aria-label='slider-ex-5' value={amplitude} onChange={(val) => setAmplitude(val)} focusThumbOnChange={false} >
            <SliderTrack bg='red.100'>
              <SliderFilledTrack bg='tomato' />
            </SliderTrack>
            <SliderThumb boxSize={6}>
              <Box color='tomato' as={MdGraphicEq} />
            </SliderThumb>
          </Slider>
        </div>
        <div>
          <SyntaxHighlighter language="javascript" style={dark} customStyle={{ fontSize: '10px' }} >
            {codeString}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default WaveformVisualizer;

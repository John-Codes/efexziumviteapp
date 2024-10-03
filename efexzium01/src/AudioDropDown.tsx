import React, { useState, useRef, useEffect } from 'react';
import { Mic, StopCircle, Upload, X } from 'lucide-react';

const AudioDropdown = ({ onAudioSelected }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setFileName('Recorded Audio');
        onAudioSelected(audioBlob, 'Recorded Audio');
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setAudioURL(URL.createObjectURL(file));
      onAudioSelected(file, file.name);
    }
  };

  const clearAudio = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
    setAudioURL(null);
    setFileName(null);
    onAudioSelected(null, null);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 text-white hover:text-blue-300 focus:outline-none"
      >
        <Mic size={20} />
      </button>
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-48 bg-gray-800 rounded-md shadow-lg overflow-hidden">
          {!audioURL && !isRecording && (
            <>
              <button
                onClick={startRecording}
                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center"
              >
                <Mic size={16} className="mr-2" /> Record Audio
              </button>
              <button
                onClick={() => fileInputRef.current.click()}
                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center"
              >
                <Upload size={16} className="mr-2" /> Upload Audio File
              </button>
            </>
          )}
          {isRecording && (
            <button
              onClick={stopRecording}
              className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center"
            >
              <StopCircle size={16} className="mr-2" /> Stop Recording
            </button>
          )}
          {audioURL && (
            <div className="p-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm truncate">{fileName}</span>
                <button onClick={clearAudio} className="text-white hover:text-red-500">
                  <X size={16} />
                </button>
              </div>
              <audio src={audioURL} controls className="w-full" />
            </div>
          )}
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="audio/*"
        className="hidden"
      />
    </div>
  );
};

export default AudioDropdown;
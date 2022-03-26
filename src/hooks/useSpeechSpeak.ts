/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const useSpeechSpeak = () => {
  const { speak, speaking } = useSpeechSynthesis();

  return useCallback((_text: string) => {
    if (speaking === false) {
      speak({ text: _text });
    }
  }, [speak, speaking]);
};

export default useSpeechSpeak;

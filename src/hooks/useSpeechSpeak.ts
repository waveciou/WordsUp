import { useCallback } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const useSpeechSpeak = () => {
  const { speak, speaking } = useSpeechSynthesis();

  return useCallback(
    (text: string) => {
      if (speaking === false) {
        speak({
          text,
          voices: {
            default: true,
            lang: 'en',
            localService: true,
            name: 'Karen',
            voiceURI: 'Karen',
          },
        });
      }
    },
    [speak, speaking]
  );
};

export default useSpeechSpeak;

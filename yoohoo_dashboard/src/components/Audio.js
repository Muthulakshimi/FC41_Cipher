import React from "react";
import mp3 from "../audios/alertAudio.mp3";

export const Audio = () => {
    return (
        <div>
            <audio src={mp3} controls autoPlay />
        </div>
    );
};

import React from "react";

export const Audio = () => {
    return (
        <div>
            <audio
                hidden
                src={
                    "https://cdn.pixabay.com/download/audio/2022/02/23/audio_c75a95568e.mp3?filename=police-siren-21498.mp3"
                }
                controls
                autoPlay
            />
        </div>
    );
};

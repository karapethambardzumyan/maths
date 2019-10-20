const audios = {};
let audioType = null;

export const setAudioType = type => {
    audioType = type;
};

export const getAudioType = () => {
    return audioType;
};

export const addAudio = (key, scene) => {
    audios[key] = scene.sound.add(key, { loop: false });
};

export const playAudio = key => {
    audios[key].play();
};

export const stopAudio = key => {
    audios[key].stop();
};

export const stopAllAudios = () => {
    for (const i in audios) {
        if (audios.hasOwnProperty(i)) {
            audios[i].stop();
        }
    }
};

const audios = {};
let audioType = null;

export const setAudioType = type => {
    audioType = type;
};

export const getAudioType = () => {
    return audioType;
};

export const addAudio = (key, scene, loop) => {
    audios[key] = scene.sound.add(key, { loop });
};

export const getAudio = key => {
    return audios[key];
};

export const stopAllAudios = () => {
    for (const i in audios) {
        if (audios.hasOwnProperty(i)) {
            audios[i].stop();
        }
    }
};

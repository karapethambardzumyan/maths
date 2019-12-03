const audios = {};
let audioType = null;

export const setAudioType = (type, audioKey) => {
    audioType = type;

    if (audioType === 0 || audioType === 1) {
        for (const i in audios) {
            if (audios[i].type === 'music') {
                audios[i].audio.stop();
            }
        }
    } else {
        audios[audioKey].audio.play();
    }
};

export const getAudioType = () => {
    return audioType;
};

export const addAudio = (key, scene, loop, type) => {
    audios[key] = {
        type,
        audio: scene.sound.add(key, { loop })
    };
};

export const playAudio = key => {
    if (audios[key].type === 'music') {
        for (const i in audios) {
            if (audios[i].type === 'music') {
                audios[i].audio.stop();
            }
        }
    }

    if (
        audioType === 2 ||
        audioType === 1 && audios[key].type !== 'music'
    ) {
        audios[key].audio.play();
    }
};

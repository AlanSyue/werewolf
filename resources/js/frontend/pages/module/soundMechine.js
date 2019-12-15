const playSound =function(fileName) {
    return new Promise(function(resolve, reject) {
        // return a promise
        var audio = new Audio(); // create audio wo/ src
        audio.preload = "auto"; // intend to play through
        audio.autoplay = true; // autoplay when loaded
        audio.onerror = reject; // on error, reject
        audio.onended = resolve; // when done, resolve

        audio.src = `sounds/${fileName}.mp3`;
    });
};

export default playSound;
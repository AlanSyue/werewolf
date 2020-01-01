const soundMechine = {
    queue: [],
    clear: function(){
        this.queue = [];
        return this;
    },
    playByData: function(soundData) {
        soundData.forEach(row => {
            let {method, param} = row;
            switch (method) {
                case 'addSound':
                    this.addSound(param);
                    break;
                case 'delay':
                    this.delay(param);
                    break;
                default:
                    break;
            }
        });
        if(this.queue.length > 0){
            this.play();
        }
    },
    addSound: function(fileName) {
        let func = () => {
            return new Promise(function(resolve, reject){
                var audio = new Audio(); // create audio wo/ src
                audio.preload = "auto"; // intend to play through
                audio.autoplay = true; // autoplay when loaded
                audio.onerror = reject; // on error, reject
                audio.onended = resolve; // when done, resolve
                audio.src = `sounds/${fileName}.mp3`;
            });
        };
        this.queue.push(func)
        return this;
    },
    delay: function(seconds) {
        let func = () => {
            return new Promise(function(resolve, reject){
                setTimeout(() => {
                    resolve();
                }, seconds * 1000)
            });
        };
        this.queue.push(func)
        return this;
    },
    play: function(){
        if(this.queue.length == 0 ){
            return ;
        }
        let firstFunc = this.queue.shift();
        let promise = firstFunc();
        while(this.queue.length != 0){
            let func = this.queue.shift();
            promise = promise.then(func);
        }
        return this;
    },
    playSingleSound: function(fileName){
        this.clear().addSound(fileName).play();
        return this;
    }
};

export default soundMechine;

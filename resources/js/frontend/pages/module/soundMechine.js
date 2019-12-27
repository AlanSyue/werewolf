/**
 * 可使用音黨名稱：
    * 天黑請閉眼
    * 狼人現身請睜眼，狼人請殺人
    * 狼人請閉眼
    * 女巫請睜眼，他被殺死了，你要救他嗎，你要使用毒藥嗎
    * 女巫請閉眼
    * 預言家請睜眼，你要查驗的對象是
    * 預言家請閉眼
    * 天亮請睜眼
    * 昨晚被淘汰的是這些玩家
 */
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

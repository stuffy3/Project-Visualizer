class Microphone {
    constructor(){
        this.initialized = false;
        navigator.mediaDevices.getUserMedia({audio:true})
        .then(function(stream){
            this.audioContext = new AudioContext();//imports web audio api 
            this.microphone = this.audioContext.createMediaStreamSource(stream);//grabs the microphone audio
            this.analyser = this.audioContext.createAnalyser();//creates an analyser which shows frequency data
            this.analyser.fftSize = 2048; //fast fourier transform
            const bufferLength = this.analyser.frequencyBinCount; //half of fftSize or how many bars will be displayed
            this.dataArray = new Uint8Array(bufferLength);//convert audio data into 8bit integers
            this.microphone.connect(this.analyser); //connects microphone audio to analyser
            this.initialized = true;

        }.bind(this)).catch(function(err){
            alert(err);
        });

    }
    getSamples(){
        this.analyser.getByteTimeDomainData(this.dataArray)
        let normSamples = [...this.dataArray].map(e => e/128 - 1) //take data and spread it into the array converts it into a value between 0-2
        return normSamples;
    }
    getVolume(){
        this.analyser.getByteTimeDomainData(this.dataArray)
        let normSamples = [...this.dataArray].map(e => e/128 - 1);
        let sum = 0;
        for(let i = 0; i < normSamples.length; i++){
            sum += normSamples[i]* normSamples[i];
        }
        let volume = Math.sqrt(sum / normSamples.length)
        return volume
    }   
    getfftSize(){
        var slider2 = document.getElementById("myRange2").value;
        this.analyser.fftSize = slider2
    } 
}

const microphone = new Microphone();

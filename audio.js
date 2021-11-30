class AudioInput {
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
        let normSamples = [...this.dataArray].map(e => e/128 - 1) //converts Uint8Array to an actual array making the values go from 255 to -1 through +1
        return normSamples;
    }
    getVolume(){
        this.analyser.getByteTimeDomainData(this.dataArray)
        let normSamples = [...this.dataArray].map(e => e/128 - 1); //converts Uint8Array to an actual array making the values go from 255 to -1 through +1
        let sum = 0;
        for(let i = 0; i < normSamples.length; i++){ // creates a total sum of all the values then averages it out by multiplying it by itself and square rooting it
            sum += normSamples[i]* normSamples[i];
        }
        let volume = Math.sqrt(sum / normSamples.length)
        return volume
    }   
   
}

const audio1 = new AudioInput();

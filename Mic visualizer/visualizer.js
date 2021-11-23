function main(){
    console.log('loaded')
    const canvas = document.getElementById("my-canvas")
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 

    class Bar {
        constructor(x, y, width, height, color, index) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.index = index;
    
        }
        update(micInput){ //this is where we pass in the audio input to generate the bars
            const sound = micInput * 10000
            if(sound > this.height){
                this.height = sound;
            }else{
               this.height -= this.height * 0.03
            }
            
        }
        draw(context, volume) {//draw shapes based on values
            context.strokeStyle = this.color;
            context.save();
            
            context.translate(0, 0);
            context.rotate(this.index * 1);
            context.scale(1 + volume * 0.2, 1 + volume * 0.2)
        //    context.fillRect(this.x, this.y, this.width, this.height)
            context.beginPath();
            context.moveTo(this.x/2, this.y/2);
            context.lineTo(this.y, this.height/3);
           
            context.stroke();
            
            context.restore();
    
        }
    
    }
    
    const microphone = new Microphone();
    let bars = []
    let barWidth = canvas.width/256
    function createBars(){
        for(let i = 0; i < 256; i++){
            let color = 'hsl(0, 100%, 100%)'
            bars.push(new Bar(0, i*2, 2, 1, color, i))
        }
    }
    createBars();
    console.log(bars)
    let angle = 0;


    function animate(){
        if(microphone.initialized){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
       
        //generates audio sample from microphone
        const samples = microphone.getSamples()
        const volume = microphone.getVolume()
        angle += 0.001;
        ctx.save()
        ctx.translate(canvas.width/2, canvas.height/2)
        ctx.rotate(angle)
        //animate bars based on microphone data
        bars.forEach(function(bar, i){
            bar.update(samples[i]);
            bar.draw(ctx);
            bar.draw(ctx, volume)
            
        });
        ctx.restore()
    }
        requestAnimationFrame(animate);
    }
    
    animate();
}

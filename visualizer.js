


function main(){
    const canvas = document.getElementById("my-canvas")
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth/1;
    canvas.height = window.innerHeight/1.15; 

    class Bar {
        constructor(x, y, width, height, color, index) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.index = index;
    
        }
        update(micInput, scale){ //this is where we pass in the audio input to generate the bars
            const sound = micInput * 3000
            if(sound > this.height){
                this.height = sound;
            }else{
               this.height -= this.height * .05
            }
            
        }
        draw(context, volume, scale, color) {//draw shapes based on values
            context.strokeStyle = color;
            context.save();
            
            context.translate(0, 0);
            context.rotate(this.index * 1);
            context.scale(scale, scale)
            
        //    context.fillRect(this.x, this.y, this.width, this.height)
            context.beginPath();
            context.moveTo(this.x/2, this.y/2);
            context.lineTo(this.y, this.height/3);
            
            context.stroke();
            
            context.restore();
            
        }

        drawBars(context){
            context.strokeStyle = this.color;
            context.save();
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(this.x, this.y);
            context.stroke();
            context.closePath()
        }
        
    }
    
    
    
    
    
    //    window.location.reload()
    var slider2 = document.getElementById("myRange2").value;
    const fftSize = 512
    
    const microphone = new Microphone(fftSize);
    
    let bars = []
    let barWidth = canvas.width/(slider2)
    
    function createBars(){
        let value = document.getElementById("myRange2").value
        let slider3 = document.getElementById("myRange3").value;
        
        for(let i = 0; i < `${value}`/2; i++){
            let color = `hsl(${slider3}, 100%, 50% )`
            bars.push(new Bar(0, i*2, barWidth, 1, color, i))
            
        }
    }
    
    // let sliderEle3 = document.getElementById("myRange3")
    // sliderEle3.onchange = function(){
    // window.location.reload()
    // }
    let sliderEle = document.getElementById("myRange2")
    sliderEle.onchange  = function(){
        window.location.reload()
    }
    
    
    createBars();
    console.log(bars)
    let angle = 0;
    
    
    function animate(){
        var slider = document.getElementById("myRange").value;
        var slider3 = document.getElementById("myRange3").value
        if(microphone.initialized){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            
            
            //generates audio sample from microphone
            const samples = microphone.getSamples()
            const volume = microphone.getVolume()
            const scale = slider
            const color = `hsl(${slider3}, 100%, 50% )`
            angle += 0.001;
            ctx.save()
            ctx.translate(canvas.width/2, canvas.height/2)
            ctx.rotate(angle)
            //animate bars based on microphone data
            bars.forEach(function(bar, i){
                
                bar.update(samples[i], scale*2);
                bar.draw(ctx, volume/4, scale/2, color)
                
            });
            ctx.restore()
            
        }
        requestAnimationFrame(animate);
    }
    
    animate();
    
}




// Update the current slider value (each time you drag the slider handle)


// Display the default slider value
// function drawParticles() {
    //     // PARTICLES //
    
    //     context.beginPath();
    //     for (i=0; i<particles.length; i++) {
        //         var p = particles[i];
        //         if (p.active) {
            //             context.moveTo(p.position.x, p.position.y - (p.size*units));
            //             context.lineTo(p.position.x, p.position.y + (p.size*units));
            //         }
//     }
//     context.stroke();
// }
// requestAnimationFrame(drawParticles);

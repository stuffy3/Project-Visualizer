


function main(){
    let sliderEle2 = document.getElementById("myRange2")
    const canvas = document.getElementById("my-canvas")
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth/1;
    canvas.height = window.innerHeight/1.15; 

    class Bar {
        constructor(x, y, width, height, color, index, ) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.index = index;
            
        }
        update(micInput, ){ //this is where we pass in the audio input to generate the bars
            const sound = micInput * 3000
            if(sound > this.height){
                this.height = sound;
            }else{
               this.height -= this.height * .05
            }
            
        }
        draw(context, scale, color, slider5) {//draw shapes based on values
            context.strokeStyle = color;
            context.save();
            context.translate(0, 0);
            context.rotate(this.index * slider5);
            context.scale(scale, scale)
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
    
    
    
    
    
   
    
    const fftSize = 512
    const microphone = new Microphone(fftSize);
    let bars = []
    let barWidth = canvas.width/(fftSize)

    //creates the array of bars to be animated
    function createBars(){
        let slider3 = document.getElementById("myRange3").value;
        let slider2 = document.getElementById("myRange2").value;
        for(let i = 0; i < `${slider2}`/2; i++){
            let color = `hsl(${slider3}, 100%, 50% )`
            bars.push(new Bar(0, i*2, barWidth, 1, color, i,));
            
        };
    };
    //deletes the existing array of bars
    function deleteBars(){
        bars.length = 0
    };
    
        createBars();
        let angle = 0;
        
        
        function animate(){
            let slider = document.getElementById("myRange").value;
            let slider3 = document.getElementById("myRange3").value
            let slider4 = document.getElementById("myRange4").value
            let slider5 = document.getElementById("myRange5").value
            if(microphone.initialized){
                ctx.clearRect(0, 0, canvas.width, canvas.height);   
                //generates audio sample from microphone
                const samples = microphone.getSamples()
                //gathers mic volume
                
                const scale = slider
                const color = `hsl(${slider3}, 100%, 50% )`
                angle -= slider4/1000;
                ctx.save()
                ctx.translate(canvas.width/2, canvas.height/2)
                ctx.rotate(angle)
                //animate bars based on microphone data
                bars.forEach(function(bar, i){
                    bar.update(samples[i], scale*2);
                    bar.draw(ctx, scale/2, color, slider5)
                    
                });
                ctx.restore()
                
            }
            requestAnimationFrame(animate);
        }
        
        //this function updates the number of bars displayed using the 2nd range input
        sliderEle2.onchange  = function(){
            deleteBars()
            createBars()
            }
            
            animate()
    }
    

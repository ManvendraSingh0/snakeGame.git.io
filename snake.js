const canvas=document.getElementById('canvas');
const pen = canvas.getContext('2d');
pen.fillStyle='red';
let initx=50;
let inity=50;
const cs=67;
const w=1470;
const h=600;
let food=null;
let score=0;
let gameover=false;
pen.fillStyle='yellow';
const snake={
    initl:1,
    direction:'right',
    cells:[],
    createsnake:function()
    {
        for(let i=0;i<=this.initl;i++)
        {
            this.cells.push({
                x:i,
                y:0,
            })
        }
    },
    drawsnake:function()
    {
        for(let cell of this.cells)
        {
            pen.fillRect(cell.x*cs,cell.y*cs,cs-1,cs-1)
        }
    },
    updatesnake:function()
    {
        const headx=this.cells[this.cells.length-1].x;//getting the value of last x cordinate(head of snake)
        const heady=this.cells[this.cells.length-1].y;//getting the value of last y cordinate(head of snake)
        let nextx;
        let nexty;

        if(headx===food.x && heady=== food.y)//collision of head of snake with food
        {
            food=getRandomFood();
            score++;
        }
        else{
            this.cells.shift();//remove first cell
        }
        if(this.direction==='down')//to change the direction of head(snake)
        {
            nextx=headx;
            nexty=heady+1;
            
            
            if(nexty*cs>=h)
            {
                pen.font='80px sans-serif'
                beep();
                pen.fillText('Game over,Restart game',200,300);
                //pen.clearRect();
                clearInterval(id);
            }
        }
        else if(this.direction==='up')
        {
            nextx=headx;
            nexty=heady-1;
            if(nexty*cs<0)
            {
                pen.font='80px sans-serif'
                beep();
                pen.fillText('Game over,Restart game',200,300);
                clearInterval(id);
            }
        }
        else if(this.direction==='left')
        {
            nextx=headx-1;
            nexty=heady;
            if(nextx*cs<0)
            {
                pen.font='80px sans-serif'
                beep();
                pen.fillText('Game over,Restart game',200,300);
                clearInterval(id);
            }
        }
        else if(this.direction==='right')
        {
            nextx=headx+1;
            nexty=heady;
            if((nextx)*cs>=w)
            {
                pen.font='80px sans-serif'
                beep();
                pen.fillText('Game over,Restart game',200,300);
                
                clearInterval(id);
                
            }
        }   
        this.cells.push(//add the cell in front of head inside the cell array
            {
                x:nextx,
                y:nexty,
            },
        )
    }
}
function init()
{
    snake.createsnake();

    food=getRandomFood();
    function keypressed(e)
    {
        // console.log(e.key);
        if(e.key==='ArrowDown')
        {
            snake.direction='down';
        }
        else if(e.key==='ArrowLeft')
        {
            snake.direction='left';
        }
        else if(e.key==='ArrowRight')
        {
            snake.direction='right';
            
        }
        else if(e.key==='ArrowUp')
        {
            snake.direction='up';
        }
        else{
            snake.direction='right';
        }
        console.log(snake.direction);
    }
    document.addEventListener('keydown',keypressed);
}
function update()
{
    if(gameover===true)
    {
        clearInterval(id);
    }
    // initx +=100;
    snake.updatesnake();
    // inity +=100;
}
function draw()
{
    pen.clearRect(0,0,w,h);//used to clear the canvas rectangle
    
    pen.font='40px sans-serif'
    pen.fillText(`Score ${score}`,0,40)
    pen.fillStyle='green';
    // pen.fillRect(initx,inity,50,50);
    pen.fillRect(food.x*cs,food.y*cs,cs,cs);
    pen.fillStyle='yellow';
    snake.drawsnake();
    pen.fillStyle='red';
}
function gameLoop()
{
    
    draw();
    update();
}
function getRandomFood()
{
    const foodx= Math.round(Math.random()*(w-cs)/cs);
    const foody= Math.round(Math.random()*(h-cs)/cs);
    food={
        x:foodx,
        y:foody,
    }
    return food;

}
let id=0;
// init();
// const id= setInterval(gameLoop,200);
const starte=document.getElementById('Se');
const startm=document.getElementById('Sm');
const starth=document.getElementById('Sh');
const restart=document.getElementById('Re');
starte.onclick=function()
{
    if(score==0)
    {
        init();
    id= setInterval(gameLoop,200);
    console.log(id);
    }
    else
    {
        beep();
        pen.fillText('restart game first Then select level',100,400);
    }
    
}
startm.onclick=function()
{
    if(score==0)
    {
        init();
    id= setInterval(gameLoop,200);
    console.log(id);
    }
    else
    {
        beep();
        pen.fillText('restart game first Then select level',100,400);
    }
    // init();
    //  id= setInterval(gameLoop,180);
}
starth.onclick=function()
{
    if(score==0)
    {
        init();
    id= setInterval(gameLoop,200);
    console.log(id);
    }
    else
    {
        beep();
        pen.fillText('restart game first Then select level',100,400);
    }
    // init();
    //  id= setInterval(gameLoop,140);
    
}
restart.onclick=function()
{
    location.reload();
}
function beep() {
    var snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}

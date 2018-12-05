/*Adam Weissert
        arw1016
        The user uploads images and can hover over them to magnify a part of the image as well as click to zoom in and shift+click to zoom out
    	uploaded images will be displayed on the side of the window for the user to select
    	When the image is selected, it will populate the canvas for the user to magnify
*/    

var mouseX = 1; //set the mouse coors
var mouseY = 1; //set the mouse coors
var zoom = 100; //zoom circle radius
var zoomAmt = 2; //initial zoom amount
var canvasImage, newImage;
          

function drawZoomImage(){
    canvas = document.getElementById('imageCanvas');
    ctx = canvas.getContext('2d');
    var width = ctx.canvas.width; //get width of canvas
    var height = ctx.canvas.height; //get height of canvas

    ctx.clearRect(0,0,width, height); //intially clears rect
    

    ctx.drawImage(canvasImage, 0 - mouseX * (zoomAmt -1), 0 - mouseY * (zoomAmt -1), width * zoomAmt, height * zoomAmt); //this draws the zoomed in image:
    //the uploaded image is taken, its x and y vals are multiplied by the zoom amount, as are its width and height

    ctx.globalCompositeOperation = "destination-atop"; //this places the zoomed image above the original image
    ctx.fillStyle = 'none';

    ctx.beginPath();
    ctx.arc(mouseX, mouseY, zoom, 0, 2 * Math.PI); //draws a circle with the zoomed image inside it
    ctx.closePath();

    
    ctx.fill();
    ctx.drawImage(canvasImage, 0, 0, width, height); //draws the original image after clearing canvas

}

$(document).ready(function(){
    canvas = $("#imageCanvas");


     $("#uploadForm").submit(function(event){ //if the user uploads an image

        if($(this).get(0).files.length == 0){ 
            event.preventDefault(); //if a file is not loaded, stop the event
        }
        else{
            $(canvas).clearCanvas(); //clear canvas 
            $.ajax     
            //look up dynamic canvas element
            file = $("#imageUpload").val().split('\\').pop(); //grab the value of the image (removes the default 'fakepath' that Chrome adds)
            fileNewPath = "./images/" + file;

            newImage = new Image(); //create new image element for the container
            $(newImage).attr('src', fileNewPath).attr('alt', 'file').addClass('thumb'); //give the image tag the src and decrease its width to 20%
                    
                        
            canvasImage = new Image(); //create image for the canvas
            $(canvasImage).attr('src', fileNewPath).attr('alt', 'Canvas File'); //give it src and alt attrs
                    
                
            $("#images").append(newImage); //add the element to the DOM
            
            $(canvas).drawImage({ //draw the uploaded image at the canvas width from the point (0,0)
                source: canvasImage,
                x: 0, y: 0,
                width: $(canvas).width(), height: $(canvas).height(),
                fromCenter: false
            });
            
            $(document).on('click', '.container img', function(e){ //if one of the thumbnails is clicked
                $(canvas).clearCanvas(); //clear the canvas
                $(canvasImage).attr('src', $(this).attr('src')); //change the src of the canvas image to the clicked on image
                $(canvas).drawImage({ //draw the new image on the canvas at the canvas width and height
                    source: canvasImage,
                    x: 0, y: 0,
                    width: $(canvas).width(), height: $(canvas).height(),
                    fromCenter: false
                });
            });
            
            $("body").on('click', function(e){ //this function works for zooming in
                if (e.shiftKey){ //if the user clicks and holds either shift key
                    if(zoomAmt == 0){ //if the zoom amount is 0, prevent the event from triggering
                        console.log(zoomAmt);
                        e.preventDefault(); 
                    }
                    else{//otherwise, decrease the zoom amount by 1
                        zoomAmt -= 1;
                        console.log(zoomAmt);
                    }
                }
                else{ //if the user only clicks
                    if(zoomAmt <= 7){ //and the user has not clicked more than 5 times
                        zoomAmt += 1; //add one to the zoom amount
                        console.log(zoomAmt);
                    }
                    else{
                        e.preventDefault(); //otherwise stop the event
                        console.log(zoomAmt);
                    }
                }
            });
            
            $(canvas).on('mousemove', function(event) { //on mouseover of the canvas image
                var offset = $(canvas).offset(); //catch the coordinates of the canvas

                mouseX = Math.round(event.pageX - offset.left); //change the x value of the mouse to where it currently is in conjunction to the canvas
                mouseY = Math.round(event.pageY - offset.top);

                setInterval(drawZoomImage(), 100); //call this function to draw the image at the point the mouse is over
            });
        }
    });

});




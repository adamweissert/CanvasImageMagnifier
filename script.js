/*Adam Weissert
        arw1016
        The user uploads images and can hover over them to magnify a part of the image as well as scroll/click to zoom in
    	uploaded images will be displayed on the side of the window for the user to select
    	When the image is selected, it will populate the canvas for the user to magnify
        */
        var images = []; //empty array for images
        $(document).ready(function(){
            canvas = $('canvas'); //declare canvas element
            
            $("#imageUpload").on('change', function(){ //if the user uploads an image
                $(canvas).clearCanvas(); //clear canvas 
                
                var file = $("#imageUpload").val().split('\\').pop(); //grab the value of the image (removes the default 'fakepath' that Chrome adds)
                images.push(file); //push to the array
                //console.log(images);
                newImage = document.createElement('img'); //create new image element for the container
                $(newImage).attr('src', file).attr('alt', 'file').addClass('thumb'); //give the image tag the src and decrease its width to 20%
                
                
                canvasImage = document.createElement('img'); //create image for the canvas
                $(canvasImage).attr('src', file).attr('alt', 'Canvas File'); //give it src and alt attrs
                
            
                $("#images").append(newImage); //add the element to the DOM
                
                $(canvas).drawImage({ //draw the image in its original size
                   source: canvasImage,
                    x: 0, y:0,
                    fromCenter: false
                });
            });
            
            $(document).on('click', '.container img', function(e){
                $(canvas).clearCanvas();
                $(canvas).drawImage({
                   source: $(this).attr('src'),
                    x: 0, y: 0,
                    fromCenter: false
                });
                e.preventDefault();
            });
          
        });


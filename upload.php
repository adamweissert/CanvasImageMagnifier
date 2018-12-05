<?php
/*
This script detects the uploaded image, then checks to see if it is within uploading parameters before pushing it to the server
*/

    if(isset($_FILES['imageUpload'])){
        $errors = array(); //declare errrors array
        $fileTemp = $_FILES['imageUpload']['tmp']; //temporary name of the file
        $fileName = $_FILES['imageUpload']['name']; //actual name of the file
        $fileSize = $_FILES['imageUpload']['size']; //size of the file
        $fileType = $_FILES['imageUpload']['type']; //type of file uploaded
        $fileExt = strtolower(end(explode('.', $_FILES['imageUpload']['name']))); //get the extension of the file
        
        $extensions = array('jpeg', 'jpg', 'png'); //image file extensions
        
        if(in_array($fileExt, $extenstions) === false){
            //if the file extension does not match one of those in the array, then print an error
            $errors[] = "Extension not allowed! Please choose a JPG or a PNG file.";
        }
        
        if($fileSize > 2097152){
            //if the file is greater than 2MB, print an error
            $errors[] = "File too big! File must be less than 2MB.";
        }
        
        if(empty($errors) == true){
            //if there are no errors, move the file to the server
            move_uploaded_file($fileTemp, "../images/".$fileName);
            echo "<script>alert('Sucess');document.location='arw1016_project.html';</script>";
        }
        else{
            //otherwise print out the errors
            print_r($errors);
        }
    }
    else{
        echo "Upload failed! Please try again.";
    }

?>
function myFunction()
{
    document.getElementById('searchinput').style.backgroundColor = 'black';
    document.getElementById('box').style.backgroundColor = 'black';
    document.getElementById('box').style.border="2px solid #1DA1F2"
    document.getElementById('searchicon').style.backgroundColor='black';
    document.getElementById('searchicon').style.color='#1DA1F2';
    document.getElementById('searchicon_td').style.backgroundColor='black';
    return document;
}
function getRandomImage() {
    var randomImage = new Array();  
      
    //insert the URL of images in array  
    randomImage[0] =   "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";  
    randomImage[1] = "/images/mockImage.gif";  
    randomImage[2] = "/images/mockOMGgif.gif";  
    randomImage[3] = "/images/mockYodigif.gif";  
    randomImage[4] = "/images/potato.jpg";  
    randomImage[5] = "/images/cowboy.jpg";
      
    //generate a number and provide to the image to generate randomly  
    var number = Math.floor(Math.random()*randomImage.length);  
      
    //return the images generated by a random number  
    return document.getElementById("result").innerHTML = '<img src="'+randomImage[number]+'" />';  
    }
var previsao

Webcam.set({
    width : 350,
    height: 350,
    imageFormat: 'png',
    pngQuality: 250
});

camera = document.getElementById("camera")
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    })
}
console.log("Versão ML: ", ml5.version);

classifier =
ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/J2Ip11PDF/model.json');
function speak(){
    var sintese = window.speechSynthesis;
    dadoFala = "a primeira previsão é" + previsao;

    var digaIsso = new SpeechSynthesisUtterance(dadoFala)

    sintese.speak(digaIsso)
}

function check(){
    img = document.getElementById("captured_image")
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        document.querySelector("#resultEmotionName").innerHTML = results[0].label;
        previsao = results[0].label;
        speak();

        if(results[0].label === "feliz"){
            document.querySelector('#updateEmoji').innerHTML = "&#128522"
        }
        if(results[0].label === "tridte"){
            document.querySelector('#updateEmoji').innerHTML = "&#128532"
        }
        if(results[0].label === "irritado"){
            document.querySelector('#updateEmoji').innerHTML = "&#128548"
        }
    }
}
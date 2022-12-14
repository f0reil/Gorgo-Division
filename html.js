
//Activamos y desactivamos el texto de la historia
function aparecerTexto()
{
    //Imágenes de los controles
    var controls = document.getElementById("controlesImgs");
    var controlsChildren = controls.children;
    //Texto
    var historiaT = document.getElementById("Historia");
    //Activamos
    if(historiaT.style.visibility !== "visible")
    {
        //Activamostexto
        historiaT.style.visibility = "visible";
        //Desactivamos controles por si acaso
        if(controls.style.visibility !== "hidden")
        {
            controls.style.visibility = "hidden";
            for(let e of controlsChildren) {
                
                e.style.visibility = "hidden";
            }
        }
    }
    //Desactivamos
    else  historiaT.style.visibility = "hidden";
    //Debug
    /*console.log("Historia");
    console.log("Historia Texto: " + historiaT.style.visibility);
    console.log("Controles: " + controls.style.visibility);*/
    
};

function aparecerControles()
{
    var controls = document.getElementById("controlesImgs");
    var historiaT = document.getElementById("Historia");
    var controlsChildren = controls.children;
    //Activamos
    if(controls.style.visibility !== "visible")
    {
        controls.style.visibility = "visible";
        //Si texto es visible, lo desactivamos por si acaso
        if(historiaT.style.visibility !== "hidden")
        {
            historiaT.style.visibility = "hidden";
        }
        //Mostramos las imágenes
        for(let e of controlsChildren) {
            e.style.visibility = "visible";
        }
    }
    //Desactivamos
    else 
    {
        //Controles no visibles
        controls.style.visibility = "hidden";
        for(let e of controlsChildren) {
            
            e.style.visibility = "hidden";
        }
    }
    //Debug
    /*console.log("Controles");
    console.log("Historia Texto: " + historiaT.style.visibility);
    console.log("Controles: " + controls.style.visibility);*/
    
};

//Animación cursor
function cursor()
{
    var cursorA = document.body;
    var cursorArray = ['url("../assets/Web/Torch/pixil-frame-0.png"), auto',
                   'url("../assets/Web/Torch/pixil-frame-1.png"), auto',
                  'url("../assets/Web/Torch/pixil-frame-2.png"), auto',
                  'url("../assets/Web/Torch/pixil-frame-3.png"), auto',
                  'url("../assets/Web/Torch/pixil-frame-4.png", auto',
                  'url("../assets/Web/Torch/pixil-frame-5.png", auto',
                  'url("../assets/Web/Torch/pixil-frame-6.png", auto',
                  'url("../assets/Web/Torch/pixil-frame-7.png", auto',
                  'url("../assets/Web/Torch/pixil-frame-8.png", auto',
                  'url("../assets/Web/Torch/pixil-frame-9.png", auto'];
    console.log("a");
    var i = 0;
    cursorA.style.cursor  = cursorArray[i];
    i++;
    if(i == cursorArray.length){
    i = 0; 
    }
    setTimeout(cursor, 50);
}
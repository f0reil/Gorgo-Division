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
    
};
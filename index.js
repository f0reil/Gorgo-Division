//Activamos y desactivamos el texto de la historia
function aparecerTexto()
{
    //Imágenes de los controles
    var controls = document.getElementById("controlesImgs");
    var controlsChildren = controls.children;
    //Texto
    var historiaT = document.getElementById("Historia");
    //Autores
    var autores = document.getElementById("autoresText");
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
        if(autores.style.visibility !== "hidden")
        {
            autores.style.visibility = "hidden";
        }
    }
    //Desactivamos
    else  historiaT.style.visibility = "hidden";
    
};
//Activamos y desactivamos el texto de autores
function aparecerAutores()
{
    //Imágenes de los controles
    var controls = document.getElementById("controlesImgs");
    var controlsChildren = controls.children;
    //Texto
    var historiaT = document.getElementById("Historia");
    //Autores
    var autores = document.getElementById("autoresText");
    //Activamos
    if(autores.style.visibility !== "visible")
    {
        //Activamos texto
        autores.style.visibility = "visible";
        //Desactivamos controles e historia por si acaso 
        if(controls.style.visibility !== "hidden")
        {
            controls.style.visibility = "hidden";
            for(let e of controlsChildren) {
                
                e.style.visibility = "hidden";
            }
        }
        if(historiaT.style.visibility !== "hidden")
        {
            historiaT.style.visibility = "hidden";
        }
    }
    //Desactivamos
    else  autores.style.visibility = "hidden";
    console.log(autores.style.visibility);
    
};

function aparecerControles()
{
    //Historia
    var historiaT = document.getElementById("Historia");
    //Autores
    var autores = document.getElementById("autoresText");
    //Controles
    var controls = document.getElementById("controlesImgs");
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
        //Si los autores son visibles, los quitamos
        if(autores.style.visibility !== "hidden")
        {
            autores.style.visibility = "hidden";
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

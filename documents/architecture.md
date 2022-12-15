# Arquitectura del juego

## Clase del jugador
Que expande la clase de Sprite de Phaser, dispondrá de métodos y variables para moverse por el escenario, rotar sobre sí mismo e interactuar con el etorno como por ejemplo para recoger power-ups y llaves. El jugador muere al tocar una estaua o a Medusa y también si mira directamente a esta última.
## Clase del enemigo estatua
Que también expande la clase de Sprite, el enemigo podrá moverse para perseguir al jugador, y se dentendrá cuando reciba luz directamente, ya sea de una luz propia del nivel o la emitida por la antorcha del jugador. Los enemigos harán ruido al moverse, alertando de su presencia al jugador.

## Clase del enemigo Medusa
Al igual que los enemigos, expande la clase de Sprite. Medusa se moverá hacia el jugador emitiendo siempre un ruido de serpientes según se acerca. Si el jugador coloca la antorcha en el suelo cuando Medusa se encuentra muy cerca de este, quedará aturdida por unos segundos, por lo que dejará de perseguir al jugador y será innofensiva durante ese tiempo.

## Objetos interactuables
Estos objetos heredarán de la clase Sprite y tendrán la capacidad de interactuar con el jugador al entrar en contacto con este.

La puerta permite pasar al siguiente nivel, algunas puertas necesitan de una llave para ser abiertas, la llave se recoge al tocarla.
Los power-ups le otorgan al jugador una mejora temporal, existen 2:
    -El de tiempo, prolonga la duración de la barra de fuego.
    -El de velocidad, aumenta la velocidad del jugador notablemente.
En el caso de la mejora de velocidad, su efecto se pierde al pasar de nivel.
Las gemas, en el último nivel, para poder escapar, el jugador tiene que recoger todas las gemas del nivel. Al recoger una gema, el jugador se verá ligeramente ralentizado.
Los bloques sueltos, son objetos con físicos que pueden ser movidos por el jugador. Colisionan con el entorno y otros bloques sueltos, permitiendo hacer puzzles sencillos.

## Trampas
Las trampas son entidades que heredan de la clase Sprite y afectarán negativamente al jugador si entran en contacto con él. Existen dos:
    -Los pinchos, matarán al jugador al instante
    -Las corrientes de viento, resta una cantidad de fuego a la barra de la antorcha.

## Escenarios de juego
Nuestros niveles heredan de la clase escena de Phaser y están compuestos por varias capas de tiles que colisionan con el jugador y otras entidades.
Esta clase referenciará al resto de las clases para poder instaciar al jugador, enemigos y objetos según convenga.   
Todos los niveles tienen música ambiental.

## Menú
Los menús heredan de la clase escena, y disponen de botones para llevar a cabo distinas acciones.
En el juego existen 4 menús, el principal, el de pausa, el de derrota y el de victoria. Cada uno de ellos con sus poropios botones.

## UML
![Medusa's Requiem UML](https://user-images.githubusercontent.com/99989921/198393756-e3b127fe-7755-496a-bcc3-09a33ecae256.png)

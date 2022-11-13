# Arquitectura del juego

## Clase del jugador
Que expande la clase de Sprite de Phaser, dispondrá de métodos y variables para moverse por el escenario, rotar sobre sí mismo e interactuar con el etorno.

## Clase del enemigo
Que también expande la clase de Sprite, el enemigo podrá moverse para persegir al jugador, y se dentendrá cuando reciba luz directamente.

## Objetos interactuables
Estos objetos heredarán de la clase Sprite en caso de tener animaciones y tendrán la capacidad de interactuar de alguna manera con el jugador, puede ser el caso de puertas y consumibles.

## Escenarios de juego
Nuestros niveles heredarán de la clase escena de Phaser y nos permitirá crear y editar los niveles.
Esta clase referenciará al resto de las clases para poder instaciar al jugador, enemigos y objetos según convenga.   


## UML
![Medusa's Requiem UML](https://user-images.githubusercontent.com/99989921/198393756-e3b127fe-7755-496a-bcc3-09a33ecae256.png)

# Simulador de Máquinas de Turing!

Este simulador es una implementación en JavaScript de 5 máquinas de Turing que permite visualizar el funcionamiento de cada máquina en todo momento. Las 5 máquinas resuelven los siguientes problemas:

- Suma de N números unarios
- Resta de 2 números unarios no iguales.
- Multiplicación de 2 números unarios.
- Duplicador de cadenas con símbolos a, b o c.
- Verificador de palindromos con símbolos a, b o c.

# Uso

Inicie el simulador abriendo con su navegador web el archivo `Turing.html`. Es necesario que su navegador web soporte JavaScript y permita ejecutarlo. Una vez iniciado el simulador, verá la siguiente pantalla:

![Pantalla principal del simulador](https://image.ibb.co/fgVZjS/Captura.png)

Seleccione la máquina que desea ejecutar. El titulo superior le indica la máquina que está seleccionada. Ingrese una cadena en el campo indicado, y cárguela antes de ejecutar la máquina. Si necesita ayuda, puede presionar el botón gris. Al cargar la cadena verá:

![Cadena cargada a la máquina Sumador](https://image.ibb.co/gvm1W7/Captura.png)

El recuadro celeste de la cinta indica la posición de la cabeza lectora. Seleccione la velocidad de ejecución, y presione el botón rojo para inicar la máquina. Tome en cuenta que la velocidad de ejecución no se puede cambiar una vez iniciada la máquina. Debe pausar la ejecución presionando el botón amarillo, seleccionar la nueva velocidad y presionar el botón rojo nuevamente para continuar la ejecución de la máquina. El simular le mostrará un mensaje con el resultado obtenido.

![Cadena válida](https://image.ibb.co/bXgJB7/Captura.png)

![¡Error!](https://image.ibb.co/eg6eJn/Captura.png)

# Formato de entrada

Puede analizar el diseño teórico de cada máquina en el archivo PDF incluido en el simulador. El mismo le permite construir una cadena con el formato correcto para cada máquina. Sin embargo, se resume el formato de cada máquina de la siguiente forma:

## Sumador:

El símbolo unario es el símbolo '1' y el operador de suma es el símbolo '+'. Al final de la expresión debe incluir el símbolo '='. Se pueden incluir N elementos a sumar.
- 1+111+11+1+1111+11+1111=

## Restador:

El símbolo unario es el símbolo '1' y el operador de resta es el símbolo '-'. Al final de la expresión debe incluir el símbolo '='. Solo se opera la resta entre dos números unarios. Si ambos números son iguales, la resta es indefinida. El resultado puede ser positivo o negativo.
- 111-11=
- 11-111=

## Multiplicador

El símbolo unario es el símbolo '1' y el operador de multiplicación es el símbolo '*'. Al final de la expresión debe incluir el símbolo '='. Solo se opera la múltiplicación entre dos números unarios.
- 11*11=
- 111*1=

## Duplicador

Los símbolos de la cadena son 'a', 'b', 'c'. Se duplica una cadena de cualquier longitud con los símbolos en cualquier orden. 

- aababcbcacbcbabcbacbacbabcabcab

## Palíndromo
Los símbolos de la cadena son 'a', 'b', 'c'. Se verifica si la cadena cargada es un palíndromo. La cinta quedará vacía si la cadena ingresada es, efectivamente, un palíndromo.

- aabbccbbaa
- aba
- a

# Funcionamiento

La máquina de Turing es un modelo de estados y transicioes que permite implementar algoritmos. Cada estado Q puede tener transiciones para un símbolo S que modificará tanto el estado actual de la máquina como la cinta y su contenido. Si Q no tiene transición para S, entonces se dice que la cadena en la cinta no es válida para esa máquina.

La implementación de este simular plantea un modelo de máquina de Turing basado en objetos de JavaScript. El algoritmo de análisis y ejecución de cada máquina se diseñó para funcionar con cualquier máquina diseña en este modelo. Esto permite añadir o remover máquinas, o evaluar nuevas máquinas, sin alterar la aplicación. 

# Prompt
Queremos crear un chatbot capaz de implementar nuevas estrategias de escritura que sirvan para mejorar la calidad del texto generado a nivel literario, narrativo o técnico: claridad, coherencia, persuasión, estilo, etc. Usar la api de gemini.ai para generar textos aplicando estrategias de escritura, de forma que se pueda mejorar la claridad, reescribir para que se entienda mejor, concisiónimplica	liminar redundancias, agregar énfasis	para reordenar para resaltar lo importante, tono persuasivo	Redactar para convencer y en el estilo narrativo, buscando transformar texto en una historia envolvente.

# Created by firebase Studio
This is a NextJS starter in Firebase Studio, and then modificated.

# add to github a download to edit, you must have a token to access from firebase studio

# prompt example: 
extendeme la siguiente definición: Una mesa es un mueble compuesto de un tablero horizontal liso y sostenido a la altura conveniente, generalmente por una o varias patas y para diferentes usos.


# docker comands
docker build -t firebase-studio-testing .

docker rm firebase-studio-testing

docker run --name firebase-studio-testing -p 3000:3000 firebase-studio-testing

docker ps -a

## install libs
docker exec -it firebase-studio-testing sh
npm install axios

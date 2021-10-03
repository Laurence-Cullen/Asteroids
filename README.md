# Voxsteroid

[![voxteroid-demo](https://user-images.githubusercontent.com/5647724/135775155-8b2057fd-4946-4148-8571-ecbe5eb76a8c.gif)](https://voxsteroid-io6i7.ondigitalocean.app/)

## [View live!](https://voxsteroid-io6i7.ondigitalocean.app/)

Made for the 2021 Space Apps challenge, by team [Cambridge Asteroids](https://2021.spaceappschallenge.org/challenges/statements/when-light-curves-throw-us-curve-balls/teams/cambridge-asteroids/project). 

Voxteroid is a web interface for generating the light-curves of various three-dimensional shapes including existing asteroids, comets and other objects using Threejs and Blender. 
After choosing the rotation axis, angle of the sun and speed of rotation of the asteroid, the user can then generate its corresponding light curve. 

This curve is calculated in Blender, but the frontend is rendered in Three.js. This gives the tool the immediate visual feedback of a 3D scene, and also allows the generated light curve
to be high quality, including raytracing and material reflectivity. The tool is connected over an AJAX interface.

Our project solves the challenge by providing users an accessible interface for finding the light curves of a various number of objects, as well as uploading their own.
This is important as it can be used to better understand the asteroids that will be observed when the Lucy spacecraft arrives at the Trojan asteroids in years to come.


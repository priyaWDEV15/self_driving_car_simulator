# **SELF DRIVING CAR SIMULATOR**
### A path finding, self learning  car, built by implementing Neural Network Algorithms in Javascript.
> The car has been modelled using canvas. Elements like road, traffic, sensors are built using HTML, CSS, Javascript only. 
> Pathfinding algorithm is implemented in javascript. The trained model is stored in browser's cache and can be utilized once fully trainied.

![image](https://user-images.githubusercontent.com/88255480/216443527-5a367938-1a46-4fc1-b067-a3b6a37b3942.png)

## **METHODOLOGY**
   * ### GO TO
     * ### [Car Driving Mechanics](#car-driving-mechanics-1) 
     * ### [Road Definition](#road-definition-1)
     * ### [Artificial Sensors](#artificial-sensors-1)
     * ### [Collision Detection](#collision-detection-1)
     * ### [Traffic Simulation](#traffic-simulation-1)
     * ### [Neural Network and Visualising Network](#neural-network-and-visualising-network-1)
     * ### [Genetic Algorithm](#genetic-algorithm-1)
- - - -

### **CAR DRIVING MECHANICS** 
  * #### In terms of turning, We relied on the turning angle after determining depending on the unit circle.
  * #### In terms of forward and backward movement, it is controlled with speed and acceleration. 
  * #### The speed becomes constant when the vehicle reaches the specified maximum speed.
  
     ![image](https://user-images.githubusercontent.com/88255480/216444495-687035c8-26f6-4877-b347-0322f38fc30b.png)  
  Unit Circle
  
[TOP :top:](#methodology) 
- - - -   
### ROAD DEFINITION 
  * #### The number of lanes is determined and the lane split based on the given number by linear interpolation
     ![image](https://user-images.githubusercontent.com/88255480/216445414-0ef242fb-3b81-4758-a6eb-d6c2005f0b51.png)
  * #### Linear Interpolation `parameters`
      ```javascript
      /**
    * Find linear Interpolation - in another word we ask the function to give us the point between A and B depends on t
    * t -  actually is the percentage of how the return number is far from A
    * EX. if t == 0 then the return value is A ==>  A + (B - A)*0 = A
  

    *     if t == 1 then the return value is B ==> A + (B - A)*1 = A + B - A = B
    * @param {number} A - left point
    * @param {number} B - right point 
    * @param {double} t - the ratio between left and right point
    * @returns {double} - the linear interpolation between A and B
    */
    function linearInterpolation(A, B, t) {
    return A + (B - A) * t;
    }

      ```
 [TOP :top:](#methodology)     
 - - - -      
 ### **Artificial Sensors** 
 * #### We build a simple car model with 5 rays upfront 
 * #### These rays will detect cars and road borders.
 * ####  It has a certain length and spread in which it tries to detect the obstacle.
 * ####  Each of them has its reading so that it is displayed on it in a different color and also stored for use.
     ![image](https://user-images.githubusercontent.com/88255480/216446714-2b42dfea-68b9-4bfa-904e-659ebee2281c.png)
     
 [TOP :top:](#methodology)    
 - - - - 
 ### **Collision Detection** 
 * #### Any damage that occurs to the car is monitored by checking if there is any intersection between the car and any other obstacle and if the car is damaged, stop immediately.
     ![image](https://user-images.githubusercontent.com/88255480/216448140-a037c7ca-70aa-479e-ada8-856a0ed29eb8.png)
 * #### This intersection is checked by `Intersection of Polygons`:
     ```javascript
        *  Method help to find if there is an intersection between two polygon by check if there intersection
        *  between sides segments of the two polygon
        * @param {array} poly1 - array of corner coordinates
        * @param {array} poly2 - array of corner coordinates
        * @returns {boolean} - true if there is intersection between two polygon, false otherwise
        */
        function polysIntersect(poly1, poly2) {
          for (let i = 0; i < poly1.length; i++) {
            for (let j = 0; j < poly2.length; j++) {
                  const touch = getIntersection(
                  poly1[i],
                  poly1[(i + 1) % poly1.length],
                  poly2[j],
                  poly2[(j + 1) % poly2.length]
                  );
                  if (touch) {
                      return true;
                  }
              }
          }
          return false;
        }
     ```
  [TOP :top:](#methodology)   
 - - - -  
 
   ### **Traffic Simulation** 
 * #### Traffic is represented by creating multiple cars as a dummy car moving forward.
 * #### The traffic acceleration is fixed and low as compared to our AI car.
 * #### It is done so that our main car can catch these dummy cars.
 * #### Because if the speed is the same then it won’t be possible for our main car to catch those cars and we will not be able to test the collision detection between the car and the traffic.
     ![image](https://user-images.githubusercontent.com/88255480/216450439-fbb26436-9de1-4f49-a1c5-fe1a37cbcdc5.png)
   
 [TOP :top:](#methodology)
 - - - - 
 ### **Neural network and Visualising network** 
 * #### Architecture of ANN is typical one fully connected layers [multi-layer Perceptron]
 * #### It contain three layers:
    * #### Input layer (sensors).
    * #### Hidden layer.
    * #### Output layer (controllers).
 * #### We built our neural network by splitting it into two levels to make implementation easier.
 * #### The levels are linked by links that have random weights at first, These weights range from [-1, 1].
 * #### Each level Output has biases ranging from [-1, 1].
     ![image](https://user-images.githubusercontent.com/88255480/216452183-108e0443-929d-4bbd-9a90-677ef2538b4d.png)
 * #### The algorithm works in this way,when the sensors pick up something close to them, then these signals are read, analyzed and sent as inputs to our first level in neural networks, then each output we have at the first level is calculated as the sum of the link weight multiplied by the input, and checked if possible.
 * #### We take advantage of this output (i.e., can it help us to avoid a certain obstacle) by comparing it with bias, and accordingly making it an output, and this process is repeated at all the levels we have in the neural networks.
 * #### All layers in our neural networks (all neurons, connections with weights, biases, and interactions) are represented as an animated graph that explains the process of data transmission from one level to another.
 [TOP :top:](#methodology)
 - - - - 
 ### **Genetic Algorithm** 
 * #### The genetic algorithm of the project is to perform mutations in different proportions on the best selected car and generate several cars from them to obtain the best possible results from each generation.
 [TOP :top:](#methodology)
 - - - - 

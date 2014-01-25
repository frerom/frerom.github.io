---
layout: post
---

This is me trying to figure out what ECS is. I've found it hard to find good readings on the subject. Some abstract resources has been great at explaining the overall concept, but I want to know how to implement it. Either, the explanations I have found has been very abstract or they have giving examples with a library where I miss examples of implementation details.

I am a JavaScript developer so I will focus a bit on how to implement it in this language, but I am more interested in the concepts.

##OK so what is this thing?
ECS is an architecture [almost](http://www.youtube.com/watch?v=V1Eu9vZaDYw) exclusively used when developing games. Traditionally, games has been developed with object orientation and class hierarchy. ECS on the other hand use composition, it also seperates logic and state. One big advantage of ECS is that it is much easier to compose new advanced entities.

Making games in the traditional way is at first straightforward, but as the code base grows the urge to duplicate code and stuff more code in the base class increases. Ending up with entities having functionality they don't need. But with ECS you compose every entity with the properties and behaviours it should have. This gives great possibilities as you easily can compose new entities without writing any new code or evan create new entities dynamically in run time!

##Components

A component is an insolated state. This describes one property or behaviour of an entity, e.g a position of an entity or if the entity should be rendered and how. Should it react on keyboard input or does it move on server reponse?

One very important aspect is that the component should not have any logic what so ever, so you can't store a function in your component.

##Entites

When reading up on what an entity is, the answer is simply an ID. Nothing more, nothing less. However I'd like to see it as a collection of components.

##Entities and Components

Some suggest that the entities and components should be structured in a relational model, where you essentially have a table of entities, a table of components and a junction table between the enitites and components.

Another approch that I have been thinking of is to have a map for the entity and its components. In JavaScript this is rather convenient since objects are just string-to-whatever maps. This means that you can have an entity and its components like this:

{% gist 8620692 %}

Or evan:

{% gist 8620747 %}

Where the surrounding object is a map of all entities in the entire world (your world) and the keys in that map are the entity IDs. A value in this map is a collection of components. This might be good for performance because it is easy to look up an entity. It will also be easy to generate a new ID because you could implement the surrounding object with an array, and simply push the collection of components.

##Systems

The systems are the logic of the game. They are functions that changes the state of the entities. A system should have one task, e.g set velocity on key press, render, update AI controlled entities etc.

A system is dependent on one or more components. For example one system might be interested in all entities that have the components **moving AI** and **position** to calculate the new position using the information in the **moving AI** component and setting it to the **position** component. So a basic system loops through every entity with a specific component and performs an act.

Systems are triggered by events. An event can be anything. A key was pressed, a server response was received, the next tick in the game loop has begun.

##Events

This is the concept that I have found least information about.

An event could be anything, like a key press or a tick in the game loop. But a system should also be able to be trigger an event. So there seems to be two different kind of systems. One that acts on an event and changes state, and one that acts on an event and triggers another event. I guess a system could do both, but it doesn't feel right, it's probably better to make a system have one task.

I think a good example of this is a collision detector. You have a system that is triggered by a new tick in the game loop, this system might be interested in all entities with a **position** component. It checks collision against all **position** component§s and for every collsion it triggers an event. Then you might have different systems who listens for this event. A damage system is interested in colliding entities where one entity has a **damage** component and the other entity has a **health** component. Another system might be interested in colliding entities with a **velocity** component.

Events should be able to pass arguments when fired. In the above example, two of the arguments should be the two colliding entities. Maybe the game loop should pass all entities, or is this something that should be accessible by all systems? In this case, the trigger might only pass the IDs of the entities and not the entire component collections.

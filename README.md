# Fantasy Generator

### http://fantasygen.herokuapp.com/

## Markov chain
Generate fantasy names using dictionaries of words as training data. 

It uses Markov chain, a procedural algorithm, to make coherent chains of values. 

The results are highly customizable. The **Markov's order** defines the amount of characters "looked back" by the algorithm. Set lower orders to generate more random results. 

You can create your own set of data to generate any kind of names including food, animals, places, monsters, etc. 
Your saved lists will be stored locally on your device. 

It has been inspired by [Tw1ddle](https://github.com/Tw1ddle)'s [MarkovNameGenerator](https://github.com/Tw1ddle/MarkovNameGenerator)

## Generic Fantasy
Generate random names that can be used for any generic characters (heroes, villains, main protagonist, etc.).

## Fantastic Species
Generate names for a specific fantasy race. 

You may find two alternatives for a same species. It could be useful to distinguishing two different kind of population/tribes (e. g. Wood and High elves).

## Groups
Generate names for Mystic Orders, Military Units and Thieves & Assassin group. They could also be used for any group of adventurers or guilds. 

They are generated using random word with the patterns below.

**Mystic Orders**

    <group> of the <entity>
    <group> of the <description> <entity>
    <description> <group> of the <description> <entity>
    <description> <group>

**Military Units**
    
    <commander>'s <group>
    <description> <group>
    <description> <description> <group>
    <group> of the <place>
       
**Thieves & Assassins**

    <role> of <goal>
    <adjective> <action> <title>
    <description> <group>

## Taverns
Generate tavern names based using random words with the following patterns. 

    <adjective> <noun>
    <adjective> <noun> <title>
    The <adjective> <noun>
    The <adjective> <noun> <title>
    <noun> & <noun>
    <noun> & <noun> <title>
    <adjective> <title>
    The <adjective> <title>
    
The words used to generate the names can be customized.

It implements what is defined on [this D&D wiki page](https://www.dandwiki.com/wiki/Well_Over_100_Tavern_Names_(DnD_Other)#Totally_Random).

## Technology stack

 - AngularJS
 - Twitter Bootstrap
 - PouchDB
 - NodeJS

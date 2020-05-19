---
waltz:
  title: A Calculated Assualt
meta:
  version: 0.0.2
  gdd authors:
    - Justin Chernokal & Jon Chang
  template authors:
    - Austin Cory Bart <acbart@udel.edu>
    - Mark Sheriff
    - Alec Markarian
    - Benjamin Stanley
---

# Overview

A minigame that puts your math calculation speed to the test!

## Elevator Pitch

Our supplies are running thin, we need your help to modify the remiaining containers. This fast-paced math minigame puts your calculation speeds to the test, as you are constantly being fed more numbers to change. Can you meet the objectives without losing all your containers?

## Influences (Brief)
- Kingdom Rush:
  - Medium: Game
  - Explanation: Kingdom Rush is a tower defense game, which requires the      player to utilize various tower types to handle different units to advance through each level.
  
- Papa's Pizzeria:
  - Medium: Game
  - Explanation: Papa's Pizzeria is a food service game where you must construct a pizza with provided ingredients to meet customers' orders.
 
- Ballons Tower Defence:
  - Medium: Game
  - Explanation: Ballons Tower Defence is a tower defence game, which is focused on players using resource management to construct wacky towers to attack a hoard of ballons (preventing them from passing) in an way possible.

## Core Gameplay Mechanics (Brief)

- Place tower types in set locations on map.
- Adjust towers' abilities by selecting a number for it to use.
- Use tower abilities to manipulate numbers to match the goal.
- Win the level by meeting the goal(s) requirements.
- Fail level by missing the goal(s) requirements.
- Advance to next level or choose to repeat after winning.
- Repeat level after failing.
- After completeing all levels get a victory screen.

# Learning Aspects

## Learning Domains

Basic Algebra

## Target Audiences

- Students being introduced to algebra.
- Should be appropriate for young kids and adults who enjoy tower defense games.

## Target Contexts

- To be used as a supplementary form of practice for course teaching algebra
- Suitable as a mobile game, so it can be a good free time activity for kids k-12.

## Learning Objectives

*Remember, Learning Objectives are NOT simply topics. They are statements of observable behavior that a learner can do after the learning experience. You cannot observe someone "understanding" or "knowing" something.*

- By the end of the lesson, players will be able to solve for a variable in simple algebraic problems.
- By the end of the lesson, players will be able to utilize addition, subtraction, multiplication, and/or division operations.

## Prerequisite Knowledge

*What do they need to know prior to trying this game?*

- Basic math skills starting at knowledge of addition, subtraction, multiplication, and division.

## Assessment Measures

Open response or multiple chioce algebra test.

- Given an equation with a variable, solve for the variable.
- Given an equation with two or more operations, apply order of operations.
- Given complex algebra problem, should be able to solve in open response format showing their work.
- Given simple algebra problems, should be able to solve in mulitple choice format.

# What sets this project apart?

- Involves higher level of strategy due to the need to pre-plan tower locations, which demands deep understanding of algebra.
- Since a set number of units flow through a finite course, players only have a set amount of time to solve equations simulating a classroom testing environment but with more exciting visuals.

# Player Interaction Patterns and Modes

## Player Interaction Pattern

This is a single player game, with click and drag mechanics using the mouse or touchscreen.

## Player Modes

- Single player: advance through rounds & levels until the end is reached.

# Gameplay Objectives

- Satisfy goal requirements during the round:
  - Description: Manipulate numbers on the map using towers (represeting operation types) to meet the goal criteria
  - Alignment: This allows the player to treat each number coming into the field like a varible they have to modify.
- Win the game:
  - Description: Advance through all rounds/levels by consistently meeting each requirement. Not meeting the criteria more than five times means the level must be replayed.
  - Alignment: Player demonstrates the ability to handle a multitude of diverse algebraically oriented problems.

# Procedures/Actions

You can click on the building locations for towers and select a tower operation type to build. Then clicking the tower will allow for adjustment of targeted number and magnitude of operation.

# Rules

- Tower types are each assigned an operator, this cannot be changed.
- Tower abilities refine which numbers they can manipulate, this can be changed freely.
- Towers can only be placed in certain spots for each level
- Any tower can be placed on each spot.
- Numbers on the course are manipulated when they pass a tower
- Numbers on the course are manipulated based on the order of operations
- The objective number will be clearly indicated at the end of the course and will change for each level.
- No more than five wrong numbers can pass the goal, otherwise player fails the level.

# Objects/Entities

- Sprites representing each number.
- Course path art piece (line and corner versions).
- Open tower spot ground art piece.
- Tower sprites.
- Backdrop.
- Popup text descriptions for towers.
- Popup text instructions.

## Core Gameplay Mechanics (Detailed)

- Cosntruct tower type onto open spot on map: Click on a designated building location. Select a tower from the build menu and click it.

- Towers manipulate numbers that pass by using its repsective operation: Each tower has a spesific operation (addition, subtraction, multiplication, and division). Each tower has a target number, which is the only number the tower will perfrom its operation upon. Each tower has a spesific magnitude, which will be used in conjunction with the target number and tower operation type to alter the target numbers' value. Both the target number and magnitude can be changed with user input. When the target number passes the tower, the tower changes it with respect to the opperation and magnitude.

- If all numbers meet the goal requirements and pass the goal, player passes the level: Spesific numbers will be required to pass through the level tot he end. Upon alll numbers reaching the end and being correct the level is won.

- If five numbers, or more, do not meet the goal requirement and pass the goal, player fails the level: If five or more of the numbers that reach the end are not correct the level is lost.

- After completing all levels, game displays victory message and scoreboard: New screen with victory message and player score appears on display.
    
## Feedback

- Changing numbers makes distinct wooshing noise and changes sprite.
- Changing to negative numbers makes disitnct noise and changes sprite. These sprites will also have a red texture change.
- Wrong numbers enetering the goal makes a distinct "bad" noise.
- Correct number entering goal makes a distinct "good" noise.
- After winning level there is a win message and sound.

# Story and Gameplay

## Story (Brief)

Region in turmoil, you can help by altering the jobs (numbers) of the citizens (sprites) to more appropriate ones required to resolve the problem of the current level.

## Story (Detailed)

*Go into as much detail as needs be. Spare no detail. Use Mind Mapping software to get your point across*

## Gameplay (Brief)

Click to place towers, click to change tower operation increments.

## Gameplay (Detailed)

*Go into as much detail as needs be. Spare no detail. Combine this with the game mechanics section above*

# Assets Needed

## Graphical

- Characters List
  - Addition tower: some building/tower sprite
  - Subtratcion tower: ""
  - Mulitplication tower: ""
  - Division tower: ""
  - Monster/Demon/Thief: Negative Numbers
  - Farmer: Number 0 display on top of sprite
  - Tailor: Number 1
  - Buthcer: Number 2
  - Shepard: Number 3
  - Blacksmith: Number 4
  - Flecther: Number 5
  - Weaver: Number 6
  - Inn Keeper: Number 7
  - Mill Worker: Number 8
  - Barber: Number 9
  - Artist: Number 10
  - Soldier: Number 11
  - King: Number 12
  - Queen: Number 13
  - Princess: Number 14
  - Prince: Number 15
  - Knight: Number 16
  - Baker: Number 17
  - Chef: Number 18
  - Craftsman: Number 19
  - LumberJack: Number 20
  
- Textures: N/A

- Environment Art/Textures:
  - Backgorund: should be a grassy area, some other aesthetic choices can be included.

## Audio

*Game region/phase/time are ways of designating a particularly important place in the game.*

- Music List (Ambient sound)
  - General Gameplay: medieval/positvie cheerful music. Day time.
  
- Sound List (SFX)
  - Addition tower change of number: a distinct wooshing
  - Substration tower change of number: ""
  - Multiplication tower change of number: ""
  - Division tower change of number: ""
  - Bad guy spawn (number become negative): clear resounding sound, but not alltogether bad sounding
  - Correct number entering goal: dinging/positive ring sound
  - Wrong number entering goal: an "ooph" sound
  - Win sound effect

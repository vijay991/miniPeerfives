# Mini Peerfives Backend

Mini Peerfives is a simple platform that allows users to reward each other with P5 points. P5 points can be given to other users as a thanking note, and users can view their P5 and reward history.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, edit, and view user profiles
- Give and receive P5 points
- View P5 and reward history
- Create and view rewards
- Basic user authentication (if needed)

## Project Structure

The project is structured as follows:

```text
mini-peerfives-backend/
|-- config/
|   |-- db.js
|-- controllers/
|   |-- userController.js
|   |-- p5Controller.js
|   |-- rewardController.js
|-- middleware/
|   |-- errorMiddleware.js
|-- models/
|   |-- User.js
|   |-- P5.js
|   |-- Reward.js
|-- routes/
|   |-- userRoutes.js
|   |-- p5Routes.js
|   |-- rewardRoutes.js
|-- .env
|-- app.js
|-- server.js

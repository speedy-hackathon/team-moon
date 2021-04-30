using System;
using System.Collections.Generic;
using System.Linq;
using covidSim.Models;

namespace covidSim.Services
{
    public class Person
    {
        private const int MaxDistancePerTurn = 30;
        private static Random random = new Random();
        private PersonState state = PersonState.AtHome;
        private int inHomeStepsCount = 0;
        private CityMap Map { get; set; }
        private readonly House home;
        private int infectionTurnCount;

        public Person(int id, int homeId, CityMap map)
        {
            Id = id;
            HomeId = homeId;
            Map = map;
            var homeCoords = map.Houses[homeId].Coordinates.LeftTopCorner;
            home = map.Houses[homeId];
            var x = homeCoords.X + random.Next(HouseCoordinates.Width);
            var y = homeCoords.Y + random.Next(HouseCoordinates.Height);
            Position = new Vec(x, y);
            infectionTurnCount = 0;
        }

        public int Id;
        public int HomeId;
        public readonly List<Vec> PathFromSimStart = new List<Vec>();
        private Vec position;

        public Vec Position
        {
            get => position;
            set
            {
                PathFromSimStart.Add(value);
                position = value;
            }
        }

        public bool Infected;
        public bool IsBoring => inHomeStepsCount >= 5;

        public void CalcNextStep()
        {
            if (infectionTurnCount >= 45)
            {
                Infected = false;
                infectionTurnCount = 0;
            }
            else if (Infected)
            {
                infectionTurnCount++;
            }
            
            switch (state)
            {
                case PersonState.AtHome:
                    CalcNextStepForPersonAtHome();
                    break;
                case PersonState.Walking:
                    CalcNextPositionForWalkingPerson();
                    break;
                case PersonState.GoingHome:
                    CalcNextPositionForGoingHomePerson();
                    break;
            }
        }

        private void CalcNextStepForPersonAtHome()
        {
            inHomeStepsCount++;
            var goingWalk = random.NextDouble() < 0.005;
            if (!goingWalk)
            {
                MoveAroundHouse();
                return;
            }

            state = PersonState.Walking;
            inHomeStepsCount = 0;
            CalcNextPositionForWalkingPerson();
        }

        private void MoveAroundHouse()
        {
            var x = home.Coordinates.LeftTopCorner.X;
            var y = home.Coordinates.LeftTopCorner.Y;
            var newX = random.Next(x, x + HouseCoordinates.Width);
            var newY = random.Next(y, y + HouseCoordinates.Height);
            Position = new Vec(newX, newY);
        }

        private void CalcNextPositionForWalkingPerson()
        {
            var xLength = random.Next(MaxDistancePerTurn);
            var yLength = MaxDistancePerTurn - xLength;
            var direction = ChooseDirection();
            var delta = new Vec(xLength * direction.X, yLength * direction.Y);
            var nextPosition = new Vec(Position.X + delta.X, Position.Y + delta.Y);

            if (isCoordInField(nextPosition) && !IsInForeignHome(nextPosition))
            {
                Position = nextPosition;
            }
            else
            {
                CalcNextPositionForWalkingPerson();
            }
        }

        private bool IsInForeignHome(Vec position)
        {
            var insideForeignHome = false;
            for (var i = 0; i < Map.Houses.Length; i++)
            {
                if (i == HomeId)
                    continue;

                var foreignHouse = Map.Houses[i];
                if (IsInHouse(position, foreignHouse))
                    insideForeignHome = true;
            }

            return insideForeignHome;
        }

        private bool IsInHouse(Vec position, House house)
        {
            var outsideUpperLeftAngle = position.X < house.Coordinates.LeftTopCorner.X
                                 || position.Y < house.Coordinates.LeftTopCorner.Y;
            var outsideBottomRightAngle = position.X > house.Coordinates.LeftTopCorner.X + HouseCoordinates.Width
                                   || position.Y > house.Coordinates.LeftTopCorner.Y + HouseCoordinates.Height;

            return !outsideUpperLeftAngle && !outsideBottomRightAngle;
        }

        private void CalcNextPositionForGoingHomePerson()
        {
            var game = Game.Instance;
            var homeCoord = game.Map.Houses[HomeId].Coordinates.LeftTopCorner;
            var homeCenter = new Vec(homeCoord.X + HouseCoordinates.Width / 2,
                homeCoord.Y + HouseCoordinates.Height / 2);

            var xDiff = homeCenter.X - Position.X;
            var yDiff = homeCenter.Y - Position.Y;
            var xDistance = Math.Abs(xDiff);
            var yDistance = Math.Abs(yDiff);

            var distance = xDistance + yDistance;
            if (distance <= MaxDistancePerTurn)
            {
                Position = homeCenter;
                state = PersonState.AtHome;
                return;
            }

            var direction = new Vec(Math.Sign(xDiff), Math.Sign(yDiff));

            var xLength = Math.Min(xDistance, MaxDistancePerTurn);
            var newX = Position.X + xLength * direction.X;
            var yLength = MaxDistancePerTurn - xLength;
            var newY = Position.Y + yLength * direction.Y;
            Position = new Vec(newX, newY);
        }

        public void GoHome()
        {
            if (state != PersonState.Walking) return;

            state = PersonState.GoingHome;
            CalcNextPositionForGoingHomePerson();
        }

        private Vec ChooseDirection()
        {
            var directions = new Vec[]
            {
                new Vec(-1, -1),
                new Vec(-1, 1),
                new Vec(1, -1),
                new Vec(1, 1),
            };
            var index = random.Next(directions.Length);
            return directions[index];
        }

        private bool isCoordInField(Vec vec)
        {
            var belowZero = vec.X < 0 || vec.Y < 0;
            var beyondField = vec.X > Game.FieldWidth || vec.Y > Game.FieldHeight;

            return !(belowZero || beyondField);
        }
    }
}
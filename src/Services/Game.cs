using System;
using System.Collections.Generic;
using System.Linq;

namespace covidSim.Services
{
    public class Game
    {
        public List<Person> People;
        public CityMap Map;
        private DateTime _lastUpdate;

        private static Game _gameInstance;
        private static Random _random = new Random();
        
        public const int PeopleCount = 320;
        public const int FieldWidth = 1000;
        public const int FieldHeight = 500;
        public const int MaxPeopleInHouse = 10;

        private Game()
        {
            Map = new CityMap();
            People = CreatePopulation();
            _lastUpdate = DateTime.Now;
        }

        public static Game Instance => _gameInstance ?? (_gameInstance = new Game());

        private List<Person> CreatePopulation()
        {
            return Enumerable
                .Repeat(0, PeopleCount)
                .Select((_, index) => new Person(index, FindHome(), Map)
                {
                    Infected = _random.Next(100) < 5
                })
                .ToList();
        }

        private int FindHome()
        {
            while (true)
            {
                var homeId = _random.Next(CityMap.HouseAmount);

                if (Map.Houses[homeId].ResidentCount < MaxPeopleInHouse)
                {
                    Map.Houses[homeId].ResidentCount++;
                    return homeId;
                }
            }
            
        }

        public Game GetNextState()
        {
            var diff = (DateTime.Now - _lastUpdate).TotalMilliseconds;
            if (diff >= 1000)
            {
                CalcNextStep();
            }

            return this;
        }

        private void CalcNextStep()
        {
            _lastUpdate = DateTime.Now;
            Infect();
            foreach (var person in People)
            {
                person.CalcNextStep();
            }
        }

        private void Infect()
        {
            for (var i = 0; i < PeopleCount; i++)
            {
                for (var j = i + 1; j < PeopleCount; j++)
                {
                    var person1 = People[i];
                    var person2 = People[j];
                    if (InfectedCount(person1, person2) != 1)
                        continue;
                    if (person1.Infected)
                        person2.AttemptInfectBy(person1);
                    else
                        person1.AttemptInfectBy(person2);
                    
                }
            }
        }

        private int InfectedCount(params Person[] people)
        {
            var result = 0;
            foreach (var person in people)
            {
                if (person.Infected)
                    result++;
            }

            return result;
        }
    }
}
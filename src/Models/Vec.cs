using System;

namespace covidSim.Models
{
    public class Vec
    {
        public Vec(int x, int y)
        {
            X = x;
            Y = y;
        }

        public readonly int X;
        public readonly int Y;

        public double GetDistance(Vec other)
        {
            var x = other.X - X;
            var y = other.Y - Y;
            return Math.Sqrt(x * x + y * y);
        }
    }
}
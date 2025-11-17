using CleanDiabeteApp.Domain.Common;

namespace CleanDiabeteApp.Domain.Entities;

public sealed class Prediction : BaseEntity, IAggregateRoot
{
    public int Gender { get; private set; }
    public int Age { get; private set; }
    public int Hypertension { get; private set; }
    public int HeartDisease { get; private set; }
    public int SmokingHistory { get; private set; }
    public double Bmi { get; private set; }
    public double HbA1cLevel { get; private set; }
    public double BloodGlucoseLevel { get; private set; }

    public bool IsDiabetic { get; private set; }
    public double Probability { get; private set; }

    public string? Username { get; private set; }

    private Prediction() { }

    public static Prediction Create(
        int gender, int age, int hypertension, int heartDisease, int smokingHistory,
        double bmi, double hbA1cLevel, double bloodGlucoseLevel,
        bool isDiabetic, double probability, string? username)
    {
        return new Prediction
        {
            Gender = gender,
            Age = age,
            Hypertension = hypertension,
            HeartDisease = heartDisease,
            SmokingHistory = smokingHistory,
            Bmi = bmi,
            HbA1cLevel = hbA1cLevel,
            BloodGlucoseLevel = bloodGlucoseLevel,
            IsDiabetic = isDiabetic,
            Probability = probability,
            Username = username
        };
    }

    public void UpdateResult(bool isDiabetic, double probability)
    {
        IsDiabetic = isDiabetic;
        Probability = probability;
        Touch();
    }
}

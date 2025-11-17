using CleanDiabeteApp.Application.Abstractions.Persistence;
using CleanDiabeteApp.Domain.Entities;
using FluentValidation;
using MediatR;

namespace CleanDiabeteApp.Application.Predictions.Commands;

public sealed record CreatePredictionCommand(
    int Gender, int Age, int Hypertension, int HeartDisease, int SmokingHistory,
    double Bmi, double HbA1cLevel, double BloodGlucoseLevel,
    bool IsDiabetic, double Probability, string? Username
) : IRequest<Guid>;

public sealed class CreatePredictionValidator : AbstractValidator<CreatePredictionCommand>
{
    public CreatePredictionValidator()
    {
        RuleFor(x => x.Age).InclusiveBetween(0, 120);
        RuleFor(x => x.Bmi).GreaterThan(0);
        RuleFor(x => x.HbA1cLevel).GreaterThan(0);
        RuleFor(x => x.BloodGlucoseLevel).GreaterThan(0);
        RuleFor(x => x.Probability).InclusiveBetween(0, 1);
    }
}

public sealed class CreatePredictionHandler : IRequestHandler<CreatePredictionCommand, Guid>
{
    private readonly IApplicationDbContext _db;

    public CreatePredictionHandler(IApplicationDbContext db) => _db = db;

    public async Task<Guid> Handle(CreatePredictionCommand request, CancellationToken ct)
    {
        var entity = Prediction.Create(
            request.Gender, request.Age, request.Hypertension, request.HeartDisease, request.SmokingHistory,
            request.Bmi, request.HbA1cLevel, request.BloodGlucoseLevel, request.IsDiabetic, request.Probability, request.Username);

        await _db.AddAsync(entity, ct);
        await _db.SaveChangesAsync(ct);

        return entity.Id;
    }
}

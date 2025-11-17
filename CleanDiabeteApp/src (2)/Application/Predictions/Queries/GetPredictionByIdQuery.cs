using CleanDiabeteApp.Application.Abstractions.Persistence;
using CleanDiabeteApp.Domain.Entities;
using MediatR;

namespace CleanDiabeteApp.Application.Predictions.Queries;

public sealed record GetPredictionByIdQuery(Guid Id) : IRequest<Prediction?>;

public sealed class GetPredictionByIdHandler : IRequestHandler<GetPredictionByIdQuery, Prediction?>
{
    private readonly IApplicationDbContext _db;

    public GetPredictionByIdHandler(IApplicationDbContext db) => _db = db;

    public Task<Prediction?> Handle(GetPredictionByIdQuery request, CancellationToken ct)
        => _db.FindPredictionAsync(request.Id, ct);
}

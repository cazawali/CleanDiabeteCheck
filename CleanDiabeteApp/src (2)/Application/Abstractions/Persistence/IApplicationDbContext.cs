using CleanDiabeteApp.Domain.Common;
using CleanDiabeteApp.Domain.Entities;

namespace CleanDiabeteApp.Application.Abstractions.Persistence;

public interface IApplicationDbContext
{
    IQueryable<Prediction> Predictions { get; }

    Task AddAsync<T>(T entity, CancellationToken ct = default) where T : BaseEntity;
    Task<int> SaveChangesAsync(CancellationToken ct = default);
    Task<Prediction?> FindPredictionAsync(Guid id, CancellationToken ct = default);
}

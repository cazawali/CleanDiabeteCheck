using CleanDiabeteApp.Application.Abstractions.Persistence;
using CleanDiabeteApp.Domain.Common;
using CleanDiabeteApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CleanDiabeteApp.Infrastructure.Persistence;

public sealed class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Prediction> PredictionSet => Set<Prediction>();

    public IQueryable<Prediction> Predictions => PredictionSet.AsQueryable();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Prediction>(entity =>
        {
            entity.ToTable("Predictions");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Username).HasMaxLength(128);
        });
    }

    public Task AddAsync<T>(T entity, CancellationToken ct = default) where T : BaseEntity
        => Set<T>().AddAsync(entity, ct).AsTask();

    public Task<Prediction?> FindPredictionAsync(Guid id, CancellationToken ct = default)
        => PredictionSet.FirstOrDefaultAsync(x => x.Id == id, ct);

    public override Task<int> SaveChangesAsync(CancellationToken ct = default) => base.SaveChangesAsync(ct);
}

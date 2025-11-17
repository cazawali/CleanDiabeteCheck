using System.Reflection;
using Microsoft.EntityFrameworkCore;
using CleanDiabeteApp.Application.Predictions.Commands;
using CleanDiabeteApp.Application.Predictions.Queries;
using CleanDiabeteApp.Infrastructure.Persistence;

using FluentValidation;
using MediatR;

var builder = WebApplication.CreateBuilder(args);

var corsPolicy = "_corsPolicy";

builder.Services.AddCors(options =>
{
  options.AddPolicy(name: corsPolicy, policy =>
  {
    policy
        .WithOrigins("http://localhost:4200")   // Angular
        .AllowAnyHeader()
        .AllowAnyMethod();
  });
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreatePredictionCommand).Assembly));

builder.Services.AddValidatorsFromAssembly(typeof(CreatePredictionCommand).Assembly);

bool useInMemory = builder.Configuration.GetValue<bool>("UseInMemory");
builder.Services.AddInfrastructure(builder.Configuration, useInMemory);

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
  var cfg = scope.ServiceProvider.GetRequiredService<IConfiguration>();
  var db = scope.ServiceProvider.GetRequiredService<CleanDiabeteApp.Infrastructure.Persistence.ApplicationDbContext>();

  db.Database.EnsureCreated(); // or db.Database.Migrate() if you use migrations

  var connString = cfg.GetConnectionString("Default") ?? "Data Source=clean.db";
  Console.WriteLine($"[SQLite] ConnectionString: {connString}");
  Console.WriteLine($"[SQLite] WorkingDir      : {Directory.GetCurrentDirectory()}");
}

app.UseCors(corsPolicy);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/api/predictions", async (CreatePredictionCommand cmd, ISender sender, IValidator<CreatePredictionCommand> validator, CancellationToken ct) =>
{
    var result = await validator.ValidateAsync(cmd, ct);
    if (!result.IsValid) return Results.ValidationProblem(result.ToDictionary());

    var id = await sender.Send(cmd, ct);
    return Results.Created($"/api/predictions/{id}", new { id });
})
.WithName("CreatePrediction")
.Produces(StatusCodes.Status201Created)
.ProducesValidationProblem();

app.MapGet("/api/predictions/{id:guid}", async (Guid id, ISender sender, CancellationToken ct) =>
{
    var pred = await sender.Send(new GetPredictionByIdQuery(id), ct);
    return pred is null ? Results.NotFound() : Results.Ok(pred);
})
.WithName("GetPredictionById")
.Produces(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound);

app.Run();

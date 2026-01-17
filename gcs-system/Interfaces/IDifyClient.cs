namespace gcs_system.Interfaces;

public interface IDifyClient
{
    Task SendEventAsync(string message, object? inputs = null);
}

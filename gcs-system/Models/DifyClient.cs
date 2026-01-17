using System.Net.Http.Headers;
using System.Text;
using gcs_system.Interfaces;

// public class DifyClient : IDifyClient
// {
//     private readonly HttpClient _httpClient;
//     private readonly string _apiKey;
//
//     public DifyClient(HttpClient httpClient, IConfiguration config)
//     {
//         _httpClient = httpClient;
//         _apiKey = config["Dify:ApiKey"];
//     }
//
//     public async Task SendEventAsync(string message, object inputs)
//     {
//         var payload = new
//         {
//             query = message,
//             inputs = inputs,
//             user = "ardu-copter"
//         };
//
//         var req = new HttpRequestMessage(
//             HttpMethod.Post,
//             "https://api.dify.ai/v1/chat-messages"
//         );
//
//         req.Headers.Authorization =
//             new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _apiKey);
//
//         req.Content = new StringContent(
//             System.Text.Json.JsonSerializer.Serialize(payload),
//             Encoding.UTF8,
//             "application/json"
//         );
//
//         await _httpClient.SendAsync(req);
//     }
public class DifyClient : IDifyClient
{
    private readonly HttpClient _httpClient;

    public DifyClient(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("https://api.dify.ai/v1/");
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue(
                "Bearer",
                config["Dify:ApiKey"]
            );
    }

    // ⭐ 핵심: public + 인터페이스 시그니처 그대로
    public async Task SendEventAsync(string message, object? inputs = null)
    {
        var payload = new
        {
            inputs = inputs ?? new { },
            query = message,
            response_mode = "blocking",
            user = "gcs-system"
        };

        var response = await _httpClient.PostAsJsonAsync("chat-messages", payload);
        var body = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Dify Error {response.StatusCode}: {body}");
        }

        Console.WriteLine("Dify response:");
        Console.WriteLine(body);
    }
}
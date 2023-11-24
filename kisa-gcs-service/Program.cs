using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace kisa_gcs_service
{

    public static class Program
    {
        public static async Task Main(string[] args) // 애플리케이션 진입점, Main 메소드 정의
        {
            // 호스트 빌드
            var host = CreateHostBuilder(args).Build(); 

            // MAVLink 수신
            var droneUdpService =
                (DroneMonitorServiceMavUdpNetty)host // 서비스 프로바이더로부터 DroneMonitorServiceMavUdpNetty 서비스를 가져온다.
                .Services // ASP.NET Core에서 Host 또는 WebHost를 생성하면 'IServiceProvider 인터페이스를 구현한 컨테이너가 생성된다. 이 서비스 컨테이너는 애플리케이션 전체에서 사용가능한 서비스를 관리하고 제공한다. .Services는 이 서비스 컨테이너에서 서비스를 검색하는데 사용된다. 주로 의존성 주입을 통해 서비스를 사용할 때 쓰인다. 
                .GetService(typeof(DroneMonitorServiceMavUdpNetty));
            if (droneUdpService != null)
                await droneUdpService.StartAsync(14556); // 가져온 서비스의 StartAsync 메서드를 호출해서 시작(포트 번호 14556을 전달)

            // 호스트 실행
            await host.RunAsync();
        }
        
        public static IHostBuilder CreateHostBuilder(string[] args) =>  // CreateHostBuilder 메소드 정의, 웹 애플리케이션을 구성하고 실행하기 위한 'IHostBuilder'를 생성하는 역할. 
            Host.CreateDefaultBuilder(args)             // IHostBuilder 인터페이스는 기본 호스팅 설정하고 실행할 수 있음, (로깅, 구성, 서비스 공급자 및 환경설정 포함)
                .ConfigureWebHostDefaults(webBuilder => // 웹 호스팅을 구성하는 메소드, webBuilder.UseStartup<Startup>()을 호출해서
                {
                    webBuilder.UseStartup<Startup>();   // Startup 클래스를 사용해서 웹 애플리케이션을 설정
                    webBuilder.UseUrls("http://0.0.0.0:5000");  // Kestrel 설정, 외부 접속 허용 원하는 포트로 변경도 가능하고 
                });
    };    
}
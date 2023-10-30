using kisa_gcs_service.Model;
using kisa_gcs_service.Service;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace kisa_gcs_service.Controllers;

[ApiController]                         // 이 특성을 사용하면 컨트롤러 클래스를 간소하게 정이할 수 있음, 별도의 설정없이도 컨트롤러가 API 엔드포인트 동작을 하게 됨
[EnableCors("CorsPolicy")]     // CORS 정책을 컨트롤러에 적용
[Route("/api")]                 // 기본 라우트
public class DroneController : ControllerBase    // C#에서 콜른(:)은 다른 클래스의 상속이나 인터페이스의 구현을 의미, 여기에서는 ControllerBase 클래스의 상속을 받고 있음을 의미 
{
    private readonly DroneService _droneService; // DroneService를 사용하기 위한 멤버 변수

    public DroneController(DroneService droneService)   // 생성자
    {
        _droneService = droneService; // DroneService 주입
    }

    [HttpGet("drones")]
    public IActionResult GetDrones()    // 동기 메서드, 메서드가 실행되면 결과를 즉시 반환
    {
        try
        {
            List<String> drones = _droneService.GetDroneIds(); // DroneService를 사용하여 데이터 가져오기

            if (drones.Count == 0) { return NotFound(); }
            return Ok(drones);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpPost("drones")]        // 비동기 메서드, 메서드가 비동기 작업 수행이 완료될 때까지 기다리지 않음 
    public IActionResult GetDroneByDroneId()
    {
        try
        {
            IFormCollection form = Request.Form;
            string? DroneId = form["DroneId"];
            if (DroneId == null) { return BadRequest("Invalid request data"); }
            Drone drone = _droneService.GetDroneByDroneId(DroneId);

            if (drone != null)
            {
                // var response = new { monitorPage = drone }; // JSON 형식의 응답을 생성
                // return Ok(response);
                return Ok(drone);
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "An error occurred while processing your request.");
        }
    }
    
    
}
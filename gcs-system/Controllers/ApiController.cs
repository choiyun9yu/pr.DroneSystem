using gcs_system.Models;
using gcs_system.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace gcs_system.Controllers;

[ApiController] // 이 특성을 사용하면 컨트롤러 클래스를 간소하게 정이할 수 있음, 별도의 설정없이도 컨트롤러가 API 엔드포인트 동작을 하게 됨
[EnableCors("CorsPolicy")]            
[Route("/api")]                        
public class ApiController : ControllerBase  
{
    private readonly AnomalyDetectionApiService _anomalyDetectionApiService;
    private readonly GcsApiService _gcsApiService;
    private readonly DashboardApiService _dashboardService;
    private readonly ArduCopterManager _arduCopterManager;

    public ApiController(
        AnomalyDetectionApiService anomalyDetectionApiService, 
        GcsApiService gcsApiService, 
        DashboardApiService dashboardApiService, 
        ArduCopterManager arduCopterManager
        )  
    {
        _anomalyDetectionApiService = anomalyDetectionApiService;
        _gcsApiService = gcsApiService;
        _dashboardService = dashboardApiService;
        
        _arduCopterManager = arduCopterManager;
    }

    [HttpPost("dashboard")]
    public IActionResult PostDashboard()
    {
        IFormCollection form = Request.Form;
        string? yearStr = form["year"];
        string? monthStr = form["month"];
        int year = int.Parse(yearStr);
        int month = int.Parse(monthStr);
        try
        {
            long flightCount = _dashboardService.GetFlightCount(year, month);
            string flightTime = _dashboardService.GetFlightTime(year, month);
            double? fligthDistance = _dashboardService.GetFlightDistance(year, month);
            long logCount = _dashboardService.GetLogCount(year, month);
            long anomlayCount = _dashboardService.GetAnomlayCount(year, month);
            List<DailyFlightTime> dailyFlightTime = _dashboardService.GetDailyFlightTime(year, month);
            List<DailyAnomalyCount> dailyAnomalyCount = _dashboardService.GetDailyAnomalyCount(year, month);
            Dictionary<string, List<DateTime>> flightDay = _dashboardService.GetDroneFlightDay(year, month);
            return Ok(new
            {
                flightCount,
                flightTime,
                fligthDistance,
                logCount,
                anomlayCount,
                dailyFlightTime,
                dailyAnomalyCount,
                flightDay,
            });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Post Start Mission Api Server Error");
        }
    }

    // 외부에서 명령을 내리고 싶은 경우 사용 (예상 경로 표시는 react 랑 gcs 로직 새로 짜서 추가해야함)
    [HttpPost("startmission")]
    public IActionResult PostStartMission()
    {
        IFormCollection form = Request.Form;
        string? startPoint = form["startPoint"];
        string? targetPoint = form["targetPoint"];
        string? transitPoint = form["transitPoint"];    // 나중에 리스트로 만들어야 함
        string[] transitPointArray = transitPoint.Split(',');
        List<string> transitList = new List<string>(transitPointArray);
        int alt = int.Parse(form["alt"]);
        string? totalDistance = form["totalDistance"];
        
        // _droneControlService.HandleDroneMoveToMission(startPoint, targetPoint, transitList, alt, totalDistance);
        
        try
        {
            return Ok();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Post Start Mission Api Server Error");
        }
    }

    [HttpPost("createmission")]
    public IActionResult PostGenerateMission()
    {
        IFormCollection form = Request.Form;
        string? StartPoint = form["StartPoint"];
        string? TargetPoint = form["TargetPoint"];
        string? FlightAlt = form["FlightAlt"];

        List<string> TransitPointsList = new List<string>();
        
        for (int i = 1; i <= 9; i++)
        {
            string? transitPoint = form[$"TransitPoint{i}"];
            if (!string.IsNullOrEmpty(transitPoint))
            {
                TransitPointsList.Add(transitPoint);
            }
        }
        
        try
        {
            _gcsApiService.CreateMission(StartPoint, TargetPoint, FlightAlt, TransitPointsList);
            return Ok();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Post Generate Mission Api Server Error");
        }
    }
    
    [HttpGet("selectmission")]
    public IActionResult GetSelectMission()
    {
        try
        {
            return Ok(_gcsApiService.GetAllMissionLoad());
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Get Select Mission Api Server Error");
        }
    }
    
    [HttpDelete("deletemissionload")]
    public IActionResult DeleteMissionLoad()
    {
        IFormCollection form = Request.Form;
     
        string? MissionName = form["MissionName"];

        try
        {
            _gcsApiService.DeleteMissionName(MissionName);
            return Ok();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Delete Mission Api Server Error");
        }
    }
    
    [HttpPost("addwaypoint")]
    public IActionResult PostAddWayPoint()
    {
        IFormCollection form = Request.Form;
     
        string? LocalName = form["LocalName"];
        string? LocalLat = form["LocalLat"];
        string? LocalLon = form["LocalLon"];
        
        try
        {
            _gcsApiService.AddWayPoint(LocalName, LocalLat, LocalLon);
            return Ok();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Post Add Local Point Api Server Error");
        }
    }
    
    [HttpGet("localpoints")]
    public IActionResult GetLocalPoint()
    {
        try
        {
            List<string> localPointList = _gcsApiService.GetLocalPointList();

            var JsonObject = new
            {
                localPointList
            };
        
            string jsonString = JsonConvert.SerializeObject(JsonObject);
        
            if (localPointList.Count == 0) { return NotFound(); }
            return Ok(jsonString);
        }        
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Get Local Points Api Server Error");
        }
    }
    
    [HttpDelete("deletelocalpoint")]
    public IActionResult DeleteLocalPoint()
    {
        IFormCollection form = Request.Form;
     
        string? LocalName = form["LocalName"];

        try
        {
            _gcsApiService.DeleteLocalName(LocalName);
            return Ok();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Delete Local Point Api Server Error");
        }
    }

    [HttpGet("getid")]
    public IActionResult GetDroneId()
    {
        try
        {
            List<String> drones = _anomalyDetectionApiService.GetDroneIds();

            var JsonObject = new
            {
                drones
            };
            
            string jsonString = JsonConvert.SerializeObject(JsonObject);
            
            if (drones.Count == 0) { return NotFound(); }
            return Ok(jsonString);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Get Drone Id List Api Server Error");
        }
    }
    
    [HttpPost("getid")]
    public IActionResult PostGetFlightId()
    {
        IFormCollection form = Request.Form;
        string? DroneId = form["DroneId"];
        string? periodFrom = form["periodFrom"];
        string? periodTo = form["periodTo"];
        try
        {
            List<String> flights = _anomalyDetectionApiService.GetFlightIds(DroneId, periodFrom, periodTo);
            var JsonObject = new
            {
                flights
            };
            
            string jsonString = JsonConvert.SerializeObject(JsonObject);
            
            if (flights.Count == 0) { return NotFound(); }
            return Ok(jsonString);
        }
        catch (Exception e)
        {
            // Console.WriteLine(e);
            return StatusCode(500, "Post Get Flight Id List Api Server Error");
        }
    }

    [HttpPost("AutoFlight")]
    public void AutoFlight()
    {
        IFormCollection form = Request.Form;
        try
        {
            _arduCopterManager.AutoFlightFunc();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            StatusCode(500, "Post AutoFlight Error!");
        }
    }

    [HttpPost("realtime")]
    public IActionResult PostRealTime()
    {
        try
        {
            IFormCollection form = Request.Form;
            string? DroneId = form["DroneId"];
            if (DroneId == null)
            {
                return BadRequest("Invalid request: RealTime");
            }
            AnomalyDetection anomalyDetection = _anomalyDetectionApiService.GetRealtimeByDroneId(DroneId);

            if (anomalyDetection != null)
            {
                var response = new 
                {
                    DroneId,
                    anomalyDetection.PredictData,  
                    anomalyDetection.SensorData,
                };
                return Ok(response);
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Post Real Time Api Server Error");
        }
    }
    

    [HttpPost("logdata")] // form(DroneId, FlightId, periodFrom, periodTo) -> PredictTime, DroneId, FlightId, SensorData
    public IActionResult PostLogData()
    {
        try
        {
            IFormCollection form = Request.Form;
            string? DroneId = form["DroneId"];
            string? FlightId = form["FlightId"];
            string? periodFrom = form["periodFrom"];
            string? periodTo = form["periodTo"];
            if (DroneId == null)
            {
                return BadRequest("Invalid request: LogData");
            }

            List<AnomalyDetection> anomalyDetectionApi =
                _anomalyDetectionApiService.GetLogDataByForm(DroneId, FlightId, periodFrom, periodTo);
            if (anomalyDetectionApi != null)
            {
                var response = new
                {
                    logPage = anomalyDetectionApi
                };
                return Ok(response);
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Post Log Data Api Server Error");
        }
    }

    [HttpPost("predict")] //  form(DroneId, FlightId, periodFrom, periodTo, SelectData) -> PredictTime, DroneId, FlightId, SelectData, PredictData, SensorData
    public IActionResult PostPrediction()
    {
        try
        {
            IFormCollection form = Request.Form;
            string? DroneId = form["DroneId"];
            string? FlightId = form["FlightId"];
            string? periodFrom = form["periodFrom"];
            string? periodTo = form["periodTo"];
            string? SelectData = form["SelectData"];
            if (DroneId == null)
            {
                return BadRequest("Invalid request: Prediction ");
            }

            List<AnomalyDetection> anomalyDetectionApi =
                _anomalyDetectionApiService.GetPredictDataByForm(DroneId, FlightId, periodFrom, periodTo, SelectData);
            if (anomalyDetectionApi != null)
            {
                var response = new
                {
                    SelectData,
                    predictPage = anomalyDetectionApi,
                };
                return Ok(response);
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Post Prediction Api Server Error");
        }
    
    }
}
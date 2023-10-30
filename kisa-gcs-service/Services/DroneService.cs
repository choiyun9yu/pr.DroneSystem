using MongoDB.Bson;
using MongoDB.Driver;

using kisa_gcs_service.Model;

namespace kisa_gcs_service.Service
{
    public class DroneService
    {
        private readonly ILogger<DroneService> _logger;
        private readonly IMongoCollection<Drone> _droneCollection;
        public DroneService(ILogger<DroneService> logger, IConfiguration configuration)
        {
            // Looger
            _logger = logger;
            
            // MongoDB 연결
            var connectionString = configuration.GetConnectionString("MongoDB");
            var mongoClient = new MongoClient(connectionString);
            var database = mongoClient.GetDatabase("gcs_drone");
            _droneCollection = database.GetCollection<Drone>("Drone");
            
        }
        
        public List<Drone> Get()
        {
            try
            {
                // 필드 선택 정의, 원하는 필드만 선택하기 위한 목적으로 사용
                ProjectionDefinition<Drone> projection = Builders<Drone>.Projection
                    .Exclude(d => d._id)
                    .Exclude(d => d.DroneTrails);
            
                // _droneCollection 으로 모든 Document 가져와서 .Find() 메서드에 빈 BsonDcoumet를 사용하여 모든 문서 선택
                List<Drone> drones = _droneCollection.Find(new BsonDocument())  // BsonDocument는 MongoDB형식으로(Binary JSON) 데이터를 나타내는 클래스
                    .Project<Drone>(projection) //선택한 필드만 가져오기
                    .ToList();  // 선택한 필드를 포함하는 Drone 문서의 목록을 List 형태로 반환
            
                return drones;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching drone data from MongoDB.");
                throw;  // 오류를 호출자에게 전달
            }
        }

        public List<string> GetDroneIds()
        {
            try
            {
                var distinctiDroneIds = _droneCollection.Distinct<string>("DroneId", new BsonDocument()).ToList();
                return distinctiDroneIds;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching drone data from MongoDB.");
                throw;
            }
        }
        
        public Drone GetDroneByDroneId(string droneId)
        {
            try
            {
                ProjectionDefinition<Drone> projection = Builders<Drone>.Projection
                    .Exclude(d => d._id)
                    .Exclude(d => d.DroneTrails);
                
                FilterDefinition<Drone> filter = Builders<Drone>.Filter.Eq("DroneId", droneId);
                Drone drone = _droneCollection.Find(filter) .Project<Drone>(projection).FirstOrDefault();
                return drone;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching drone data from MongoDB.");
                throw;
            }
        }
    }
}


using MAVSDK;

namespace kisa_gcs_system.Interfaces;

public class DroneCommunication
{
    private DroneConnectionProtocol Protocol;
    private string Address;

    public DroneCommunication(DroneConnectionProtocol protocol, string address)
    {
        Protocol = protocol;
        Address = address;
    }
}

public enum DroneConnectionProtocol
{
    UDP,
    TCP,
    SERIAL,
}

public class DroneMessage
{
    public string? DroneId;
    public bool? IsOnline;
    public List<MavlinkLog> DroneLogger = new ();
    public double[]? WayPointsDistance = [];
    public DroneStt? DroneStt = new DroneStt();
    public DroneTrack? DroneTrack = new DroneTrack();
    public DroneCamera? DroneCamera = new DroneCamera();
    public DroneMission? DroneMission = new DroneMission();
    public CommunicationLink? CommunicationLink = new CommunicationLink();
    public SensorData? SensorData = new SensorData();
    // public bool? HasDeliverPlan = false;
}

public struct MavlinkLog
{
    public DateTime logtime;
    public string message;
}

public class DroneStt
{
    public double? WayPointNum = 0.0;
    public double? PowerV = 0.0;
    public double? BatteryStt = 0.0;
    public char? GpsStt = ' ';
    public double? TempC = 0.0;
    public char? LoaderLoad = ' ';
    public char? LoaderLock = ' ';
    public double? Lat = 0.0;
    public double? Lon = 0.0;
    public double? Alt = 0.0;
    public double? Head = 0.0;
    public double? Speed = 0.0;
    public double? ROLL_ATTITUDE = 0.0;
    public double? PITCH_ATTITUDE = 0.0;
    public double? YAW_ATTITUDE = 0.0;
    public char? HoverStt = ' ';
    public double? HODP = 0.0;
    public CustomMode?  FlightMode = 0;
    public double? SatCount = 0.0;
    public double? MabSysStt = 0.0;
    public SensorStt SensorStt = new SensorStt();
    public Mavlinkinfo Mavlinkinfo = new Mavlinkinfo();
}

public class SensorStt
{
    public string? Name;
    public bool? Enabled;
    public bool? Present;
    public bool? Health;
}

public class Mavlinkinfo
{
    public string? FrameType;
    public string? Ros;
    public string? FC_HARDWAR;
    public string? Autopilot;
    public string? CommunicationOut;
}


public class DroneCamera
{
    public char? FWD_CAM_STATE;
    public string? CameraIp;
    public string? CameraUrl1;
    public string? CameraUrl2;
    public string? CameraProtocolType;
}

public class DroneMission
{
    public string? MavMission;
    public DateTime? StartTime = DateTime.Now;
    public DateTime? CompleteTime = DateTime.Now;
}

public class DroneTrack
{
    public double? PathIndex;
    public FixedSizedQueue<CurrentGisLocation> DroneTrails = new(600);
    public double[]? DroneProgress;
    public double[]? DroneProgressPresentation;
    public double? TotalDistance = 0.0;
    public double? ElapsedDistance = 0.0;
    public double? RemainDistance = 0.0;
}

public class CommunicationLink
{
    public double? ConnectionProtocol;
    public double? MessageProtocol;
    public string? Address;
}

public class SensorData
{
    public double roll_ATTITUDE = 0.0;
    public double pitch_ATTITUDE = 0.0;
    public double yaw_ATTITUDE = 0.0;
    public double xacc_RAW_IMU = 0.0;
    public double yacc_RAW_IMU = 0.0;
    public double zacc_RAW_IMU = 0.0;
    public double xgyro_RAW_IMU = 0.0;
    public double ygyro_RAW_IMU = 0.0;
    public double zgyro_RAW_IMU = 0.0;
    public double xmag_RAW_IMU = 0.0;
    public double ymag_RAW_IMU = 0.0;
    public double zmag_RAW_IMU = 0.0;
    public double vibration_x_VIBRATION = 0.0;
    public double vibration_y_VIBRATION = 0.0;
    public double vibration_z_VIBRATION = 0.0;
    public double accel_cal_x_SENSOR_OFFSETS = 0.0;
    public double accel_cal_y_SENSOR_OFFSETS = 0.0;
    public double accel_cal_z_SENSOR_OFFSETS = 0.0;
    public double mag_ofs_x_SENSOR_OFFSETS = 0.0;
    public double mag_ofs_y_SENSOR_OFFSETS = 0.0;
    public double vx_GLOBAL_POSITION_INT = 0.0;
    public double vy_GLOBAL_POSITION_INT = 0.0;
    public double x_LOCAL_POSITION_NED = 0.0;
    public double vx_LOCAL_POSITION_NED = 0.0;
    public double vy_LOVAL_POSITION_NED = 0.0;
    public double nav_pitch_NAV_CONTROLLER_OUTPUT = 0.0;
    public double nav_bearing_NAV_CONTROLLER_OUTPUT = 0.0;
    public double servo3_raw_SERVO_OUTPUT_RAW = 0.0;
    public double servo8_raw_SERVO_OUTPUT_RAW = 0.0;
    public double groundspeed_VFR_HUD = 0.0;
    public double airspeed_VFR_HUD = 0.0;
    public double press_abs_SCALED_PRESSURE = 0.0;
    public double Vservo_POSER_STATUS = 0.0;
    public double voltages1_BATTERY_STATUS = 0.0;
    public double chancount_RC_CHANNELS = 0.0;
    public double chan12_raw_RC_CHANNELS = 0.0;
    public double chan13_raw_RC_CHANNELS = 0.0;
    public double chan14_raw_RC_CHANNELS = 0.0;
    public double chan15_raw_RC_CHANNELS = 0.0;
    public double chan16_raw_RC_CHANNELS = 0.0;
}
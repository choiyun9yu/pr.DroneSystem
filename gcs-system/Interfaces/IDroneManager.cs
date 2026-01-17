using DotNetty.Transport.Channels;
using DotNetty.Transport.Channels.Sockets;
using gcs_system.MAVSDK;

namespace gcs_system.Interfaces;
public interface ISignalRHub;

public interface IDroneManager
{
    Task GetDroneList();
    Task SelectDrone(string selectedDroneId);
    Task UpdateDroneLogger(string text);
    Task HandleMavlinkMessage(IChannelHandlerContext ctx, MAVLink.MAVLinkMessage msg);
    Task HandleDroneFlightMode(FlightMode flightMode);
    Task HandleDroneFlightCommand(FlightCommand flightCommand);
    Task HandleDroneJoystick(ArrowButton arrow);
    Task HandleControlJoystick(ArrowButton arrow);
    Task HandleMoveBtn(double lat, double lng);
    Task HandleDroneMoveToBase();
    Task HandleAlertToChatbotAsync();
    void AutoFlightFunc();
    void HandleDroneStartMarking(double lat, double lng);
    void HandleDroneTargetMarking(double lat, double lng);
    void HandleMissionAlt(short missionalt);
    void StartMission();
    void CompleteMission(string droneId);
    
    Task SendCommandAsync(MAVLink.MAVLinkMessage msg);
    DatagramPacket EncodeUdpDroneMessage(MAVLink.MAVLinkMessage msg);
    Task DisconnectAsync();
}

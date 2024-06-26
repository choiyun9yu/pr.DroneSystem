using System.Net;
using DotNetty.Transport.Channels;
using gcs_system.Interfaces;
using gcs_system.MAVSDK;

namespace gcs_system.Services.Helper;

public class MavlinkMission()
{
    private IChannelHandlerContext? _context;
    private IPEndPoint? _droneAddress;
    private readonly MavlinkEncoder _encoder = new();
    private readonly MAVLink.MavlinkParse _parser = new();

    private List<MAVLink.mavlink_mission_item_int_t> _missionItems = new();
    private ushort _requestCount;
    private ushort _requestSeq;
    private DroneState _droneState;
    
    private bool _isMission = false;
    private bool _isResponse = false;
    private MAVLink.MAVLINK_MSG_ID _waitMsgId = MAVLink.MAVLINK_MSG_ID.MISSION_ACK;
    private string _messageType = "";  
    
    private double WAIT_TIME = 1500;
    private int MAX_RETRY_COUNT = 4;
    
    public async Task WaitforResponseAsync(IChannelHandlerContext ctx, IPEndPoint addr, MAVLink.MAVLinkMessage msg)
    {
        _context = ctx;
        _droneAddress = addr;
        
        // 초기화 
        _isMission = true;
        _isResponse = false;
        _waitMsgId = MAVLink.MAVLINK_MSG_ID.MISSION_ACK;
        _messageType = "";

        // 보내는 메시지에 따라 설정
        switch ((MAVLink.MAVLINK_MSG_ID)msg.msgid)
        {
            case MAVLink.MAVLINK_MSG_ID.MISSION_COUNT:
            {
                // 메시지 보내기
                Console.WriteLine($"Send MISSION_COUNT  ");
                _messageType = "UploadMissionItems";
                _waitMsgId = MAVLink.MAVLINK_MSG_ID.MISSION_REQUEST;
                break;
            }
            case MAVLink.MAVLINK_MSG_ID.MISSION_ITEM_INT:
            {
                _messageType = "UploadMissionItems";
                _waitMsgId = MAVLink.MAVLINK_MSG_ID.MISSION_REQUEST;
                break;
            }
            case MAVLink.MAVLINK_MSG_ID.MISSION_REQUEST_LIST:
            {
                Console.WriteLine("Send MISSION_REQUEST_LIST!");
                _messageType = "ClearMissionItems";
                _waitMsgId = MAVLink.MAVLINK_MSG_ID.MISSION_COUNT;
                break;
            }
            case MAVLink.MAVLINK_MSG_ID.MISSION_REQUEST_INT:
            {
                Console.WriteLine($"Send mission_request_int({_requestSeq})");
                _messageType = "DownloadMissionItems";
                _waitMsgId = MAVLink.MAVLINK_MSG_ID.MISSION_ITEM_INT;
                break;
            }
            case MAVLink.MAVLINK_MSG_ID.MISSION_ACK:
            {
                Console.WriteLine("Send MISSION_ACK!");
                _messageType = "UploadMissionAck";
                break;
            }
            case MAVLink.MAVLINK_MSG_ID.MISSION_CLEAR_ALL:
            {
                Console.WriteLine("Send MISSION_CLEAR_ALL!");
                _messageType = "ClearMissionItems";
                _waitMsgId = MAVLink.MAVLINK_MSG_ID.MISSION_ACK;
                break;
            }
        }

        // 메시지 보내기
        await _encoder.SendCommandAsync(_context, _droneAddress, msg);
        
        // 비동기 작업 완료 대기 객체 설정
        var waitTaskCompletionSource = new TaskCompletionSource<bool>();
        var timeOutTask = Task.Delay(TimeSpan.FromMilliseconds(WAIT_TIME));
        
        // 재시도 횟수를 고려하여 응답 대기 
        for (int retryCount = 0; retryCount <= MAX_RETRY_COUNT; retryCount++)
        {
            await Task.WhenAny(waitTaskCompletionSource.Task, timeOutTask);

            if (_isResponse)
            {
                waitTaskCompletionSource.TrySetResult(true);
                break;
            }
            
            if (retryCount >= MAX_RETRY_COUNT)
            {
                Console.WriteLine("최대 재시도 횟수 초과");
                waitTaskCompletionSource.TrySetResult(true);
                break;
            }
            
            Console.WriteLine(retryCount + 1 + " 번 째 재시도");
            await _encoder.SendCommandAsync(_context, _droneAddress, msg); 
        }
    }
    
    public async void UpdateMissionState(MAVLink.MAVLinkMessage msg)
    {
        var msgid = (MAVLink.MAVLINK_MSG_ID)msg.msgid;
        if (_isMission && msgid == _waitMsgId || msgid == MAVLink.MAVLINK_MSG_ID.MISSION_ACK)
        {
            // 재시도 끝내는 트리거
            _isResponse = true;

            switch ((MAVLink.MAVLINK_MSG_ID)msg.msgid)
            {
                case MAVLink.MAVLINK_MSG_ID.MISSION_REQUEST:
                {
                    var data = (MAVLink.mavlink_mission_request_t)msg.data;
                    Console.WriteLine($"Receive mission_request({data.seq})");
                    Console.WriteLine("-------------------------------------");
                    await SendMavMissionSeq(data.seq);
                    break;
                }
                case MAVLink.MAVLINK_MSG_ID.MISSION_REQUEST_INT:
                {
                    var data = (MAVLink.mavlink_mission_request_int_t)msg.data;
                    Console.WriteLine($"Receive mission_request_int ({data.seq})");
                    Console.WriteLine("-------------------------------------");
                    await SendMavMissionSeq(data.seq);
                    break;
                }
                case MAVLink.MAVLINK_MSG_ID.MISSION_COUNT:
                {
                    var data = (MAVLink.mavlink_mission_count_t)msg.data;
                    _requestCount = data.count;
                    _requestSeq = 0;
                    Console.WriteLine($"Receive mavlink_mission_count({data.count})");
                    Console.WriteLine("-------------------------------------");
                    await SendMissionRequest(msg.sysid);
                    break;
                }
                case MAVLink.MAVLINK_MSG_ID.MISSION_ITEM_INT:
                {
                    var data = (MAVLink.mavlink_mission_item_int_t)msg.data;
                    
                    Console.WriteLine($"Receive mavlink_mission_item_int({data.seq})");
                    Console.WriteLine("-------------------------------------");
                    
                    _requestSeq++;
    
                    if (_requestCount > _requestSeq)
                    {
                        await SendMissionRequest(msg.sysid);
                    }
                    else
                    {                   
                        _requestSeq = 0;
                        var missionAckBody = new MAVLink.MAVLinkMessage(
                            _parser.GenerateMAVLinkPacket20(
                                MAVLink.MAVLINK_MSG_ID.MISSION_ACK,
                                new MAVLink.mavlink_mission_ack_t
                                {
                                    target_system = msg.sysid,
                                    mission_type = (byte)MAVLink.MAV_MISSION_TYPE.MISSION,
                                    type = (byte)MAVLink.MAV_MISSION_RESULT.MAV_MISSION_ACCEPTED
                                }
                            )
                        );
                        Console.WriteLine($"Send mavlink_mission_ack");
                        Console.WriteLine("임무 받기 완료");
                        Console.WriteLine("-------------------------------------");
                        await _encoder.SendCommandAsync(_context, _droneAddress, missionAckBody);
                    }
                    break;
                }
                case MAVLink.MAVLINK_MSG_ID.MISSION_ITEM:
                {
                    var data = (MAVLink.mavlink_mission_item_t)msg.data;
                    Console.WriteLine($"Receive mavlink_mission_item({data.seq})");
                    Console.WriteLine("-------------------------------------");
                    break;
                }
                case MAVLink.MAVLINK_MSG_ID.MISSION_ACK:
                {
                    var data = (MAVLink.mavlink_mission_ack_t)msg.data;
                    Console.WriteLine("Receive mission_ack");
                    HandleMissionAct(data);
                    break;
                }
            }
        }
    }

    private async Task SendMissionRequest(byte targetSys)
    {
        _isResponse = false;
        _waitMsgId = MAVLink.MAVLINK_MSG_ID.MISSION_ITEM;
        
        var missionRequstMsg = new MAVLink.MAVLinkMessage(
            _parser.GenerateMAVLinkPacket20(
                MAVLink.MAVLINK_MSG_ID.MISSION_REQUEST_INT,
                new MAVLink.mavlink_mission_request_int_t
                {
                    target_system = targetSys,
                    mission_type = (byte)MAVLink.MAV_MISSION_TYPE.MISSION,
                    seq = _requestSeq
                }));
        
        await WaitforResponseAsync(_context, _droneAddress, missionRequstMsg);
    }
    
    public void SetMissionItems(string? droneId, double x, double y, List<DroneLocation> missionTransits, int alt, int missionCount)
    {
        MAVLink.mavlink_mission_item_int_t firstBody = new MAVLink.mavlink_mission_item_int_t
        {
            seq = 0,
            target_system = byte.Parse(droneId),
            mission_type = (byte)MAVLink.MAV_MISSION_TYPE.MISSION,
            command = 16,
        };
        _missionItems.Add(firstBody);
        
        MAVLink.mavlink_mission_item_int_t takeoffBody = new MAVLink.mavlink_mission_item_int_t
        {
            seq = 1,
            target_system = byte.Parse(droneId),
            mission_type = (byte)MAVLink.MAV_MISSION_TYPE.MISSION,
            command = (byte)MAVLink.MAV_CMD.TAKEOFF,
            frame = 6,
            x = 0,
            y = 0,
            z = alt,           
        };
        _missionItems.Add(takeoffBody);
        
        for (int i = 0; i < missionTransits.Count; i++)
        {
            var points = missionTransits[i];
            // Console.WriteLine($"Waypoint {i + 1}: (lat: {points.lat}, lng: {points.lng})");
            
            MAVLink.mavlink_mission_item_int_t waypointBody = new MAVLink.mavlink_mission_item_int_t
            {
                seq = (ushort)(i+2),
                target_system = byte.Parse(droneId),
                mission_type = (byte)MAVLink.MAV_MISSION_TYPE.MISSION,
                command = (byte)MAVLink.MAV_CMD.WAYPOINT,
                frame = (byte)MAVLink.MAV_FRAME.GLOBAL_RELATIVE_ALT,
                x = (int)Math.Round(points.lat * 10000000),
                y = (int)Math.Round(points.lng * 10000000),
                z = alt,           
            };
            _missionItems.Add(waypointBody);
        }

        MAVLink.mavlink_mission_item_int_t landBody = new MAVLink.mavlink_mission_item_int_t     
        {
            seq = (ushort)missionCount,
            target_component = byte.Parse(droneId),
            mission_type = (byte)MAVLink.MAV_MISSION_TYPE.MISSION,
            command = (byte)MAVLink.MAV_CMD.LAND,  
            frame = (byte)MAVLink.MAV_FRAME.MISSION,
            x = 0,
            y = 0,
            z = 0
        };
        _missionItems.Add(landBody);

        // To Check MissionItems
        // foreach (var e in _missionItems)
        // {
        //     Console.Write("seq: " + JsonConvert.SerializeObject(e.seq));
        //     Console.Write(", command: " + JsonConvert.SerializeObject(e.command));
        //     Console.Write(", x: " + JsonConvert.SerializeObject(e.x));
        //     Console.Write(", y: " + JsonConvert.SerializeObject(e.y));
        //     Console.Write(", z: " + JsonConvert.SerializeObject(e.z));
        //     Console.WriteLine(", frame: " + JsonConvert.SerializeObject(e.frame));
        // }

    }
    
    private async Task SendMavMissionSeq(ushort seq)
    {
        var missionItemMsg = new MAVLink.MAVLinkMessage(_parser.GenerateMAVLinkPacket20(
            MAVLink.MAVLINK_MSG_ID.MISSION_ITEM_INT, _missionItems[seq]));

        // To Check Mission Item Params
        Console.WriteLine($"Send mission_item_int({seq})");
        Console.WriteLine("-------------------------------------");
        Console.WriteLine($"seq: {_missionItems[seq].seq}");
        Console.WriteLine($"command: {_missionItems[seq].command}");
        Console.WriteLine($"target_sys: {_missionItems[seq].target_system}");
        Console.WriteLine($"target_component: {_missionItems[seq].target_component}");
        Console.WriteLine($"mission_type: {_missionItems[seq].mission_type}");
        Console.WriteLine($"auto_continue: {_missionItems[seq].autocontinue}");
        Console.WriteLine($"current: {_missionItems[seq].current}");
        Console.WriteLine($"frame: {_missionItems[seq].frame}");
        Console.WriteLine($"x: {_missionItems[seq].x}");
        Console.WriteLine($"y: {_missionItems[seq].y}");
        Console.WriteLine($"z: {_missionItems[seq].z}");
        // Console.WriteLine($"pram1: {_missionItems[seq].param1}");
        // Console.WriteLine($"pram2: {_missionItems[seq].param2}");
        // Console.WriteLine($"pram3: {_missionItems[seq].param3}");
        // Console.WriteLine($"pram4: {_missionItems[seq].param4}");
        
        await WaitforResponseAsync(_context, _droneAddress, missionItemMsg);
    }
    
    private void HandleMissionAct(MAVLink.mavlink_mission_ack_t act)
    {
        if ((MAVLink.MAV_MISSION_RESULT)act.type == MAVLink.MAV_MISSION_RESULT.MAV_MISSION_ACCEPTED)
        {
            Console.WriteLine("임무 수락");
            Console.WriteLine("-------------------------------------");
            _isResponse = true;
            _isMission = false;
            _messageType = "";
            _missionItems = new();
        }
        if ((MAVLink.MAV_MISSION_RESULT)act.type == MAVLink.MAV_MISSION_RESULT.MAV_MISSION_ERROR)
        {
            Console.WriteLine("임무 에러");
            Console.WriteLine("-------------------------------------");
            _isResponse = true;
            _isMission = false;
            _messageType = "";
            _missionItems = new();
        }
        if ((MAVLink.MAV_MISSION_RESULT)act.type == MAVLink.MAV_MISSION_RESULT.MAV_MISSION_OPERATION_CANCELLED)
        {
            Console.WriteLine("임무 취소");
            Console.WriteLine("-------------------------------------");
            _isResponse = true;
            _isMission = false;
            _messageType = "";
            _missionItems = new();
        }
        if ((MAVLink.MAV_MISSION_RESULT)act.type == MAVLink.MAV_MISSION_RESULT.MAV_MISSION_UNSUPPORTED_FRAME)
        {
            Console.WriteLine("지원하지 않는 프레임");
            Console.WriteLine("-------------------------------------");
            _isResponse = true;
            _isMission = false;
            _messageType = "";
            _missionItems = new();
        }
    }
}
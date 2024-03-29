namespace gcs_system.Interfaces;

public class Joystic;

public enum FlightMode : int
{
    STABILIZE = 0,
    ACRO = 1,
    ALT_HOLD = 2,
    AUTO = 3,
    GUIDED = 4,
    LOITER = 5,
    RTL = 6,
    CIRCLE = 7,
    LAND = 9,
    DRIFT = 11,
    SPORT = 13,
    FLIP = 14,
    AUTOTUNE = 15,
    POSHOLD = 16,
    BRAKE = 17,
    THROW = 18,
    AVOID_ADSB = 19,
    GUIDED_NOGPS = 20,
    SMART_RTL = 21,
    FOLLOWHOLD = 22,
    FOLLOW = 23,
    ZIGZAG = 24,
    SYSTEMID = 25,
    AUTOROTATE = 26,
};

public enum FlightCommand : int
{
    ARM = 0,
    DISARM = 1,
    TAKEOFF = 2,
    LAND= 3,
}

public enum ArrowButton
{
    UP,
    DOWN,
    LEFT,
    RIGHT
}
DANIEL_PHONE_TYPE = 1
GILI_PHONE_TYPE = 2
IRIS_PHONE_TYPE = 3
YOSSI_PHONE_TYPE = 4
SHAKED_PHONE_TYPE = 5
SHAHAR_PHONE_TYPE = 6

family_phones = {
    "62:2B:BF:27:DD:08": "shaked",
    "36:08:AF:B7:D7:45": "daniel",
    "BC:A5:8B:57:7C:52": "iris",
    "AC:AF:B9:37:A5:28": "yossi",
    "00:FA:21:29:97:40": "gilli",
    "F4:60:E2:A3:F8:CE": "shahar",
}

ROOMS_NAMES = ['החדר של דניאל', 'החדר של שקד', 'החדר של גילי', 'החדר של איריס ויוסי', 'קומה תחתונה', 'קומה עליונה']

DEFAULT_GATEWAY = "10.0.0.138"
HUB_IP = "localhost"

PORT_KEY = "port"
HOST_KEY = "host"

WIFI_SERVICE = {
    PORT_KEY: 8080,
    HOST_KEY: HUB_IP
}

HUB_SERVICE = {
    PORT_KEY: 5000,
    HOST_KEY: HUB_IP,
}

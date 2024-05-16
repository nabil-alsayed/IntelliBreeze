export const FAN_SPEED = {
    TOPIC: "/intellibreeze/sensor/fanspeed",
    TOPIC_NAME: "FAN SPEED",
    MIN_SPEED_LIMIT: 1,
    MAX_SPEED_LIMIT: 100
}

export const AUTO_MODE = {
    CYCLE: {
        TOPIC: "/intellibreeze/sensor/automatic/fanspeed",
        TOPIC_NAME: "AUTO FAN SPEED CYCLES",
    }
}
export const TEMPERATURE = {
    thresholds: {
        PREF_TEMP_PUB_TOPIC: "/intellibreeze/app/temperature",
        HIGH_THRESHOLD_PUB_TOPIC: "/intellibreeze/app/highThreshold",
        MED_THRESHOLD_PUB_TOPIC: "/intellibreeze/app/mediumThreshold",
    },
    documentId: 'aIPlgZv2kTA4axiMAnw5',
    dbPath: 'temperatureThresholds'
}

export const MODES = {
    AUTO_MODE: {
        ID: "auto"
    },
}

export const SLIDER_VALUES = {
    preferredTemp: 23,
    mediumDefaultThreshold: 25,
    highDefaultThreshold: 27
}

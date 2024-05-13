import {collection} from "firebase/firestore";
import {db} from "../firebaseConfig";

export const FAN_SPEED = {
    TOPIC: "/intellibreeze/sensor/fanspeed",
    TOPIC_NAME: "FAN SPEED",
    MIN_SPEED_LIMIT: 1,
    MAX_SPEED_LIMIT: 100
}

export const TEMPERATURE = {
    thresholds: {
        HIGH_THRESHOLD_PUB_TOPIC: "/intellibreeze/app/highThreshold",
        MED_THRESHOLD_PUB_TOPIC: "/intellibreeze/app/mediumThreshold",
    }
}

export const MODES = {
    AUTO_MODE: {
        ID: "auto"
    },
}

export const SLIDER_VALUES = {
    mediumDefaultThreshold: 25,
    highDefaultThreshold: 27
}


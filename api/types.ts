export interface EventData {
    RoomId: number;
    ShortId: number;
    Name: string;
    Title: string;
    AreaNameParent: string;
    AreaNameChild: string;
    Recording: boolean;
    Streaming: boolean;
    DanmakuConnected: boolean;
}

export interface SessionStartedEventData extends EventData {
    SessionId: string;
}

export interface FileOpeningEventData extends EventData {
    RelativePath: string;
    FileOpenTime: string;
    SessionId: string;
}

export interface FileClosedEventData extends EventData {
    RelativePath: string;
    FileSize: number;
    Duration: number;
    FileOpenTime: string;
    FileCloseTime: string;
    SessionId: string;
}

export interface SessionEndedEventData extends EventData {
    SessionId: string;
}

export interface StreamStartedEventData extends EventData {}

export interface StreamEndedEventData extends EventData {}

export interface WebhookBody {
    EventType: 'SessionStarted' | 'FileOpening' | 'FileClosed' | 'SessionEnded' | 'StreamStarted' | 'StreamEnded';
    EventTimestamp: string;
    EventId: string;
    EventData: SessionStartedEventData | FileOpeningEventData | FileClosedEventData | SessionEndedEventData | StreamStartedEventData | StreamEndedEventData;
}
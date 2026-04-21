export const token = process.env.EXPO_PUBLIC_VIDEO_CALL;

interface CreateMeetingResponse {
  roomId: string;
}

export const createMeeting = async ({ token }: { token: string }): Promise<string> => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    throw new Error("Failed to create meeting");
  }

  const { roomId }: CreateMeetingResponse = await res.json();
  return roomId;
};

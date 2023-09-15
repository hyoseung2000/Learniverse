export const Media = ({
  stream,
  onJoinRoom,
}: {
  stream: MediaStream;
  onJoinRoom: () => void;
}) => {
  const { toggleAudio, toggleVideo } = useMediaStream(stream);

  return (
    <>
      <video srcObject={stream} />
      <button type="button" onClick={toggleVideo}>
        Toggle video
      </button>
      <button type="button" onClick={toggleAudio}>
        Toggle audio
      </button>
      <button type="button" onClick={onJoinRoom}>
        Join
      </button>
    </>
  );
};

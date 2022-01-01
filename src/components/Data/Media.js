import MediaPrev from "../Previews/MediaPrev";

function Media({ media }) {
  return (
    <div>
      {media.map((med) => (
        <MediaPrev medium={med} />
      ))}
    </div>
  );
}

export default Media;

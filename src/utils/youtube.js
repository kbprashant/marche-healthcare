// src/utils/youtube.js
export function getYouTubeId(url = "") {
  const m = String(url).match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([\w-]{11})/
  );
  return m ? m[1] : "";
}

export function ytThumb(id, prefer = "max") {
  if (!id) return "";
  return prefer === "max"
    ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    : `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

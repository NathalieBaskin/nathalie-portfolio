export default function ProjectCard({ src, title, caption }) {
  return (
    <li className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm hover:shadow-md transition">
      {/* Video */}
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-slate-100">
        <video className="h-full w-full" controls preload="metadata" playsInline>
          <source src={src} type="video/mp4" />
          Din webbläsare kan tyvärr inte spela upp videon.
        </video>
      </div>

      {/* Titel + text */}
      <h3 className="mt-4 text-xl font-bold text-black">{title}</h3>
      {caption && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{caption}</p>
      )}
    </li>
  );
}

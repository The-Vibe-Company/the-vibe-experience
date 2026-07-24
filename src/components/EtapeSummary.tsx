export default function EtapeSummary({
  livrable,
  reussite,
}: {
  livrable: string;
  reussite: string;
}) {
  return (
    <div className="livret">
      <div className="livret-row">
        <span className="se-l">Livrable</span>
        <p>{livrable}</p>
      </div>
      <div className="livret-row">
        <span className="se-l">Réussite</span>
        <p>{reussite}</p>
      </div>
    </div>
  );
}

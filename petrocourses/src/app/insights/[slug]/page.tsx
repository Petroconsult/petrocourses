export default function InsightDetail({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Insight: {params.slug}</h1>
    </div>
  );
}

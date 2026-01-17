export default function ResourceDetail({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Resource: {params.slug}</h1>
    </div>
  );
}

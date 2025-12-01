export default function CourseDetail({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Course: {params.slug}</h1>
    </div>
  );
}

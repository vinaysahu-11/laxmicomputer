function CourseCard({ name, instructor, duration, price }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-slate-900 mb-2">{name || 'Course Title'}</h3>
      <p className="text-slate-600 mb-2">
        <span className="font-semibold">Instructor:</span> {instructor || 'TBD'}
      </p>
      <p className="text-slate-600 mb-4">
        <span className="font-semibold">Duration:</span> {duration || '8 weeks'}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-blue-600">${price || '499'}</span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Enroll
        </button>
      </div>
    </div>
  );
}

export default CourseCard;

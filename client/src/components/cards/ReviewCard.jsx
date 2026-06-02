function ReviewCard({ name, rating, review }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          {name?.charAt(0) || 'U'}
        </div>
        <div className="ml-4">
          <h4 className="font-bold text-slate-900">{name || 'Student Name'}</h4>
          <div className="text-yellow-500 text-sm">
            {'★'.repeat(rating || 5)}
          </div>
        </div>
      </div>
      <p className="text-slate-600 italic">"{review || 'Great learning experience!'}"</p>
    </div>
  );
}

export default ReviewCard;

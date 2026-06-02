function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{title}</h2>
      {subtitle && <p className="text-slate-600">{subtitle}</p>}
    </div>
  );
}

export default SectionHeading;

export default function FeatureCard({ icon, title, description, items }) {
  return (
    <div className="bg-teal-50 rounded-lg p-6 shadow-sm">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="mb-2">{description}</p>
      <ul className="list-disc pl-5 text-sm text-gray-700">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

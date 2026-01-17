'use client';

interface FilterSidebarProps {
  selectedCategory: string;
  selectedSubCategory: string; // ✅ New prop
  selectedLevel: string;
  selectedDelivery: string;
  onCategoryChange: (category: string) => void;
  onSubCategoryChange: (subCategory: string) => void; // ✅ New callback
  onLevelChange: (level: string) => void;
  onDeliveryChange: (delivery: string) => void;
  onReset: () => void;
}

export default function FilterSidebar({
  selectedCategory,
  selectedSubCategory, // ✅ new prop
  selectedLevel,
  selectedDelivery,
  onCategoryChange,
  onSubCategoryChange, // ✅ new callback
  onLevelChange,
  onDeliveryChange,
  onReset,
}: FilterSidebarProps) {
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'upstream', label: 'Upstream' },
    { value: 'midstream', label: 'Midstream' },
    { value: 'downstream', label: 'Downstream' },
    { value: 'safety', label: 'Safety & HSE' },
    { value: 'management', label: 'Management' },
    { value: 'technical', label: 'Technical' },
  ];

 const subCategories = [
  { value: '', label: 'All Subcategories' },

  { value: 'general', label: 'General' },
  { value: 'executive', label: 'Executive' },
  { value: 'technical', label: 'Technical' },

  { value: 'liquefied_natural_gas', label: 'Liquefied Natural Gas (LNG)' },
  { value: 'compressed_natural_gas', label: 'Compressed Natural Gas (CNG)' },

  { value: 'accounting_finance', label: 'Accounting & Finance' },
  { value: 'commerce_economics_management', label: 'Commerce, Economics & Management' },

  { value: 'petroleum_engineering_production', label: 'Petroleum Engineering & Production' },
  { value: 'production_facilities_engineering', label: 'Production Facilities Engineering' },
  { value: 'reservoir_subsurface_engineering', label: 'Reservoir / Subsurface Engineering' },
];



  const levels = [
    { value: '', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const deliveryModes = [
    { value: '', label: 'All Modes' },
    { value: 'online', label: 'Online' },
    { value: 'in-person', label: 'In-Person' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  const hasActiveFilters = selectedCategory || selectedSubCategory || selectedLevel || selectedDelivery;

  return (
    <aside className="bg-black p-6 rounded-xl shadow-2xl sticky top-6 border border-gray-800/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800/50">
        <h2 className="text-xl font-bold text-white tracking-tight">Filters</h2>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-orange-500 hover:text-orange-400 font-medium transition-colors duration-300"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">

        {/* Category */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Category</h3>
          <div className="space-y-1.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 text-sm ${
                  selectedCategory === cat.value
                    ? 'bg-orange-600 text-white font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900/50 hover:border-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategory (only if category is upstream) */}
        {selectedCategory === 'upstream' && (
          <div className="border-t border-gray-800/50 pt-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Subcategory</h3>
            <div className="space-y-1.5">
              {subCategories.map((sub) => (
                <button
                  key={sub.value}
                  onClick={() => onSubCategoryChange(sub.value)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 text-sm ${
                    selectedSubCategory === sub.value
                      ? 'bg-orange-600 text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900/50 hover:border-gray-700'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Level */}
        <div className="border-t border-gray-800/50 pt-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Level</h3>
          <div className="space-y-3">
            {levels.map((lvl) => (
              <label key={lvl.value} className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="level"
                    value={lvl.value}
                    checked={selectedLevel === lvl.value}
                    onChange={(e) => onLevelChange(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                    selectedLevel === lvl.value
                      ? 'border-orange-600 bg-orange-600'
                      : 'border-gray-600 group-hover:border-orange-500'
                  }`}>
                    {selectedLevel === lvl.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                </div>
                <span className={`ml-3 transition-colors duration-300 text-sm ${
                  selectedLevel === lvl.value
                    ? 'text-white font-medium'
                    : 'text-gray-400 group-hover:text-gray-200'
                }`}>
                  {lvl.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Delivery Mode */}
        <div className="border-t border-gray-800/50 pt-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Delivery Mode</h3>
          <div className="space-y-3">
            {deliveryModes.map((mode) => (
              <label key={mode.value} className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedDelivery === mode.value}
                    onChange={() =>
                      onDeliveryChange(mode.value === selectedDelivery ? '' : mode.value)
                    }
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                    selectedDelivery === mode.value
                      ? 'border-orange-600 bg-orange-600'
                      : 'border-gray-600 group-hover:border-orange-500'
                  }`}>
                    {selectedDelivery === mode.value && (
                      <svg
                        className="w-full h-full text-white p-0.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                </div>
                <span className={`ml-3 transition-colors duration-300 text-sm ${
                  selectedDelivery === mode.value
                    ? 'text-white font-medium'
                    : 'text-gray-400 group-hover:text-gray-200'
                }`}>
                  {mode.label}
                </span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
}

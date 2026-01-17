'use client';

interface CourseFilterProps {
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

export default function CourseFilter({
  selectedCategory,
  selectedSubCategory, // ✅ new prop
  selectedLevel,
  selectedDelivery,
  onCategoryChange,
  onSubCategoryChange, // ✅ new callback
  onLevelChange,
  onDeliveryChange,
  onReset,
}: CourseFilterProps) {
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
    { value: '', label: 'All Delivery Modes' },
    { value: 'online', label: 'Online' },
    { value: 'in-person', label: 'In-Person' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  const hasActiveFilters = selectedCategory || selectedSubCategory || selectedLevel || selectedDelivery;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter Courses</h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Reset Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory - only shown if upstream */}
        {selectedCategory === 'upstream' && (
          <div>
            <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory
            </label>
            <select
              id="subCategory"
              value={selectedSubCategory}
              onChange={(e) => onSubCategoryChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {subCategories.map((sub) => (
                <option key={sub.value} value={sub.value}>
                  {sub.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Level */}
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
            Level
          </label>
          <select
            id="level"
            value={selectedLevel}
            onChange={(e) => onLevelChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {levels.map((lvl) => (
              <option key={lvl.value} value={lvl.value}>
                {lvl.label}
              </option>
            ))}
          </select>
        </div>

        {/* Delivery Mode */}
        <div>
          <label htmlFor="delivery" className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Mode
          </label>
          <select
            id="delivery"
            value={selectedDelivery}
            onChange={(e) => onDeliveryChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {deliveryModes.map((mode) => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

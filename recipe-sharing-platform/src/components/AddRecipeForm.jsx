import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle field blur to show validation errors
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name]);
  };

  // Validate individual field
  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'title':
        if (!value.trim()) {
          error = 'Recipe title is required';
        } else if (value.trim().length < 3) {
          error = 'Title must be at least 3 characters long';
        }
        break;

      case 'ingredients':
        if (!value.trim()) {
          error = 'Ingredients are required';
        } else {
          const ingredientsList = value.split('\n').filter((item) => item.trim());
          if (ingredientsList.length < 2) {
            error = 'Please add at least 2 ingredients (one per line)';
          }
        }
        break;

      case 'steps':
        if (!value.trim()) {
          error = 'Preparation steps are required';
        } else if (value.trim().length < 10) {
          error = 'Please provide more detailed preparation steps';
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));

    return error === '';
  };

  // Validate all fields
  const validateForm = () => {
    // eslint-disable-next-line no-unused-vars
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (!validateField(key, formData[key])) {
        isValid = false;
      }
    });

    // Mark all fields as touched
    setTouched({
      title: true,
      ingredients: true,
      steps: true,
    });

    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Process the form data
      const ingredientsList = formData.ingredients
        .split('\n')
        .filter((item) => item.trim())
        .map((item) => item.trim());

      const recipeData = {
        title: formData.title.trim(),
        ingredients: ingredientsList,
        steps: formData.steps.trim(),
        submittedAt: new Date().toISOString(),
      };

      console.log('Recipe submitted:', recipeData);

      // Show success message
      setSubmitStatus('success');

      // Reset form
      setFormData({
        title: '',
        ingredients: '',
        steps: '',
      });
      setErrors({});
      setTouched({});

      // Navigate to homepage after 1.5 seconds
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-blue-500 hover:text-blue-600 font-semibold mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Add New Recipe
          </h1>
          <p className="text-gray-600">
            Share your culinary creation with the community
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Success! </strong>
                <span className="block sm:inline">
                  Your recipe has been submitted successfully.
                </span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Error! </strong>
                <span className="block sm:inline">
                  Please correct the errors in the form.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Recipe Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Recipe Title
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    touched.title && errors.title
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                  }`}
                  placeholder="e.g., Homemade Pasta Carbonara"
                />
                {touched.title && errors.title && (
                  <p className="mt-2 text-sm text-red-600 flex items-start">
                    <svg
                      className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Ingredients */}
              <div>
                <label
                  htmlFor="ingredients"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Ingredients
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  Enter each ingredient on a new line (minimum 2 ingredients)
                </p>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="6"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                    touched.ingredients && errors.ingredients
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                  }`}
                  placeholder="400g spaghetti&#10;200g bacon&#10;4 eggs&#10;100g Parmesan cheese"
                />
                {touched.ingredients && errors.ingredients && (
                  <p className="mt-2 text-sm text-red-600 flex items-start">
                    <svg
                      className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.ingredients}
                  </p>
                )}
              </div>

              {/* Preparation Steps */}
              <div>
                <label
                  htmlFor="steps"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Preparation Steps
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  Describe the cooking process in detail
                </p>
                <textarea
                  id="steps"
                  name="steps"
                  value={formData.steps}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="8"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                    touched.steps && errors.steps
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                  }`}
                  placeholder="1. Boil water in a large pot&#10;2. Add pasta and cook until al dente&#10;3. Meanwhile, fry the bacon..."
                />
                {touched.steps && errors.steps && (
                  <p className="mt-2 text-sm text-red-600 flex items-start">
                    <svg
                      className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.steps}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Submit Recipe
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ title: '', ingredients: '', steps: '' });
                    setErrors({});
                    setTouched({});
                    setSubmitStatus(null);
                  }}
                  className="flex-1 sm:flex-initial bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>

          {/* Help Text */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Tips for a great recipe:
            </h3>
            <ul className="text-sm text-blue-700 space-y-1 ml-7">
              <li>• Be specific with measurements and cooking times</li>
              <li>• List ingredients in the order they'll be used</li>
              <li>• Break down complex steps into smaller, clear instructions</li>
              <li>• Include any special techniques or tips</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeForm;


// target.value
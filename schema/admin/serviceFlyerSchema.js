import * as Yup from 'yup';

// Validation schema for service flyer form
// Note: image_url and image_public_id are optional here because
// we handle image validation separately (checking for selectedFile OR existing image)
export const serviceFlyerSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters')
    .trim(),
    
  description: Yup.string()
    .nullable()
    .max(1000, 'Description must not exceed 1000 characters')
    .trim(),
    
  // Image fields are optional in schema - validated manually before submission
  image_url: Yup.string()
    .nullable()
    .url('Please provide a valid image URL'),
    
  image_public_id: Yup.string()
    .nullable(),
    
  target_audience: Yup.string()
    .required('Target audience is required')
    .oneOf(['client', 'healthworker', 'both'], 'Invalid target audience'),
    
  is_active: Yup.boolean()
    .default(true),
    
  sort_order: Yup.number()
    .integer('Sort order must be a whole number')
    .min(0, 'Sort order cannot be negative')
    .default(0),
});

// Initial values for the form
export const serviceFlyerInitialValues = {
  title: '',
  description: '',
  image_url: '',
  image_public_id: '',
  target_audience: 'both',
  is_active: true,
  sort_order: 0,
};

// Target audience options for form dropdown
export const targetAudienceOptions = [
  { value: 'both', label: 'Both (Clients & Health Workers)' },
  { value: 'client', label: 'Clients Only' },
  { value: 'healthworker', label: 'Health Workers Only' },
];

// Status filter options
export const statusFilterOptions = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

// Validation for search filters
export const filtersSchema = Yup.object().shape({
  search: Yup.string().trim(),
  target_audience: Yup.string().oneOf(['', 'client', 'healthworker', 'both']),
  status: Yup.string().oneOf(['', 'active', 'inactive']),
  page: Yup.number().integer().min(1).default(1),
  per_page: Yup.number().integer().min(1).max(100).default(15),
});
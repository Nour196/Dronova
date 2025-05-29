import React, { useState } from 'react';
import { orderService } from '../services/api';
import backgroundImage from '../assets/9a0553986999e55c6328537dd762ecf28ed94b90.jpg';
import formIcon from '../assets/form-icon-removebg-preview.png';

const Formulaire = () => {
  const [formData, setFormData] = useState({
    location: '',
    date: '',
    duration: '',
    description: '',
    field: '',
    drone: '',
    agree: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      setError({
        title: "Session expirée",
        message: "Votre session a expiré",
        details: "Veuillez vous reconnecter pour continuer"
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.agree) {
      setError({
        title: "Attention",
        message: "Veuillez accepter la politique de confidentialité",
        details: "Vous devez accepter les conditions pour continuer"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Format the date to match backend requirements
      const formattedDate = new Date(formData.date).toISOString();

      const orderData = {
        serviceType: formData.field,
        location: formData.location,
        scheduledDate: formattedDate,
        assignedDrone: formData.drone || '', // Make it optional as per backend schema
        description: formData.description,
        duration: formData.duration
      };

      console.log('Submitting order data:', orderData);
      
      const response = await orderService.createOrder(orderData);
      console.log('Order submission response:', response);
      
      setSuccessMessage({
        title: "Succès!",
        message: "Votre commande a été soumise avec succès.",
        details: "Nous vous contacterons bientôt pour confirmer votre commande."
      });
      
      // Reset form
      setFormData({
        location: '',
        date: '',
        duration: '',
        description: '',
        field: '',
        drone: '',
        agree: false
      });
    } catch (error) {
      console.error("Error creating order:", error);
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        if (error.response?.data?.message === "User not found") {
          setError({
            title: "Session invalide",
            message: "Votre session n'est plus valide",
            details: "Veuillez vous déconnecter et vous reconnecter"
          });
          // Clear invalid token
          localStorage.removeItem('token');
        } else {
          setError({
            title: "Session expirée",
            message: "Votre session a expiré",
            details: "Veuillez vous reconnecter pour continuer"
          });
        }
      } else if (error.response?.status === 403) {
        setError({
          title: "Accès refusé",
          message: "Vous n'avez pas les permissions nécessaires",
          details: "Seuls les clients peuvent soumettre des commandes"
        });
      } else if (error.response?.status === 400) {
        setError({
          title: "Données invalides",
          message: "Veuillez vérifier les informations saisies",
          details: error.response?.data?.message || "Certains champs sont invalides"
        });
      } else {
        setError({
          title: "Erreur",
          message: "Une erreur est survenue lors de la soumission de votre commande.",
          details: error.response?.data?.message || "Veuillez réessayer plus tard."
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-transparent backdrop-blur-lg p-8 rounded-xl max-w-4xl shadow-xl">
        <h1 className="text-black text-3xl mb-4">Client Form</h1>
        
        <div className="flex items-start gap-4 mb-10">
          <div className="text-sm mb-10">
            <p className="mb-2">
              Please fill out the form below to request a customized drone based
              on your specific needs. Make sure to provide accurate details to help us deliver the best solution for your project.
            </p>
            <p className="bg-blue-700 text-gray-200 px-1.5 py-0.5 text-xs mt-2">
              Please fill out all fields in the form carefully and then click "SUBMIT"
            </p>
          </div>
          <img src={formIcon} alt="Form Icon" className="w-24 h-auto" />
        </div>

        <form onSubmit={handleSubmit} className="bg-transparent p-6 rounded-lg">
          {/* Group 1 - Location */}
          <div className="flex gap-8 mb-8">
            <div className="w-48 relative pr-5">
              <h3 className="font-semibold text-lg mb-1">Location</h3>
              <p className="text-xs text-gray-600">Confirm your details for our records</p>
              <div className="absolute top-0 right-0 w-px h-40 bg-gray-300 opacity-30"></div>
            </div>
            
            <div className="flex-1">
              <div className="mb-2">
                <label htmlFor="location" className="block text-xs text-gray-600 mb-1">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="bg-white w-full px-1.5 py-1 border border-gray-300 rounded text-base focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <hr className="border-none h-px bg-gray-300 my-5" />

          {/* Group 2 - Service */}
          <div className="flex gap-8 mb-8">
            <div className="w-48 relative pr-5">
              <h3 className="font-semibold text-lg mb-1">Service</h3>
              <p className="text-xs text-gray-600">Enter the service information</p>
              <div className="absolute top-0 right-0 w-px h-40 bg-gray-300 opacity-30"></div>
            </div>
            
            <div className="flex-1">
              <div className="flex gap-16">
                <div className="flex-1">
                  <label htmlFor="date" className="block text-xs text-gray-600 mb-1">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="bg-white w-full px-1.5 py-1 border border-gray-300 rounded text-base focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div className="flex-1">
                  <label htmlFor="duration" className="block text-xs text-gray-600 mb-1">Duration</label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 2 hours, 30 minutes"
                    required
                    className="bg-white w-full px-1.5 py-1 border border-gray-300 rounded text-base focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Group 3 */}
          <div className="ml-56">
            <div className="mb-4">
              <label htmlFor="description" className="block text-xs text-gray-600 mb-1">Other Suggestions</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="bg-white w-full px-1.5 py-1 border border-gray-300 rounded text-base focus:border-blue-500 focus:outline-none min-h-20"
              ></textarea>
            </div>
            
            <div className="flex gap-16">
              <div className="flex-1">
                <label htmlFor="field" className="block text-xs text-gray-600 mb-1">Field</label>
                <select
                  id="field"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  required
                  className="bg-white w-full px-1.5 py-1 border border-gray-300 rounded text-base focus:border-blue-500 focus:outline-none"
                >
                  <option value="">-Select-</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="security">Security</option>
                  <option value="industry">Industry</option>
                  <option value="customise">Customise</option>
                </select>
              </div>
              
              <div className="flex-1">
                <label htmlFor="drone" className="block text-xs text-gray-600 mb-1">Drone</label>
                <input
                  type="text"
                  id="drone"
                  name="drone"
                  value={formData.drone}
                  onChange={handleChange}
                  className="bg-white w-full px-1.5 py-1 border border-gray-300 rounded text-base focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Checkbox and Submit */}
          <div className="mt-6 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
                className="mr-2"
              />
              <label htmlFor="agree" className="text-xs text-gray-600">
                I have read and agree to Donova{' '}
                <a href="#" className="text-blue-500">privacy policy</a> and{' '}
                <a href="#" className="text-blue-500">terms of service</a>.
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-lg block mx-auto transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'ENVOI EN COURS...' : 'SUBMIT'}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error.title}</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error.message}</p>
                    <p className="mt-1">{error.details}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">{successMessage.title}</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>{successMessage.message}</p>
                    <p className="mt-1">{successMessage.details}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Formulaire;
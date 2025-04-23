'use client'
import { useState, useRef } from 'react';
// import { useRouter } from 'next/router';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import useFeaturesStore from '@/stores/features'

export default function CreditApplicationForm() {
  const router = useRouter();
  const {  creditSlug } = {
    creditSlug: "credit"
  }
const creditTitle = "Demande de Crédit"
  // Form state
  const [formData, setFormData] = useState({
    motif: '',
    delaiRemboursement: '',
    montantPart: '',
    caution: '',
    descGage: '',
    valeurGage: '',
    termsAccepted: false
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedInput, setFocusedInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const {creditRequest} = useFeaturesStore();
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'info'
  });

  // Refs
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.motif.trim()) {
      newErrors.motif = 'Le motif du prêt est requis.';
    }
    
    if (!formData.delaiRemboursement.trim()) {
      newErrors.delaiRemboursement = 'Délai de remboursement requis (en mois).';
    } else if (isNaN(Number(formData.delaiRemboursement))) {
      newErrors.delaiRemboursement = 'Veuillez entrer un nombre valide.';
    } else if (Number(formData.delaiRemboursement) <= 0) {
      newErrors.delaiRemboursement = 'Le délai doit être supérieur à 0.';
    }
    
    if (formData.montantPart.trim() && isNaN(Number(formData.montantPart))) {
      newErrors.montantPart = 'Veuillez entrer un montant valide.';
    } else if (Number(formData.montantPart) < 0) {
      newErrors.montantPart = 'Le montant ne peut pas être négatif.';
    }
    
    if (formData.valeurGage.trim() && isNaN(Number(formData.valeurGage))) {
      newErrors.valeurGage = 'Veuillez entrer une valeur valide.';
    } else if (Number(formData.valeurGage) < 0) {
      newErrors.valeurGage = 'La valeur ne peut pas être négative.';
    }
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Vous devez accepter les termes et conditions.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const showModal = (title: string, message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setModalContent({ title, message, type });
    setModalVisible(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField && formRef.current) {
        const errorElement = formRef.current.querySelector(`[name="${firstErrorField}"]`);
        errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (errorElement as HTMLElement)?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        creditSlug,
        motif: formData.motif.trim(),
        delai_rembourssement: Number(formData.delaiRemboursement),
        montant: Number(formData.montantPart), 
        caution: formData.caution.trim() || null, 
        descGage: formData.descGage.trim() || null, 
        valeurGage: formData.valeurGage ? Number(formData.valeurGage) : null, 
        termsAccepted: formData.termsAccepted,
      };

      await creditRequest(payload);
      
      showModal(
        'Demande envoyée',
        'Votre demande de crédit a été soumise avec succès.',
        'success'
      );
      
      setFormData({
        motif: '',
        delaiRemboursement: '',
        montantPart: '',
        caution: '',
        descGage: '',
        valeurGage: '',
        termsAccepted: false
      });

    } catch (error: any) {
      let errorMessage = error?.response?.data[Object.keys(error?.response?.data)[0]]?.[0] || 
                       "Une erreur s'est produite lors de la soumission.";
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = "Données invalides. Veuillez vérifier les informations saisies.";
        } else if (error.response.status === 401) {
          errorMessage = "Session expirée. Veuillez vous reconnecter.";
        } else if (error.response.status === 500) {
          errorMessage = "Erreur serveur. Veuillez réessayer plus tard.";
        }
      }
      
      showModal('Erreur', errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInputField = (
    label: string,
    fieldName: string,
    placeholder: string,
    type = 'text',
    multiline = false,
    icon = ''
  ) => (
    <div className="mb-5">
      <div className="flex items-center mb-2">
        {icon && <i className={`${icon} mr-2 text-gray-600`}></i>}
        <label className="text-sm font-medium text-gray-600">{label}</label>
      </div>
      {multiline ? (
        <textarea
          name={fieldName}
          className={`w-full bg-gray-50 border rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            focusedInput === fieldName ? 'ring-2 ring-primary border-transparent' : 'border-gray-300'
          } ${
            errors[fieldName] ? 'border-red-500 ring-red-500' : ''
          }`}
          value={formData[fieldName as keyof typeof formData] as string}
          onChange={(e) => handleInputChange(fieldName, e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocusedInput(fieldName)}
          onBlur={() => setFocusedInput('')}
          disabled={isSubmitting}
          rows={4}
        />
      ) : (
        <input
          name={fieldName}
          type={type}
          className={`w-full bg-gray-50 border rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            focusedInput === fieldName ? 'ring-2 ring-primary border-transparent' : 'border-gray-300'
          } ${
            errors[fieldName] ? 'border-red-500 ring-red-500' : ''
          }`}
          value={formData[fieldName as keyof typeof formData] as string}
          onChange={(e) => handleInputChange(fieldName, e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocusedInput(fieldName)}
          onBlur={() => setFocusedInput('')}
          disabled={isSubmitting}
        />
      )}
      {errors[fieldName] && <p className="mt-1 text-sm text-red-600">{errors[fieldName]}</p>}
    </div>
  );

  return (
    <>
      <Head>
        <title>{creditTitle} | Mon Application</title>
      </Head>

      <div className="lg:w-[80%] w-full mx-auto p-5 bg-gray-50 min-h-screen">
        <form 
          ref={formRef} 
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          <h1 className="text-2xl font-bold text-gray-900">{creditTitle}</h1>
          <p className="text-gray-600 mb-8">Remplissez les informations pour soumettre votre demande.</p>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-primary mb-5">Informations sur le Prêt</h2>
            {renderInputField('Motif du prêt', 'motif', 'Ex: Financement études, achat véhicule...', 'text', false, 'fas fa-info-circle')}
            {renderInputField('Délai de remboursement (mois)', 'delaiRemboursement', 'Ex: 24', 'number', false, 'fas fa-calendar-alt')}
            {renderInputField('Montant (BIF)', 'montantPart', 'Ex: 500', 'number', false, 'fas fa-wallet')}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-primary mb-5">Garanties (Si applicable)</h2>
            {renderInputField('Personne ou organisme caution', 'caution', 'Nom du garant, type de garantie...', 'text', false, 'fas fa-user')}
            {renderInputField('Description détaillée du bien en gage', 'descGage', 'Marque, modèle, année, état...', 'text', true, 'fas fa-file-alt')}
            {renderInputField('Valeur estimée du gage (BIF)', 'valeurGage', 'Ex: 5000', 'number', false, 'fas fa-tag')}
          </div>

          <div className="flex items-center bg-white rounded-xl shadow-sm p-4 mt-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                disabled={isSubmitting}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary mr-3"></div>
            </label>
            <div className="ml-2 text-sm text-gray-600">
              <span className={errors.termsAccepted ? 'text-red-600' : ''}>
                j'ai lu et J'accepte  
                <button 
                  type="button" 
                  className="text-primary font-semibold hover:underline ml-1"
                  onClick={() => router.push(`/dashboard/payment-calender?loanAmount=${formData.montantPart}&loanTermMonths=${formData.delaiRemboursement}`)}
                  disabled={isSubmitting}
                >
                  la calendrier de paiement
                </button>.
              </span>
            </div>
          </div>
          {errors.termsAccepted && !formData.termsAccepted && (
            <p className="text-sm text-red-600 ml-4">{errors.termsAccepted}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-full text-white font-bold flex items-center justify-center transition-colors ${
              isSubmitting 
                ? 'bg-primary-400 cursor-not-allowed' 
                : 'bg-primary hover:bg-primary shadow-md hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                En cours...
              </>
            ) : (
              <>
                Soumettre ma demande
                <i className="fas fa-check-circle ml-2"></i>
              </>
            )}
          </button>
        </form>

        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`bg-white rounded-xl w-full max-w-md overflow-hidden ${
              modalContent.type === 'success' ? 'border-t-4 border-green-500' :
              modalContent.type === 'error' ? 'border-t-4 border-red-500' :
              'border-t-4 border-primary'
            }`}>
              <div className="p-6 text-center">
                <i className={`fas ${
                  modalContent.type === 'success' ? 'fa-check-circle text-green-500' :
                  modalContent.type === 'error' ? 'fa-times-circle text-red-500' :
                  'fa-info-circle text-primary'
                } text-5xl mb-4`}></i>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{modalContent.title}</h3>
                <p className="text-gray-600 mb-6">{modalContent.message}</p>
                <button
                  onClick={() => setModalVisible(false)}
                  className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                    modalContent.type === 'success' ? 'bg-green-500 hover:bg-green-600' :
                    modalContent.type === 'error' ? 'bg-red-500 hover:bg-red-600' :
                    'bg-primary hover:bg-primary'
                  }`}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
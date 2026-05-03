import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaUsers, FaUpload, FaCheckCircle, FaSpinner, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const Admission = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchingConfig, setFetchingConfig] = useState(true);
  const [config, setConfig] = useState(null);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    birthday: '',
    religion: '',
    mother_tongue: '',
    blood_group: '',
    class_id: '',
    section_id: '',
    father_name: '',
    father_phone: '',
    father_occupation: '',
    mother_name: '',
    mother_phone: '',
    mother_occupation: '',
    guardian_name: '',
    guardian_relation: '',
    guardian_phone: '',
    address: '',
  });
  
  const [studentPhoto, setStudentPhoto] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('https://scholaracademyglp.in/api/frontend/admission?branch_id=37');
        const result = await response.json();
        if ((result.status === 'success' || result.status === 'Success') && result.data) {
          setConfig(result.data);
          setClasses(result.data.classes || []);
        } else {
          console.error('API Error Details:', result);
        }
      } catch (error) {
        console.error('Error fetching admission config:', error);
      } finally {
        setFetchingConfig(false);
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      const cls = classes.find(c => c.id.toString() === selectedClass);
      setSections(cls ? cls.sections : []);
      setFormData(prev => ({ ...prev, class_id: selectedClass, section_id: '' }));
    } else {
      setSections([]);
    }
  }, [selectedClass, classes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setStudentPhoto(e.target.files[0]);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus({ type: '', message: '' });

    const submissionData = new FormData();
    Object.keys(formData).forEach(key => {
      submissionData.append(key, formData[key]);
    });
    if (studentPhoto) {
      submissionData.append('student_photo', studentPhoto);
    }
    submissionData.append('branch_id', '37');

    try {
      const response = await fetch('https://scholaracademyglp.in/api/frontend/submit_admission?branch_id=37', {
        method: 'POST',
        body: submissionData,
      });
      const result = await response.json();
      if (result.status === 'success') {
        setSubmitStatus({ type: 'success', message: result.message || 'Application submitted successfully!' });
        setStep(4);
      } else {
        setSubmitStatus({ type: 'error', message: result.message || 'Failed to submit application.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-12">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
            step >= item ? 'gradient-bg text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
          }`}>
            {step > item ? <FaCheckCircle /> : item}
          </div>
          {item < 3 && (
            <div className={`w-12 md:w-24 h-1 mx-2 rounded-full transition-all duration-500 ${
              step > item ? 'gradient-bg' : 'bg-slate-200 dark:bg-slate-800'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  if (fetchingConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 mesh-gradient">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black gradient-text mb-4 uppercase tracking-tighter">
            Admission Portal
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Begin your journey towards excellence. Fill out the application form below to apply for admission at Scholar Academy.
          </p>
        </motion.div>

        {step < 4 && renderStepIndicator()}

        <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 gradient-bg rounded-xl text-white shadow-lg">
                    <FaUser size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Student Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">First Name *</label>
                    <input 
                      name="first_name" required value={formData.first_name} onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-brand-blue focus:ring-2 ring-brand-blue/20 outline-none transition-all"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Last Name *</label>
                    <input 
                      name="last_name" required value={formData.last_name} onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-brand-blue focus:ring-2 ring-brand-blue/20 outline-none transition-all"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Gender *</label>
                    <select 
                      name="gender" required value={formData.gender} onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-brand-blue focus:ring-2 ring-brand-blue/20 outline-none transition-all appearance-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Date of Birth *</label>
                    <input 
                      type="date" name="birthday" required value={formData.birthday} onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-brand-blue focus:ring-2 ring-brand-blue/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Class *</label>
                    <select 
                      required value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-brand-blue focus:ring-2 ring-brand-blue/20 outline-none transition-all appearance-none"
                    >
                      <option value="">Select Class</option>
                      {classes.map(cls => (
                        <option key={cls.id} value={cls.id}>{cls.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Section *</label>
                    <select 
                      name="section_id" required value={formData.section_id} onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-brand-blue focus:ring-2 ring-brand-blue/20 outline-none transition-all appearance-none"
                      disabled={!selectedClass}
                    >
                      <option value="">Select Section</option>
                      {sections.map(sec => (
                        <option key={sec.id} value={sec.id}>{sec.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-8">
                  <button 
                    onClick={nextStep}
                    disabled={!formData.first_name || !formData.last_name || !formData.class_id}
                    className="flex items-center gap-2 px-10 py-4 gradient-bg text-white font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                  >
                    Next Step <FaArrowRight />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 gradient-bg rounded-xl text-white shadow-lg">
                    <FaUsers size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Guardian Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Father's Name *</label>
                    <input 
                      name="father_name" required value={formData.father_name} onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-brand-blue focus:ring-2 ring-brand-blue/20 outline-none transition-all"
                      placeholder="Enter father's name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Father's Phone *</label>
                    <input 
                      name="father_phone" required value={formData.father_phone} onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-brand-blue focus:ring-2 ring-brand-blue/20 outline-none transition-all"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Mother's Name *</label>
                    <input 
                      name="mother_name" required value={formData.mother_name} onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-brand-blue focus:ring-2 ring-brand-blue/20 outline-none transition-all"
                      placeholder="Enter mother's name"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">Permanent Address *</label>
                    <textarea 
                      name="address" required value={formData.address} onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-brand-blue focus:ring-2 ring-brand-blue/20 outline-none transition-all h-32"
                      placeholder="Enter complete address"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-8">
                  <button 
                    onClick={prevStep}
                    className="flex items-center gap-2 px-8 py-4 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                  >
                    <FaArrowLeft /> Previous
                  </button>
                  <button 
                    onClick={nextStep}
                    disabled={!formData.father_name || !formData.mother_name || !formData.address}
                    className="flex items-center gap-2 px-10 py-4 gradient-bg text-white font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                  >
                    Next Step <FaArrowRight />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 gradient-bg rounded-xl text-white shadow-lg">
                    <FaUpload size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Documents Upload</h2>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center hover:border-brand-blue transition-colors relative group">
                    <input 
                      type="file" accept="image/*" onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-4">
                      <div className="w-20 h-20 gradient-bg/10 text-brand-blue rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <FaUpload size={30} />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
                          {studentPhoto ? studentPhoto.name : 'Upload Student Photo'}
                        </p>
                        <p className="text-sm text-slate-500">JPG, PNG allowed (Max 2MB)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {submitStatus.type === 'error' && (
                  <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm font-bold text-center">
                    {submitStatus.message}
                  </div>
                )}

                <div className="flex justify-between pt-8">
                  <button 
                    onClick={prevStep}
                    className="flex items-center gap-2 px-8 py-4 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
                  >
                    <FaArrowLeft /> Previous
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 px-10 py-4 gradient-bg text-white font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {loading ? <FaSpinner className="animate-spin" /> : 'Submit Application'}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheckCircle size={50} />
                </div>
                <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Application Submitted!</h2>
                <p className="text-slate-600 dark:text-slate-400 font-medium max-w-md mx-auto">
                  {submitStatus.message} Our admission office will review your application and get back to you shortly.
                </p>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="px-10 py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Return to Home
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Admission;

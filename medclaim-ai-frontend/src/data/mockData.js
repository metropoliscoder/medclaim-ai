export const CLAIMS = [
  {
    id: 'CLM-2024-00891',
    patient: 'Robert Kim',
    type: 'Surgery',
    amount: 42850,
    submitted: '2024-06-01',
    status: 'Under Review',
    risk: 'high',
    provider: 'St. Mary\'s Medical Center',
    diagnosis: 'Appendectomy - Laparoscopic',
    icd: 'K35.80',
    aiScore: 78,
    flags: ['High amount', 'Prior auth missing', 'Out-of-network provider'],
    timeline: [
      { date: '2024-06-01', event: 'Claim submitted', type: 'submit' },
      { date: '2024-06-02', event: 'AI screening completed', type: 'ai' },
      { date: '2024-06-03', event: 'Assigned to analyst', type: 'assign' },
    ]
  },
  {
    id: 'CLM-2024-00890',
    patient: 'Linda Torres',
    type: 'Diagnostic',
    amount: 3200,
    submitted: '2024-05-30',
    status: 'Approved',
    risk: 'low',
    provider: 'LabCorp Diagnostics',
    diagnosis: 'MRI Brain without contrast',
    icd: 'G43.909',
    aiScore: 96,
    flags: [],
    timeline: [
      { date: '2024-05-30', event: 'Claim submitted', type: 'submit' },
      { date: '2024-05-31', event: 'AI screening completed', type: 'ai' },
      { date: '2024-06-01', event: 'Auto-approved', type: 'approve' },
    ]
  },
  {
    id: 'CLM-2024-00889',
    patient: 'David Osei',
    type: 'Medication',
    amount: 8920,
    submitted: '2024-05-28',
    status: 'Pending Info',
    risk: 'medium',
    provider: 'CVS Specialty Pharmacy',
    diagnosis: 'Biologics - Rheumatoid Arthritis',
    icd: 'M06.09',
    aiScore: 62,
    flags: ['Step therapy required', 'Documentation incomplete'],
    timeline: [
      { date: '2024-05-28', event: 'Claim submitted', type: 'submit' },
      { date: '2024-05-29', event: 'AI screening completed', type: 'ai' },
      { date: '2024-05-30', event: 'Additional info requested', type: 'info' },
    ]
  },
  {
    id: 'CLM-2024-00888',
    patient: 'Maria Santos',
    type: 'Emergency',
    amount: 15600,
    submitted: '2024-05-25',
    status: 'Approved',
    risk: 'low',
    provider: 'General Hospital ER',
    diagnosis: 'Acute myocardial infarction',
    icd: 'I21.09',
    aiScore: 94,
    flags: [],
    timeline: []
  },
  {
    id: 'CLM-2024-00887',
    patient: 'James Wilson',
    type: 'Therapy',
    amount: 1800,
    submitted: '2024-05-22',
    status: 'Denied',
    risk: 'medium',
    provider: 'MindWell Therapy',
    diagnosis: 'Cognitive Behavioral Therapy',
    icd: 'F33.1',
    aiScore: 44,
    flags: ['Session limit exceeded', 'Non-covered provider'],
    timeline: []
  },
  {
    id: 'CLM-2024-00886',
    patient: 'Priya Patel',
    type: 'Preventive',
    amount: 620,
    submitted: '2024-05-20',
    status: 'Approved',
    risk: 'low',
    provider: 'Wellness Clinic',
    diagnosis: 'Annual physical + labs',
    icd: 'Z00.00',
    aiScore: 99,
    flags: [],
    timeline: []
  },
];

export const STATS = {
  totalClaims: 1284,
  pendingReview: 47,
  approvedToday: 23,
  avgProcessingTime: '1.8 days',
  totalPayout: '$2.4M',
  aiAccuracy: '97.3%',
};

export const MONTHLY_DATA = [
  { month: 'Jan', approved: 142, denied: 28, pending: 15 },
  { month: 'Feb', approved: 158, denied: 31, pending: 12 },
  { month: 'Mar', approved: 171, denied: 24, pending: 18 },
  { month: 'Apr', approved: 163, denied: 29, pending: 22 },
  { month: 'May', approved: 189, denied: 22, pending: 31 },
  { month: 'Jun', approved: 201, denied: 19, pending: 47 },
];

export const CLAIM_TYPES = [
  { name: 'Surgery', value: 28, color: '#3b82f6' },
  { name: 'Medication', value: 22, color: '#8b5cf6' },
  { name: 'Diagnostic', value: 31, color: '#06b6d4' },
  { name: 'Emergency', value: 12, color: '#f43f5e' },
  { name: 'Therapy', value: 7, color: '#10b981' },
];

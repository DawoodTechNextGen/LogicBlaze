'use client';

import { useState } from 'react';
import { CALCULATOR_OPTIONS } from '../lib/data';
import { saveLocalLead } from '../lib/supabase';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function EstimationCalculator(): JSX.Element {
  const [selectedService, setSelectedService] = useState<string>(CALCULATOR_OPTIONS.serviceTypes[0].id);
  const [selectedScope, setSelectedScope] = useState<string>(CALCULATOR_OPTIONS.scopes[1].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['auth', 'ai_bot']);
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Calculation Logic
  const serviceObj = CALCULATOR_OPTIONS.serviceTypes.find((s) => s.id === selectedService) || CALCULATOR_OPTIONS.serviceTypes[0];
  const scopeObj = CALCULATOR_OPTIONS.scopes.find((sc) => sc.id === selectedScope) || CALCULATOR_OPTIONS.scopes[1];

  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const item = CALCULATOR_OPTIONS.addons.find((a) => a.id === addonId);
    return sum + (item ? item.cost : 0);
  }, 0);

  const estimatedCost = Math.round(serviceObj.baseCost * scopeObj.multiplier + addonsTotal);
  const estimatedWeeks = Math.round(serviceObj.baseWeeks * scopeObj.multiplier);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const addonsNames = selectedAddons.map(aId => CALCULATOR_OPTIONS.addons.find(a => a.id === aId)?.name).join(', ');
    
    saveLocalLead({
      type: 'estimate',
      name,
      email,
      phone,
      details: `Project Estimate Quote: Service: ${serviceObj.name} | Scope: ${scopeObj.name} | Addons: ${addonsNames || 'None'} | Total: $${estimatedCost} (${estimatedWeeks} weeks)`
    });

    setSubmitted(true);
  };

  return (
    <div className="calculator-container" style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '40px', boxShadow: 'var(--shadow-lg)' }}>
      <div className="text-center" style={{ marginBottom: '32px' }}>
        <div className="badge-pill">Interactive Cost Calculator</div>
        <h2 className="section-title">Instant Project Estimate Wizard</h2>
        <p className="section-desc">Select your service, scope, and optional features for an instant cost & timeline range.</p>
      </div>

      {submitted ? (
        <div className="text-center" style={{ padding: '40px 20px', background: 'var(--primary-50)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ width: '64px', height: '64px', background: 'var(--gradient-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', color: '#ffffff' }}>
            <CheckCircle2 size={36} />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
            Quote Submitted Successfully!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '500px', margin: '0 auto 20px auto' }}>
            Thank you, <strong>{name}</strong>. Your project quote of <strong>${estimatedCost}</strong> ({estimatedWeeks} weeks) has been registered. Our lead engineer will contact you shortly.
          </p>
          <button onClick={() => { setSubmitted(false); setStep(1); }} className="btn btn-secondary">
            Calculate Another Scope
          </button>
        </div>
      ) : (
        <>
          {/* Step Stepper Header */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
            <span style={{ fontSize: '13px', fontWeight: '800', padding: '6px 14px', borderRadius: '99px', background: step >= 1 ? 'var(--primary-50)' : 'var(--bg-subtle)', color: step >= 1 ? 'var(--logo-royal-blue)' : 'var(--text-muted)' }}>
              1. Service & Scope
            </span>
            <span style={{ fontSize: '13px', fontWeight: '800', padding: '6px 14px', borderRadius: '99px', background: step >= 2 ? 'var(--primary-50)' : 'var(--bg-subtle)', color: step >= 2 ? 'var(--logo-royal-blue)' : 'var(--text-muted)' }}>
              2. Add-ons
            </span>
            <span style={{ fontSize: '13px', fontWeight: '800', padding: '6px 14px', borderRadius: '99px', background: step >= 3 ? 'var(--primary-50)' : 'var(--bg-subtle)', color: step >= 3 ? 'var(--logo-royal-blue)' : 'var(--text-muted)' }}>
              3. Lock Estimate
            </span>
          </div>

          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '16px' }}>1. Select Primary Service:</h3>
              <div className="grid-3" style={{ marginBottom: '24px' }}>
                {CALCULATOR_OPTIONS.serviceTypes.map((st) => (
                  <div
                    key={st.id}
                    onClick={() => setSelectedService(st.id)}
                    style={{
                      padding: '20px',
                      borderRadius: 'var(--radius-md)',
                      border: selectedService === st.id ? '2px solid var(--logo-electric-cyan)' : '1px solid var(--border-light)',
                      background: selectedService === st.id ? 'var(--primary-50)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px' }}>{st.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--logo-royal-blue)', fontWeight: '700' }}>Starts at ${st.baseCost}</div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '16px' }}>2. Project Scope & Velocity:</h3>
              <div className="grid-3" style={{ marginBottom: '32px' }}>
                {CALCULATOR_OPTIONS.scopes.map((sc) => (
                  <div
                    key={sc.id}
                    onClick={() => setSelectedScope(sc.id)}
                    style={{
                      padding: '20px',
                      borderRadius: 'var(--radius-md)',
                      border: selectedScope === sc.id ? '2px solid var(--logo-electric-cyan)' : '1px solid var(--border-light)',
                      background: selectedScope === sc.id ? 'var(--primary-50)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)' }}>{sc.name}</div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right' }}>
                <button onClick={() => setStep(2)} className="btn btn-primary">
                  <span>Continue to Add-ons</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '16px' }}>Select Optional Features & Modules:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {CALCULATOR_OPTIONS.addons.map((addon) => (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: 'var(--radius-md)',
                      border: selectedAddons.includes(addon.id) ? '2px solid var(--logo-electric-cyan)' : '1px solid var(--border-light)',
                      background: selectedAddons.includes(addon.id) ? 'var(--primary-50)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>{addon.name}</span>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--logo-royal-blue)' }}>+${addon.cost}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(1)} className="btn btn-secondary">Back</button>
                <button onClick={() => setStep(3)} className="btn btn-primary">
                  <span>View Total & Claim Estimate</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmitQuote}>
              <div style={{ background: 'var(--bg-subtle)', padding: '24px', borderRadius: 'var(--radius-lg)', marginBottom: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>Estimated Investment Range:</div>
                <div style={{ fontSize: '42px', fontWeight: '800', color: 'var(--logo-royal-blue)' }}>${estimatedCost}</div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>Estimated Delivery: ~{estimatedWeeks} Weeks</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>Your Full Name *</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-light)' }} placeholder="Dianne Russell" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>Work Email Address *</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-light)' }} placeholder="dianne@company.com" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>Phone Number (Optional)</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-light)' }} placeholder="+1 (800) 555-0123" />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" onClick={() => setStep(2)} className="btn btn-secondary">Back</button>
                <button type="submit" className="btn btn-primary">
                  <span>Send Quote Request</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}

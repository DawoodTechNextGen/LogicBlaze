import EstimationCalculator from '../../components/EstimationCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Cost & Timeline Estimator | LogicBlaze Calculator',
  description: 'Calculate your Web Application, Mobile App, Desktop Software, AI Chatbot, or SEO marketing project cost and timeline in 2 minutes.'
};

export default function CalculatorPage(): JSX.Element {
  return (
    <>
      <section className="hero">
        <div className="container text-center">
          <div className="badge-pill">
            <span className="badge-dot"></span>
            Transparent Pricing
          </div>
          <h1 className="hero-title">Interactive Project Estimation Calculator</h1>
          <p className="hero-subtitle">
            Configure your custom software, AI agent, or digital marketing requirements below to receive a real-time cost range and timeline estimate.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <EstimationCalculator />
        </div>
      </section>
    </>
  );
}

// @ts-nocheck

import { writeTestament } from 'utils/web3/heritage';
import { useState } from 'react';
import PlanCustomization from 'components/TestamentCreation/Steps/PlanCustomization';
import PlanSelection from 'components/TestamentCreation/Steps/PlanSelection';
import PlanReview from 'components/TestamentCreation/Steps/PlanReview';
import Stepper from 'components/Stepper/Stepper';
import Title from 'components/Title/Title';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';

const Steps = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [beneficiaries, setBeneficiares] = useState({});
  const stepsLabel = ['Select Plan', 'Customize Plan', 'Review Plan'];

  const renderStepper = () => {
    return (
      <>
        <Stepper steps={stepsLabel} className="mb-7" activeStep={activeStep} />
        <HorizontalRule />
      </>
    );
  };
  const steps = [
    {
      content: (
        <PlanSelection
          stepperClassName=""
          renderStepper={() => renderStepper()}
          onNextStep={() => setActiveStep(1)}
        />
      ), // <ConnectStep onNextStep={() => setActiveStep(1)} />
      key: 'step-connect',
      title: 'Time To Protect Our Wealth ✌️',
    },
    {
      content: (
        <PlanCustomization
          stepperClassName=""
          renderStepper={() => renderStepper()}
          onPrevStep={() => setActiveStep(0)}
          onNextStep={(beneficiaries: any, expiration: any) => {
            setActiveStep(2);
            setBeneficiares({
              beneficiaries,
              expiration,
            });
          }}
        />
      ),
      key: 'step-beneficiaries',
      title: 'Creating inheritance plan',
    },
    {
      content: (
        <PlanReview
          stepperClassName=""
          renderStepper={() => renderStepper()}
          beneficiaries={beneficiaries}
          onPrevStep={() => setActiveStep(1)}
          onNextStep={() => handleDeploy()}
        />
      ),
      key: 'step-distribution',
      title: 'Reviewing inheritance plan',
    },
  ];

  async function handleDeploy() {
    await writeTestament(beneficiaries.beneficiaries, beneficiaries.expiration);

    window.location.reload();
  }

  function renderTitle() {
    return <Title text={steps[activeStep].title}></Title>;
  }

  function renderStep(
    { content }: { content: any; key: string; title: string },
    index: number
  ) {
    return <>{index === activeStep ? content : null}</>;
  }

  return (
    <div className="mb-12">
      {renderTitle()}
      <div className="w-fit rounded-xl bg-white px-32 py-9 drop-shadow-lg">
        {steps.map(renderStep)}
      </div>
    </div>
  );
};

export default Steps;

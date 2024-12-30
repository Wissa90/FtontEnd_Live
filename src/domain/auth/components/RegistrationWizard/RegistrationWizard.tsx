import { useState } from "react";
import { PersonalInformationStep } from "./PersonalInformationStep";
import { AccountInformationStep } from "./AccountInformationStep";
import { AcademicInformationStep } from "./AcademicInformationStep";
import { ContactInformationStep } from "./ContactInformationStep";

export const RegistrationWizard = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        confirmPassword: "",
        location: "",
        dateOfBirth: "",  // Keeping consistent naming
        grade: "",
        gradeStage: "",
        email: "",
        parentEmail: "",
    });

    const updateFormData = (newData: Partial<typeof formData>) => {
        setFormData({ ...formData, ...newData });
    };

    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <PersonalInformationStep
                        data={{
                            first_name: formData.first_name,
                            last_name: formData.last_name
                        }}
                        updateData={updateFormData}
                        nextStep={nextStep}
                    />
                );
            case 2:
                return (
                    <AccountInformationStep
                        data={{
                            username: formData.username,
                            password: formData.password,
                            confirmPassword: formData.confirmPassword
                        }}
                        updateData={updateFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                );
            case 3:
                return (
                    <AcademicInformationStep
                        data={{
                            ...formData,
                            dateOfBirth: formData.dateOfBirth,  // Using consistent naming
                            grade: formData.grade,
                            gradeStage: formData.gradeStage
                        }}
                        updateData={updateFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                );
            case 4:
                return (
                    <ContactInformationStep
                        data={{
                            email: formData.email,
                            parentEmail: formData.parentEmail,
                            first_name: formData.first_name,
                            last_name: formData.last_name,
                            dateOfBirth: formData.dateOfBirth,  // Using consistent naming
                            username: formData.username,
                            password: formData.password,
                            grade: formData.grade,
                            gradeStage: formData.gradeStage
                        }}
                        updateData={updateFormData}
                        prevStep={prevStep}
                    />
                );
            default:
                return null;
        }
    };

    return <>{renderStep()}</>;
};
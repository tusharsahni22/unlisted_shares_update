"use client";
import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Header from "../Header";

const FormContainer = styled.section`
  padding: 3rem 0;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  color: #1a237e;
  margin-bottom: 2rem;
  text-align: center;
`;

const FormCard = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #1a237e;
    box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #1a237e;
    box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #fff;

  &:focus {
    outline: none;
    border-color: #1a237e;
    box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: #f9a825;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f57f17;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  text-align: center;
`;

function Contact() {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    investmentAmount: "",
    interestType: "buy",
    message: "",
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.investmentAmount.trim()) {
      newErrors.investmentAmount = "Investment amount is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      axios
        .post("/api/interest-form", formData)
        .then((response) => {
          console.log("response", response);
          setSubmitSuccess(true);
          setFormData({
            name: "",
            email: "",
            phone: "",
            investmentAmount: "",
            interestType: "buy",
            message: "",
          });
        })
        .catch((error) => {
          setErrors({
            submit: "Failed to submit form. Please try again.",
          });
          console.error("Form submit error:", error);
        }).finally(() => {
          setIsSubmitting(false);
        })}
  };

  return (
    <div>
      <Header />
      <FormContainer>
        <FormTitle>Express Your Interest</FormTitle>
        <FormCard>
          {submitSuccess && (
            <SuccessMessage>
              Thank you for your interest! We will contact you shortly.
            </SuccessMessage>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="investmentAmount">Investment Amount (₹)</Label>
              <Input
                type="text"
                id="investmentAmount"
                name="investmentAmount"
                value={formData.investmentAmount}
                onChange={handleChange}
              />
              {errors.investmentAmount && (
                <ErrorMessage>{errors.investmentAmount}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="interestType">Interest Type</Label>
              <Select
                id="interestType"
                name="interestType"
                value={formData.interestType}
                onChange={handleChange}
              >
                <option value="buy">Buy Shares</option>
                <option value="sell">Sell Shares</option>
                <option value="information">Get Information</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message (Optional)</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </FormGroup>

            {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </SubmitButton>
          </Form>
        </FormCard>
      </FormContainer>
    </div>
  );
}

export default Contact;

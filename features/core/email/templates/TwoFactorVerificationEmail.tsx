import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface TwoFactorVerificationEmailProps {
  otp?: string;
}

export const TwoFactorVerificationEmail = ({
  otp,
}: TwoFactorVerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Your 2FA Verification Code</Preview>
    <Tailwind>
      <Body className="bg-gray-50 font-sans">
        <Container className="mx-auto py-8 px-4 max-w-[600px]">
          <Section className="bg-white rounded-lg shadow-sm p-8">
            <Heading className="text-3xl font-bold text-gray-900 text-center mb-6">
              Verification Code
            </Heading>

            <Text className="text-gray-700 text-lg mb-8 text-center">
              Please enter the verification code below in your open browser
              window to complete the sign-in process. This code ensures the
              security of your account.
            </Text>

            <Section className="bg-gray-100 rounded-xl py-8 px-4 mb-8">
              <Text className="text-4xl font-mono font-bold text-gray-900 text-center tracking-widest">
                {otp}
              </Text>
            </Section>

            <Text className="text-gray-600 text-sm text-center mb-8">
              If you didn't request this email, there's nothing to worry about,
              you can safely ignore it.
            </Text>

            <hr className="border-gray-200 mb-8" />

            <Text className="text-gray-500 text-xs text-center">
              ©2025 {process.env.APP_NAME || "App Name"}
              <br />
              <br />
              All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

TwoFactorVerificationEmail.PreviewProps = {
  otp: "123456",
} as TwoFactorVerificationEmailProps;

export default TwoFactorVerificationEmail;
